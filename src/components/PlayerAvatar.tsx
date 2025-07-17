"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getPlayerById } from "@/lib/data";

interface PlayerAvatarProps {
  playerId: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function PlayerAvatar({ playerId, size = "md", className }: PlayerAvatarProps) {
  const player = getPlayerById(playerId);
  
  const getSizeClasses = (size: "sm" | "md" | "lg") => {
    switch (size) {
      case "sm":
        return "h-6 w-6 text-xs";
      case "lg":
        return "h-12 w-12 text-lg";
      default:
        return "h-8 w-8 text-sm";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };
  
  if (!player) {
    return (
      <Avatar className={`${getSizeClasses(size)} ${className}`}>
        <AvatarFallback>?</AvatarFallback>
      </Avatar>
    );
  }

  return (
    <Avatar className={`${getSizeClasses(size)} ${className}`}>
      <AvatarImage src={player.pfp} alt={player.name} className="object-cover" />
      <AvatarFallback>{getInitials(player.name)}</AvatarFallback>
    </Avatar>
  );
} 