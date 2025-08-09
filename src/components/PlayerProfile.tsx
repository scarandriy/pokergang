import Link from 'next/link';
import { Player } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlayerAvatar } from '@/components/PlayerAvatar';

interface PlayerProfileProps {
  player: Player;
  totalBuyins?: number;
  totalResults?: number;
  totalSessions?: number;
  description?: string;
}

export function PlayerProfile({ player, totalBuyins, totalResults, totalSessions, description }: PlayerProfileProps) {
  return (
    <Link href={`/players/${player.id}`} className="block">
      <Card className="w-full hover:shadow-lg transition-shadow cursor-pointer">
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
                Деп: {totalBuyins}€
              </Badge>
            )}
            {totalResults !== undefined && (
              <div className={`px-2 py-1 rounded-md border text-xs font-medium ${
                totalResults >= 0 
                  ? 'bg-green-50 border-green-100 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400' 
                  : 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400'
              }`}>
                {totalResults >= 0 ? "+" : ""}{totalResults}€
              </div>
            )}
          </div>
          <div className="text-sm text-muted-foreground">
            {description}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
} 