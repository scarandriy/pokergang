"use client"

import { usePathname } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function SiteHeader() {
  const pathname = usePathname()

  const getPageTitle = (path: string) => {
    switch (path) {
      case "/":
        return "Главная"
      case "/players":
        return "Игроки"
      case "/stats":
        return "Статистика"
      case "/history":
        return "История игр"
      case "/settings":
        return "Настройки"
      case "/help":
        return "Помощь"
      default:
        // Handle individual player pages
        if (path.startsWith("/players/")) {
          return "Профиль игрока"
        }
        // Handle individual game pages
        if (path.startsWith("/game/")) {
          return "Детали игры"
        }
        return "ППГ"
    }
  }

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <div className="flex items-center gap-2">
          <h1 className="text-base font-medium">{getPageTitle(pathname)}</h1>
        </div>
      </div>
    </header>
  )
} 