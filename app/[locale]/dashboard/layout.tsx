import { ToggleSidebarProvider } from "@/context/ToggleSidebar";
import Sidebar from "@/components/sidebar/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ToggleSidebarProvider>
      <main className="flex min-h-screen bg-white dark:bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 dark:text-white">
        <Sidebar />
        <section className="flex flex-col flex-grow">
          <div className="flex-grow">{children}</div>
        </section>
      </main>
    </ToggleSidebarProvider>
  );
};

export default DashboardLayout;
