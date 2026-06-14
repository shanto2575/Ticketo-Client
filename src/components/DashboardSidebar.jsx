'use client'

import Logo from '@/components/Logo'
import { useSession } from '@/lib/auth-client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {
  FaBuilding,
  FaCalendarAlt,
  FaHome,
  FaPlus,
  FaSignOutAlt,
  FaUsers,
  FaHistory,
  FaTicketAlt,
  FaUserCircle,
  FaUserShield
} from 'react-icons/fa'

const DashboardLayout = ({ children }) => {
  const { data: session } = useSession()


  const organizerMenu = [
    {
      key: 'overview',
      label: 'Dashboard Overview',
      path: '/dashboard/organizer',
      icon: FaHome,
    },
    {
      key: 'organization',
      label: 'Organization Profile',
      path: '/dashboard/organizer/organization',
      icon: FaBuilding,
    },
    {
      key: 'add-event',
      label: 'Add Event',
      path: '/dashboard/organizer/add-event',
      icon: FaPlus,
    },
    {
      key: 'manage-events',
      label: 'Manage Events',
      path: '/dashboard/organizer/manage-events',
      icon: FaCalendarAlt,
    },
    {
      key: 'attendees',
      label: 'Attendees',
      path: '/dashboard/organizer/attendees',
      icon: FaUsers,
    },
  ]
  const attendeeMenu = [
    {
      key: "overview",
      label: "Overview",
      path: "/dashboard/attendees",
      icon: FaUserCircle,
    },
    {
      key: "tickets",
      label: "My Tickets",
      path: "/dashboard/attendees/tickets",
      icon: FaTicketAlt,
    },
    {
      key: "payments",
      label: "Payments",
      path: "/dashboard/attendees/payments",
      icon: FaHistory,
    },
  ]
  const adminMenu = [
    {
      key: "users",
      label: "Users",
      path: "/dashboard/users",
      icon: FaUserShield,
    },
    {
      key: "events",
      label: "Approve Events",
      path: "/dashboard/events",
      icon: FaCalendarAlt,
    },
    {
      key: "transactions",
      label: "Transaction Logs",
      path: "/dashboard/transactions",
      icon: FaHistory,
    },
  ]

  const role = session?.user?.role
  // const role='attendee'
  const menuItem = role === 'organizer' ? organizerMenu : role === 'attendee' ? attendeeMenu : role === 'admin' ? adminMenu : [];

  const handleLogout = async () => {
    // logout logic here
    console.log('Logout clicked')
  }

  return (
    <div className="h-screen flex bg-slate-950">
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/10">
        <div className="h-full flex flex-col bg-slate-950/80 backdrop-blur-xl">
          {/* Logo */}
          <div className="px-6 py-5 border-b border-white/5">
            <Logo />
          </div>

          {/* User Info */}
          <div className="px-6 py-5 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-pink-500/60 shrink-0">
                <Image
                  width={48}
                  height={48}
                  src={
                    session?.user?.image ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      session?.user?.name || 'User'
                    )}&background=7c3aed&color=fff&bold=true`
                  }
                  alt="User Avatar"
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="overflow-hidden">
                <h3 className="text-white font-semibold truncate">
                  {session?.user?.name || 'Guest User'}
                </h3>

                <p
                  className={`text-xs font-bold uppercase tracking-wider ${role === 'admin'
                    ? 'text-yellow-400'
                    : role === 'organizer'
                      ? 'text-indigo-400'
                      : 'text-pink-400'
                    }`}
                >
                  {role || 'User'}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest px-3 mb-3">
              Navigation
            </p>

            <div className="space-y-1">
              {menuItem.map((item) => {
                const Icon = item.icon

                return (
                  <Link
                    key={item.key}
                    href={item.path}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200"
                  >
                    <span className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
                      <Icon size={14} />
                    </span>

                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* Footer Actions */}
          <div className="px-3 py-4 border-t border-white/5 space-y-1">
            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              <span className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
                <FaHome size={14} />
              </span>

              Back to Site
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/5 transition-all duration-200 cursor-pointer"
            >
              <span className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
                <FaSignOutAlt size={14} />
              </span>

              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout