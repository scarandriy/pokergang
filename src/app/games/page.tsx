import Link from 'next/link';
import { getAllSessions, formatDate, formatCurrency, calculateTotalBuyIn, getPlayerCount } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

export default function GamesPage() {
  const sessions = getAllSessions();

  return (
    <div className="p-4 ">
      
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">📋 Все игры</CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Детальная информация о каждой игровой сессии
          </CardDescription>
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