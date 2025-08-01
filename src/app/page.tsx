import Link from 'next/link';
import { getAllSessions, formatDate, formatCurrency, calculateTotalBuyIn, getPlayerCount, getGlobalStats, getTop3TotalResults } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { BarChartComponent, AreaChartComponent } from '@/components/ui/charts';
import { PlayerAvatar } from '@/components/PlayerAvatar';
import { PatchNotesDialog } from '@/components/PatchNotesDialog';

export default function HomePage() {
  const sessions = getAllSessions();
  const globalStats = getGlobalStats();

  // Данные для графика накопления депозита
  const depositChartData = sessions
    .filter(s => s.playersBuyins)
    .map(session => ({
      date: formatDate(session.date),
      amount: calculateTotalBuyIn(session)
    }));

  // Данные для графика топ-3 лучших результатов
  const top3ResultsData = getTop3TotalResults();

  return (
    <div className="container mx-auto py-4 sm:py-8 px-4">
      <PatchNotesDialog />
      
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">ППГ</h1>
        <Button asChild size="sm" className="sm:size-default">
          <Link href="/players">Игроки</Link>
        </Button>
      </div>

      {/* Шутливые метрики */}
      <div className="flex flex-wrap gap-2 sm:gap-4 mb-6 sm:mb-8">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 flex-1 min-w-[200px] sm:min-w-[250px]">
          <CardHeader className="pb-0">
            <CardTitle className="text-sm sm:text-base font-medium">Общий деп</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl sm:text-3xl font-bold text-green-600">{formatCurrency(globalStats.totalDeposit)}</div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2">Все бай-ины за все время</p>
            <p className="text-xs text-green-600 mt-1">— столько вложили наши храбрецы!</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 flex-1 min-w-[200px] sm:min-w-[250px]">
          <CardHeader className="pb-0">
            <CardTitle className="text-sm sm:text-base font-medium">🏆 Чемпион по додепам</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
              <PlayerAvatar playerId={globalStats.championDokid.playerId} size="sm" />
              <div className="text-lg sm:text-2xl font-bold text-blue-600">{globalStats.championDokid.name}</div>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">{globalStats.championDokid.count} раз</p>
            <p className="text-xs text-blue-600 mt-1">— никогда не сдаётся!</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 flex-1 min-w-[200px] sm:min-w-[250px]">
          <CardHeader className="pb-0">
            <CardTitle className="text-sm sm:text-base font-medium">💎 Самый щедрый</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
              <PlayerAvatar playerId={globalStats.mostGenerous.playerId} size="sm" />
              <div className="text-lg sm:text-2xl font-bold text-purple-600">{globalStats.mostGenerous.name}</div>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">{formatCurrency(globalStats.mostGenerous.amount)}</p>
            <p className="text-xs text-purple-600 mt-1">— это мой смол!</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 flex-1 min-w-[200px] sm:min-w-[250px]">
          <CardHeader className="pb-0">
            <CardTitle className="text-sm sm:text-base font-medium">👑 Король побед</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
              <PlayerAvatar playerId={globalStats.kingOfWins.playerId} size="sm" />
              <div className="text-lg sm:text-2xl font-bold text-orange-600">{globalStats.kingOfWins.name}</div>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">{formatCurrency(globalStats.kingOfWins.result)}</p>
            <p className="text-xs text-orange-600 mt-1">— мастер покерного искусства!</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 flex-1 min-w-[200px] sm:min-w-[250px]">
          <CardHeader className="pb-0">
            <CardTitle className="text-sm sm:text-base font-medium">😭 Топ проебер</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
              <PlayerAvatar playerId={globalStats.biggestLoser.playerId} size="sm" />
              <div className="text-lg sm:text-2xl font-bold text-red-600">{globalStats.biggestLoser.name}</div>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">{formatCurrency(globalStats.biggestLoser.result)}</p>
            <p className="text-xs text-red-600 mt-1">— это дисперсия</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 flex-1 min-w-[200px] sm:min-w-[250px]">
          <CardHeader className="pb-0">
            <CardTitle className="text-sm sm:text-base font-medium">💸 Самый экономный</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
              <PlayerAvatar playerId={globalStats.mostEconomical.playerId} size="sm" />
              <div className="text-lg sm:text-2xl font-bold text-yellow-600">{globalStats.mostEconomical.name}</div>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">{formatCurrency(globalStats.mostEconomical.amount)}</p>
            <p className="text-xs text-yellow-600 mt-1">— бережливый игрок</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 flex-1 min-w-[200px] sm:min-w-[250px]">
          <CardHeader className="pb-0">
            <CardTitle className="text-sm sm:text-base font-medium">🦸 Последний герой</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {globalStats.lastHero ? (
              <>
                <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                  <PlayerAvatar playerId={globalStats.lastHero.playerId} size="sm" />
                  <div className="text-lg sm:text-2xl font-bold text-pink-600">{globalStats.lastHero.name}</div>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">{formatCurrency(globalStats.lastHero.result)}</p>
                <p className="text-xs text-pink-600 mt-1">— держался до конца!</p>
              </>
            ) : (
              <div className="text-lg sm:text-xl font-bold text-muted-foreground">Нет данных</div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Графики */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">📈 Накопление депозита</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Как растет общий депозит по времени</CardDescription>
          </CardHeader>
          <CardContent>
            {depositChartData.length > 0 ? (
              <AreaChartComponent data={depositChartData} height={200} className="sm:h-[250px] pr-6" />
            ) : (
              <div className="flex items-center justify-center h-[200px] sm:h-[250px] text-muted-foreground">
                Нет данных для отображения
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">🏆 Топ-3 лучших результатов</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Общие результаты топ-3 игроков</CardDescription>
          </CardHeader>
          <CardContent>
            {top3ResultsData.length > 0 ? (
              <BarChartComponent data={top3ResultsData} height={200} className="sm:h-[250px] pr-6" />
            ) : (
              <div className="flex items-center justify-center h-[200px] sm:h-[250px] text-muted-foreground">
                Нет данных для отображения
              </div>
            )}
          </CardContent>
        </Card>
      </div>

 
      {/* Базовые метрики */}
      <Card className="mb-6 sm:mb-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold">🎮 {globalStats.totalSessions}</div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">Всего игр</p>
            </div>
            <div className="text-center border-l border-r border-black-900  px-4">
              <div className="text-2xl sm:text-3xl font-bold">👥 {globalStats.totalPlayers}</div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">Игроков</p>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold">📊 {sessions.filter(s => s.playersBuyins).length}</div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">Активных сессий</p>
            </div>
        </div>
        </CardContent>
      </Card>
      
      {/* Таблица игр */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">🎯 Последние игры</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Список всех игровых сессий</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs sm:text-sm">Дата</TableHead>
                <TableHead className="text-xs sm:text-sm hidden md:table-cell">Игроков</TableHead>
                <TableHead className="text-xs sm:text-sm">Общий депозит</TableHead>
                <TableHead className="text-xs sm:text-sm">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions.map((session) => (
                <TableRow key={session.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="text-xs sm:text-sm">
                    <Link href={`/game/${session.id}`} className="block">
                      {formatDate(session.date)}
                    </Link>
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm hidden md:table-cell">
                    <Link href={`/game/${session.id}`} className="block">
                      {getPlayerCount(session)}
                    </Link>
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm">
                    <Link href={`/game/${session.id}`} className="block">
                      {session.playersBuyins ? formatCurrency(calculateTotalBuyIn(session)) : '-'}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Button asChild size="sm" className="text-xs">
                      <Link href={`/game/${session.id}`}>Подробнее</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
