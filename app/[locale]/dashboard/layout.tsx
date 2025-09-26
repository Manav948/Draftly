"use client"
import Sidebar from "@/components/sidebar/Sidebar"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="flex min-h-screen bg-gray-50 text-gray-900">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 shadow-sm">
                <Sidebar />
            </aside>

            {/* Main content */}
            <section className="flex-1 p-6 overflow-y-auto">
                {children}
            </section>
        </main>
    )
}

export default DashboardLayout
