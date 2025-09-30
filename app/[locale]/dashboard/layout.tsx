"use client";
import DashboardHeader from "@/components/header/DashboardHeader";
import Sidebar from "@/components/sidebar/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen bg-gray-950 dark:text-white">

      <aside className="text-black hidden md:flex flex-col min-h-screen dark:bg-gray-950 dark:border-gray-700 shadow-md">
        <Sidebar />
      </aside>

      <section className="flex-grow flex flex-col">
        <div className="top-0 z-40 sticky dark:bg-gray-950">
          <DashboardHeader />
        </div>

        <div className="flex-grow">
          {children}
        </div>
      </section>
    </main>
  );
};

export default DashboardLayout;
