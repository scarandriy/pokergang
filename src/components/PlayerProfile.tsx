import Link from 'next/link';
import { Player } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlayerAvatar } from '@/components/PlayerAvatar';

interface PlayerProfileProps {
  player: Player;
  totalBuyins?: number;
  totalSessions?: number;
}

export function PlayerProfile({ player, totalBuyins, totalSessions }: PlayerProfileProps) {
  return (
    <Link href={`/players/${player.id}`} className="block">
      <Card className="w-full max-w-md hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader className="flex flex-row items-center gap-4">
          <PlayerAvatar playerId={player.id} size="lg" />
          <div className="flex-1">
            <CardTitle className="text-xl">{player.name}</CardTitle>
            <CardDescription>ID: {player.id}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            {totalSessions !== undefined && (
              <Badge variant="secondary">
                Игр: {totalSessions}
              </Badge>
            )}
            {totalBuyins !== undefined && (
              <Badge variant="outline">
                Всего: {totalBuyins}₽
              </Badge>
            )}
          </div>
          <div className="text-sm text-muted-foreground">
            Участник покер-игр
          </div>
        </CardContent>
      </Card>
    </Link>
  );
} 