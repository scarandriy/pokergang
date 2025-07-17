import gamesData from '@/data/games.json';
import playersData from '@/data/players.json';
import { Session, Player, SessionsData } from '@/types';

export function getAllSessions(): Session[] {
  return (gamesData as SessionsData).sessions;
}

export function getAllPlayers(): Player[] {
  return playersData as Player[];
}

export function getSessionById(id: string): Session | undefined {
  return getAllSessions().find(session => session.id.toString() === id);
}

export function getPlayerById(id: string): Player | undefined {
  return getAllPlayers().find(player => player.id === id);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU');
}

export function formatCurrency(amount: number): string {
  return `${amount}€`;
}

export function formatResult(result: number): string {
  const sign = result >= 0 ? '+' : '';
  return `${sign}${result}€`;
}

export function calculateTotalBuyIn(session: Session): number {
  if (!session.playersBuyins) return 0;
  
  return session.playersBuyins.reduce((total, playerBuyin) => {
    return total + playerBuyin.buyins.reduce((sum, buyin) => sum + buyin, 0);
  }, 0);
}

export function getPlayerCount(session: Session): number {
  if (session.playersBuyins) {
    return session.playersBuyins.length;
  }
  if (session.players) {
    return session.players.length;
  }
  return 0;
}

export function getPlayerName(playerId: string): string {
  const player = getPlayerById(playerId);
  return player?.name || playerId;
}

// Новые утилиты для статистики игрока
export interface PlayerStats {
  totalSessions: number;
  totalBuyins: number;
  averageBuyin: number;
  maxBuyin: number;
  sessionsWithBuyins: number;
  sessionsWithoutBuyins: number;
  totalResult: number;
  averageResult: number;
  wins: number;
  losses: number;
  recentSessions: Array<{
    sessionId: number;
    date: string;
    buyins: number[];
    totalBuyin: number;
    result: number;
  }>;
  buyinHistory: Array<{
    date: string;
    amount: number;
  }>;
}

export function getPlayerStats(playerId: string): PlayerStats {
  const sessions = getAllSessions();
  let totalSessions = 0;
  let totalBuyins = 0;
  let sessionsWithBuyins = 0;
  let sessionsWithoutBuyins = 0;
  let maxBuyin = 0;
  let totalResult = 0;
  let wins = 0;
  let losses = 0;
  const recentSessions: PlayerStats['recentSessions'] = [];
  const buyinHistory: PlayerStats['buyinHistory'] = [];

  sessions.forEach(session => {
    let participated = false;
    let sessionBuyins: number[] = [];
    let sessionTotalBuyin = 0;
    let sessionResult = 0;

    // Проверяем участие в сессиях без бай-инов
    if (session.players?.includes(playerId)) {
      totalSessions++;
      sessionsWithoutBuyins++;
      participated = true;
    }
    
    // Проверяем участие в сессиях с бай-инами
    if (session.playersBuyins) {
      const playerBuyin = session.playersBuyins.find(pb => pb.playerId === playerId);
      if (playerBuyin) {
        totalSessions++;
        sessionsWithBuyins++;
        participated = true;
        sessionBuyins = playerBuyin.buyins;
        sessionTotalBuyin = playerBuyin.buyins.reduce((sum, buyin) => sum + buyin, 0);
        sessionResult = playerBuyin.result;
        totalBuyins += sessionTotalBuyin;
        totalResult += sessionResult;
        
        // Подсчитываем выигрыши/проигрыши
        if (sessionResult > 0) {
          wins++;
        } else if (sessionResult < 0) {
          losses++;
        }
        
        // Добавляем в историю бай-инов
        playerBuyin.buyins.forEach(buyin => {
          buyinHistory.push({
            date: session.date,
            amount: buyin
          });
          maxBuyin = Math.max(maxBuyin, buyin);
        });
      }
    }

    if (participated) {
      recentSessions.push({
        sessionId: session.id,
        date: session.date,
        buyins: sessionBuyins,
        totalBuyin: sessionTotalBuyin,
        result: sessionResult
      });
    }
  });

  // Сортируем по дате (новые сначала)
  recentSessions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  buyinHistory.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return {
    totalSessions,
    totalBuyins,
    averageBuyin: totalBuyins > 0 ? Math.round(totalBuyins / buyinHistory.length) : 0,
    maxBuyin,
    sessionsWithBuyins,
    sessionsWithoutBuyins,
    totalResult,
    averageResult: sessionsWithBuyins > 0 ? Math.round(totalResult / sessionsWithBuyins) : 0,
    wins,
    losses,
    recentSessions: recentSessions.slice(0, 10), // Последние 10 игр
    buyinHistory
  };
}

