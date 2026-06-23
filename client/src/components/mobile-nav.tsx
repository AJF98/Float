import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Calendar, Menu, Users, Home, Lightbulb } from "lucide-react";
import { Link } from "wouter";
import { NotificationIcon } from "./notification-icon";
import FloatLogo from "@/components/FloatLogo";
import type { TripWithDetails, User } from "@shared/schema";

interface MobileNavProps {
  trip: TripWithDetails;
  user?: User;
}

export function MobileNav({ trip, user }: MobileNavProps) {
  return (
    <nav className="md:hidden bg-white border-b border-[rgba(13,148,136,0.15)] dark:trip-themed-nav dark:border-white/20 px-4 py-3 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-11 w-11 rounded-full text-[#0D3D39] dark:text-white">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0 bg-[#F8FFFE] border-r border-[rgba(13,148,136,0.15)] dark:bg-slate-900/95 dark:backdrop-blur-xl dark:border-white/10">
              <div className="flex flex-col h-full">
                {/* Logo */}
                <div className="flex items-center px-6 py-4 border-b border-[rgba(13,148,136,0.12)] dark:border-white/10">
                  <FloatLogo height={32} variant="dark" />
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-2">
                  <Link href="/" className="flex items-center px-3 py-2.5 text-sm font-medium text-[#0D3D39]/65 hover:text-[#0D9488] hover:bg-[rgba(13,148,136,0.08)] rounded-lg transition-all duration-200 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10 dark:rounded-xl">
                    <Home className="w-4 h-4 mr-3" />
                    All Trips
                  </Link>
                  <Link href="/how-it-works" className="flex items-center px-3 py-2.5 text-sm font-medium text-[#0D3D39]/65 hover:text-[#0D9488] hover:bg-[rgba(13,148,136,0.08)] rounded-lg transition-all duration-200 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10 dark:rounded-xl">
                    <Lightbulb className="w-4 h-4 mr-3" />
                    How it works
                  </Link>
                  <Link href={`/trip/${trip.id}`} className="flex items-center px-3 py-2.5 text-sm font-medium text-[#0D3D39]/65 hover:text-[#0D9488] hover:bg-[rgba(13,148,136,0.08)] rounded-lg transition-all duration-200 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10 dark:rounded-xl">
                    <Calendar className="w-4 h-4 mr-3" />
                    Trip Calendar
                  </Link>
                  <Link href={`/trip/${trip.id}/members`} className="flex items-center px-3 py-2.5 text-sm font-medium text-[#0D3D39]/65 hover:text-[#0D9488] hover:bg-[rgba(13,148,136,0.08)] rounded-lg transition-all duration-200 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10 dark:rounded-xl">
                    <Users className="w-4 h-4 mr-3" />
                    Member Schedules
                  </Link>
                </nav>

                {/* User Profile */}
                <div className="px-4 py-4 border-t border-[rgba(13,148,136,0.12)] dark:border-white/10">
                  <div className="flex items-center">
                    <Avatar className="w-10 h-10 ring-2 ring-[rgba(13,148,136,0.20)] dark:ring-cyan-400/30">
                      <AvatarImage src={user?.profileImageUrl || undefined} alt={user?.firstName || 'User'} />
                      <AvatarFallback className="bg-[rgba(13,148,136,0.12)] text-[#0D9488] dark:bg-gradient-to-br dark:from-cyan-500/20 dark:to-violet-500/20 dark:text-white">
                        {(user?.firstName?.[0] || user?.email?.[0] || 'U').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-[#0D3D39] dark:text-white">
                        {user?.firstName && user?.lastName
                          ? `${user.firstName} ${user.lastName}`
                          : user?.firstName || user?.email || 'User'
                        }
                      </p>
                      <p className="text-xs text-[#0D3D39]/55 dark:text-slate-400">{user?.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <FloatLogo height={28} variant="dark" />
        </div>
        <div className="flex items-center space-x-3">
          <NotificationIcon />
          <Avatar className="w-8 h-8 ring-2 ring-[rgba(13,148,136,0.20)] dark:ring-white/20">
            <AvatarImage src={user?.profileImageUrl || undefined} alt={user?.firstName || 'User'} />
            <AvatarFallback className="text-xs bg-[rgba(13,148,136,0.12)] text-[#0D9488] dark:bg-white/15 dark:text-white">
              {(user?.firstName?.[0] || user?.email?.[0] || 'U').toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  );
}
