import { ToggleSidebarProvider } from "@/context/ToggleSidebar";
import DashboardHeader from "@/components/header/DashboardHeader";
import Sidebar from "@/components/sidebar/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ToggleSidebarProvider>
      <main className="flex min-h-screen bg-white dark:bg-gray-950 dark:text-white">
        <Sidebar />
        <section className="flex flex-col flex-grow">
          <div className="sticky top-0 z-30">
            <DashboardHeader />
          </div>
          <div className="flex-grow">{children}</div>
        </section>
      </main>
    </ToggleSidebarProvider>
  );
};

export default DashboardLayout;
