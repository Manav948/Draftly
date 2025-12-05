import { ToggleSidebarProvider } from "@/context/ToggleSidebar";
import Sidebar from "@/components/sidebar/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
      <ToggleSidebarProvider>
        <main className=" min-h-screen
          bg-gradient-to-b from-white via-white to-gray-50
          dark:bg-gradient-to-b dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 
          dark:text-gray-100">
          <Sidebar />
          <section className="flex flex-col flex-1 min-h-screen">
            <div className="flex-1">{children}</div>
          </section>
        </main>
      </ToggleSidebarProvider>
  );
};

export default DashboardLayout;
