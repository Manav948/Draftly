"use client"
import DashboardHeader from "@/components/header/DashboardHeader"
import Sidebar from "@/components/sidebar/Sidebar"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="flex min-h-screen bg-gray-50 text-gray-900">
            <aside className="w-64 bg-white border-r border-gray-200 shadow-sm">
                <Sidebar />
            </aside>
            <section className=" relative flex-grow flex flex-col` p-6 overflow-y-auto">
                <DashboardHeader />
                {children}
            </section>
        </main>
    )
}

export default DashboardLayout
