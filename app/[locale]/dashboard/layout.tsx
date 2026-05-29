import { ToggleSidebarProvider } from "@/context/ToggleSidebar";
import Sidebar from "@/components/sidebar/Sidebar";
import { PomodoroProvider } from "@/context/PomodoroContext";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
      <ToggleSidebarProvider>
        <PomodoroProvider>
          <main className="flex min-h-screen bg-white dark:bg-[#0c0c0c] text-gray-900 dark:text-white pb-16 lg:pb-0">
            <Sidebar />
            <section className="flex flex-col flex-grow min-h-screen overflow-hidden">
              <div className="flex-grow">{children}</div>
            </section>
          </main>
        </PomodoroProvider>
      </ToggleSidebarProvider>
  );
};

export default DashboardLayout;
