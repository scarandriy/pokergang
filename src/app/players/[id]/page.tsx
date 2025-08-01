import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPlayerById, getPlayerStats, formatDate, formatCurrency, formatResult } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlayerAvatar } from '@/components/PlayerAvatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface PlayerPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PlayerPage({ params }: PlayerPageProps) {
  const { id } = await params;
  const player = getPlayerById(id);

  if (!player) {
    notFound();
  }

  const stats = getPlayerStats(id);

  return (
    <div className="container mx-auto py-4 sm:py-8 px-4">
      <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
        <Button variant="outline" asChild size="sm" className="sm:size-default">
          <Link href="/players">← Назад к игрокам</Link>
        </Button>
        <Button variant="outline" asChild size="sm" className="sm:size-default">
          <Link href="/">Игры</Link>
        </Button>
      </div>

      {/* Заголовок с аватаром */}
      <div className="flex items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
        <PlayerAvatar playerId={id} size="lg" className="h-32 w-32" />
        <div>
          <h1 className="text-2xl sm:text-4xl font-bold">{player.name}</h1>
          <p className="text-muted-foreground text-sm sm:text-lg">ID: {player.id}</p>
        </div>
      </div>

      {/* Основная статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="p-3 sm:p-4 border rounded-lg">
          <div className="text-xs sm:text-sm text-muted-foreground">Всего игр</div>
          <div className="text-base sm:text-lg font-semibold">{stats.totalSessions}</div>
        </div>
        <div className="p-3 sm:p-4 border rounded-lg">
          <div className="text-xs sm:text-sm text-muted-foreground">Общий результат</div>
          <div className={`text-base sm:text-lg font-semibold ${stats.totalResult >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatResult(stats.totalResult)}
          </div>
        </div>
        <div className="p-3 sm:p-4 border rounded-lg">
          <div className="text-xs sm:text-sm text-muted-foreground">Всего внесено</div>
          <div className="text-base sm:text-lg font-semibold">{formatCurrency(stats.totalBuyins)}</div>
        </div>
        <div className="p-3 sm:p-4 border rounded-lg">
          <div className="text-xs sm:text-sm text-muted-foreground">Победы/Поражения</div>
          <div className="text-base sm:text-lg font-semibold">{stats.wins}/{stats.losses}</div>
        </div>
      </div>

      {/* Таблица игр */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs sm:text-sm">Дата</TableHead>
              <TableHead className="text-xs sm:text-sm">Бай-ины</TableHead>
              <TableHead className="text-xs sm:text-sm">Всего внесено</TableHead>
              <TableHead className="text-xs sm:text-sm">Результат</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stats.recentSessions.map((session) => (
              <TableRow key={session.sessionId} className="cursor-pointer hover:bg-muted/50">
                <TableCell className="text-xs sm:text-sm">
                  <Link href={`/game/${session.sessionId}`} className="block">
                    {formatDate(session.date)}
                  </Link>
                </TableCell>
                <TableCell className="text-xs sm:text-sm">
                  <Link href={`/game/${session.sessionId}`} className="block">
                    {session.buyins.length > 0 ? (
                      <div className="flex gap-1 flex-wrap">
                        {session.buyins.map((buyin, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {formatCurrency(buyin)}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-xs">Нет данных</span>
                    )}
                  </Link>
                </TableCell>
                <TableCell className="text-xs sm:text-sm">
                  <Link href={`/game/${session.sessionId}`} className="block">
                    {session.buyins.length > 0 ? formatCurrency(session.totalBuyin) : '-'}
                  </Link>
                </TableCell>
                <TableCell className="text-xs sm:text-sm">
                  <Link href={`/game/${session.sessionId}`} className="block">
                    {session.result !== 0 ? (
                      <span className={session.result >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {formatResult(session.result)}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">0€</span>
                    )}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 