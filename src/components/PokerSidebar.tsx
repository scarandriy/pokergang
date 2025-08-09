"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  IconHome,
  IconUsers,
  IconCards,
  IconHistory,
} from "@tabler/icons-react"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  useSidebar,
} from "@/components/ui/sidebar"

const navigationData = {
  navMain: [
    {
      title: "Главная",
      url: "/",
      icon: IconHome,
    },
    {
      title: "Игроки",
      url: "/players",
      icon: IconUsers,
    },
    {
      title: "История игр",
      url: "/games",
      icon: IconHistory,
    },
  ],
}


interface NavItem {
  title: string
  url: string
  icon: React.ComponentType<{ className?: string }>
}

function NavMain({ items }: { items: NavItem[] }) {
  const pathname = usePathname()
  const { setOpenMobile } = useSidebar()

  const handleClick = () => {
    setOpenMobile(false)
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Навигация</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item, index) => {
            const Icon = item.icon
            const isActive = pathname === item.url

            return (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton asChild isActive={isActive} onClick={handleClick}>
                  <Link href={item.url}>
                    <Icon className="size-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

export function PokerSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                <IconCards className="!size-5" />
                <span className="text-base font-semibold">ППГ</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navigationData.navMain} />
      </SidebarContent>
    </Sidebar>
  )
} 