// Новые утилиты для шутливых метрик
export interface GlobalStats {
  totalDeposit: number;
  championDokid: { playerId: string; name: string; count: number };
  mostGenerous: { playerId: string; name: string; amount: number };
  mostEconomical: { playerId: string; name: string; amount: number };
  biggestLoser: { playerId: string; name: string; result: number };
  kingOfWins: { playerId: string; name: string; result: number };
  lastHero: { playerId: string; name: string; result: number } | null;
  totalSessions: number;
  totalPlayers: number;
}

export function getGlobalStats(): GlobalStats {
  const sessions = getAllSessions();
  
  let totalDeposit = 0;
  const playerStats = new Map<string, { buyins: number; totalResult: number; dokidCount: number }>();
  
  // Инициализируем статистику для всех игроков
  const players = getAllPlayers();
  players.forEach(player => {
    playerStats.set(player.id, { buyins: 0, totalResult: 0, dokidCount: 0 });
  });
  
  // Собираем статистику из сессий
  sessions.forEach(session => {
    if (session.playersBuyins) {
      session.playersBuyins.forEach(playerBuyin => {
        const stats = playerStats.get(playerBuyin.playerId);
        if (stats) {
          const totalBuyin = playerBuyin.buyins.reduce((sum, buyin) => sum + buyin, 0);
          stats.buyins += totalBuyin;
          stats.totalResult += playerBuyin.result;
          stats.dokidCount += playerBuyin.buyins.length;
          totalDeposit += totalBuyin;
        }
      });
    }
  });
  
  // Находим чемпионов
  let championDokid = { playerId: '', name: '', count: 0 };
  let mostGenerous = { playerId: '', name: '', amount: 0 };
  let mostEconomical = { playerId: '', name: '', amount: Infinity };
  let biggestLoser = { playerId: '', name: '', result: 0 };
  let kingOfWins = { playerId: '', name: '', result: 0 };
  
  playerStats.forEach((stats, playerId) => {
    const player = getPlayerById(playerId);
    if (player) {
      // Чемпион по докидам
      if (stats.dokidCount > championDokid.count) {
        championDokid = { playerId, name: player.name, count: stats.dokidCount };
      }
      
      // Самый щедрый
      if (stats.buyins > mostGenerous.amount) {
        mostGenerous = { playerId, name: player.name, amount: stats.buyins };
      }
      
      // Самый экономный (только если играл)
      if (stats.buyins > 0 && stats.buyins < mostEconomical.amount) {
        mostEconomical = { playerId, name: player.name, amount: stats.buyins };
      }
      
      // Тот, кто чаще всех терял
      if (stats.totalResult < biggestLoser.result) {
        biggestLoser = { playerId, name: player.name, result: stats.totalResult };
      }
      
      // Король побед
      if (stats.totalResult > kingOfWins.result) {
        kingOfWins = { playerId, name: player.name, result: stats.totalResult };
      }
    }
  });
  
  // Последний герой
  let lastHero = null;
  // Сортируем сессии по дате (новые сначала) и находим самую последнюю с игроками
  const sortedSessions = sessions
    .filter(s => s.playersBuyins && s.playersBuyins.length > 0)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  const lastSession = sortedSessions[0];
  if (lastSession?.playersBuyins) {
    const winner = lastSession.playersBuyins.reduce((max, current) => 
      current.result > max.result ? current : max
    );
    if (winner.result > 0) {
      const player = getPlayerById(winner.playerId);
      lastHero = { playerId: winner.playerId, name: player?.name || winner.playerId, result: winner.result };
    }
  }
  
  return {
    totalDeposit,
    championDokid,
    mostGenerous,
    mostEconomical,
    biggestLoser,
    kingOfWins,
    lastHero,
    totalSessions: sessions.length,
    totalPlayers: players.length
  };
}

// Функция для получения топ-3 игроков по общему результату
export interface Top3Result {
  name: string;
  value: number;
  [key: string]: string | number | undefined;
}

export function getTop3TotalResults(): Top3Result[] {
  const players = getAllPlayers();
  const sessions = getAllSessions();
  const playerResults = new Map<string, number>();
  
  // Собираем общие результаты для каждого игрока
  sessions.forEach(session => {
    if (session.playersBuyins) {
      session.playersBuyins.forEach(playerBuyin => {
        const currentTotal = playerResults.get(playerBuyin.playerId) || 0;
        playerResults.set(playerBuyin.playerId, currentTotal + playerBuyin.result);
      });
    }
  });
  
  // Преобразуем в массив и сортируем по результату
  const playerTotalResults = Array.from(playerResults.entries())
    .map(([playerId, totalResult]) => ({
      playerId,
      name: getPlayerName(playerId),
      totalResult
    }))
    .sort((a, b) => b.totalResult - a.totalResult)
    .slice(0, 3);
  
  return playerTotalResults.map(player => ({
    name: player.name,
    value: player.totalResult
  }));
} 