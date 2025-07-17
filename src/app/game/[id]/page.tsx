import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSessionById, formatDate, formatCurrency, formatResult, getPlayerName } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface GamePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function GamePage({ params }: GamePageProps) {
  const { id } = await params;
  const session = getSessionById(id);

  if (!session) {
    notFound();
  }

  const totalBuyIn = session.playersBuyins?.reduce((total, playerBuyin) => {
    return total + playerBuyin.buyins.reduce((sum, buyin) => sum + buyin, 0);
  }, 0) || 0;

  const playerCount = session.playersBuyins?.length || session.players?.length || 0;

  return (
    <div className="container mx-auto py-4 sm:py-8 px-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-0">
        <div className="flex items-center gap-2 sm:gap-4">
          <Button variant="outline" asChild size="sm" className="sm:size-default">
            <Link href="/">← Назад к играм</Link>
          </Button>
          <Button variant="outline" asChild size="sm" className="sm:size-default">
            <Link href="/players">Игроки</Link>
          </Button>
        </div>
        <h1 className="text-lg sm:text-2xl font-bold">Игра {formatDate(session.date)}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
        <div className="p-3 sm:p-4 border rounded-lg">
          <div className="text-xs sm:text-sm text-muted-foreground">Дата</div>
          <div className="text-base sm:text-lg font-semibold">{formatDate(session.date)}</div>
        </div>
        <div className="p-3 sm:p-4 border rounded-lg">
          <div className="text-xs sm:text-sm text-muted-foreground">Total Buy-in</div>
          <div className="text-base sm:text-lg font-semibold">{formatCurrency(totalBuyIn)}</div>
        </div>
        <div className="p-3 sm:p-4 border rounded-lg">
          <div className="text-xs sm:text-sm text-muted-foreground">Игроков</div>
          <div className="text-base sm:text-lg font-semibold">{playerCount}</div>
        </div>
      </div>

      {session.notes && (
        <div className="mb-4 sm:mb-6 p-3 sm:p-4 border rounded-lg bg-muted/50">
          <div className="text-xs sm:text-sm text-muted-foreground mb-1">Заметки</div>
          <div className="text-sm sm:text-base">{session.notes}</div>
        </div>
      )}

      {session.playersBuyins ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs sm:text-sm">Имя игрока</TableHead>
                <TableHead className="text-xs sm:text-sm hidden sm:table-cell">Бай-ины</TableHead>
                <TableHead className="text-xs sm:text-sm">Всего внесено</TableHead>
                <TableHead className="text-xs sm:text-sm">Результат</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {session.playersBuyins.map((playerBuyin, index) => {
                const totalBuyins = playerBuyin.buyins.reduce((sum, buyin) => sum + buyin, 0);
                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium text-xs sm:text-sm">
                      {getPlayerName(playerBuyin.playerId)}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {playerBuyin.buyins.length > 0 ? (
                      <div className="flex gap-1 flex-wrap">
                        {playerBuyin.buyins.map((buyin, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {formatCurrency(buyin)}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-xs">Нет данных</span>
                    )}
                    </TableCell>
                    <TableCell className="font-semibold text-xs sm:text-sm">
                      {formatCurrency(totalBuyins)}
                    </TableCell>
                    <TableCell className={`text-xs sm:text-sm ${playerBuyin.result >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatResult(playerBuyin.result)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      ) : session.players ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs sm:text-sm">Имя игрока</TableHead>
                <TableHead className="text-xs sm:text-sm">Статус</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {session.players.map((playerId, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium text-xs sm:text-sm">
                    {getPlayerName(playerId)}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs sm:text-sm">
                    Нет данных о бай-инах
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground text-sm sm:text-base">
          Нет данных об игроках
        </div>
      )}
    </div>
  );
} 