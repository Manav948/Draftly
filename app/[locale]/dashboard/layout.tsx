import { ToggleSidebarProvider } from "@/context/ToggleSidebar";
import Sidebar from "@/components/sidebar/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
      <ToggleSidebarProvider>
        <main className=" flex min-h-screen dark:bg-[#000000] dark:text-[#f03d3d]">
          <Sidebar />
          <section className="flex flex-col flex-grow min-h-screen overflow-hidden">
            <div className="flex-grow">{children}</div>
          </section>
        </main>
      </ToggleSidebarProvider>
  );
};

export default DashboardLayout;
