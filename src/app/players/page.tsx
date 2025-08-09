import { getAllPlayers, getAllSessions } from '@/lib/data';
import { PlayerProfile } from '@/components/PlayerProfile';

export default function PlayersPage() {
  const players = getAllPlayers();
  const sessions = getAllSessions();
  
  // Подсчитываем статистику для каждого игрока
  const playerStats = players.map(player => {
    let totalSessions = 0;
    let totalBuyins = 0;
    let totalResults = 0;
    const description = player.description;

    sessions.forEach(session => {
      // Проверяем участие в сессиях без бай-инов
      if (session.players?.includes(player.id)) {
        totalSessions++;
      }
      
      // Проверяем участие в сессиях с бай-инами
      if (session.playersBuyins) {
        const playerBuyin = session.playersBuyins.find(pb => pb.playerId === player.id);
        if (playerBuyin) {
          totalSessions++;
          totalBuyins += playerBuyin.buyins.reduce((sum, buyin) => sum + buyin, 0);
          totalResults += playerBuyin.result;
        }
      }
    });

    // Округляем результат до 1 знака после запятой для избежания ошибок точности
    totalResults = Math.round(totalResults * 10) / 10;

    return {
      player,
      totalSessions,
      totalResults,
      totalBuyins,
      description
    };
  });

  return (
    <div className="p-4">
  

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {playerStats.map(({ player, totalSessions, totalResults, totalBuyins, description }) => (
          <PlayerProfile
            key={player.id}
            player={player}
            totalSessions={totalSessions}
            totalResults={totalResults}
            totalBuyins={totalBuyins}
            description={description}
          />
        ))}
      </div>
    </div>
  );
} 