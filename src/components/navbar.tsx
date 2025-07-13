"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"

export function Navbar() {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Image src="/logo.png" alt="HackPSU Logo" width={40} height={40} />
          <span className="hidden font-bold sm:inline-block">HackPSU</span>
        </Link>

        <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
          <Link
            href="/#tiers"
            onClick={(e) => handleSmoothScroll(e, "tiers")}
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Tiers
          </Link>
          <Link
            href="/#why-sponsor"
            onClick={(e) => handleSmoothScroll(e, "why-sponsor")}
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Why Sponsor?
          </Link>
          <Link
            href="/#past-sponsors"
            onClick={(e) => handleSmoothScroll(e, "past-sponsors")}
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Past Partners
          </Link>
          <Link
            href="https://hackpsu.org"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center text-foreground/60 transition-colors hover:text-foreground/80 lg:flex"
          >
            Main Site
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </Link>
        </nav>

        <div className="flex items-center justify-end space-x-4">
          <Button asChild variant="outline" className="hidden sm:inline-flex bg-transparent">
            <Link href="/login">Sponsor Login</Link>
          </Button>
          <Button
            asChild
            className="bg-gradient-to-b from-primary via-primary to-orange-600 shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/40"
          >
            <Link href="/#contact" onClick={(e) => handleSmoothScroll(e, "contact")}>
              Become a Sponsor
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}