'use client'

import DashboardSidebar from '@/components/DashboardSidebar'
import Logo from '@/components/Logo'
import { useSession } from '@/lib/auth-client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import {
    FaBuilding,
    FaCalendarAlt,
    FaHistory,
    FaHome,
    FaPlus,
    FaSignOutAlt,
    FaTicketAlt,
    FaUserCircle,
    FaUsers,
    FaUserShield
} from 'react-icons/fa'

const DashboardLayout = ({ children }) => {
    const { data: session } = useSession()

    const role = session?.user?.role


    return (
        <div className="h-screen flex bg-slate-950">
            {/* Sidebar */}
            <DashboardSidebar />

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
            <Toaster/>
        </div>
    )
}

export default DashboardLayout