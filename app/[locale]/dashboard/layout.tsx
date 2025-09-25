import Sidebar from "@/components/sidebar/Sidebar"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main>
            <Sidebar />
            {children}
        </main>
    )
} 

export default DashboardLayout