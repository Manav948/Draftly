import { ToggleSidebarProvider } from "@/context/ToggleSidebar";
import Sidebar from "@/components/sidebar/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
      <ToggleSidebarProvider>
        <main className=" flex min-h-screen
          bg-gradient-to-b from-white via-white to-gray-50
          dark:bg-gradient-to-b dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 
          dark:text-gray-100">
          <Sidebar />
          <section className="flex flex-col flex-grow min-h-screen overflow-hidden">
            <div className="flex-grow">{children}</div>
          </section>
        </main>
      </ToggleSidebarProvider>
  );
};

export default DashboardLayout;
