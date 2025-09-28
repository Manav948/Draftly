"use client";
import DashboardHeader from "@/components/header/DashboardHeader";
import Sidebar from "@/components/sidebar/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen bg-gray-50 dark:text-gray-100">

      <aside className="text-black hidden md:flex flex-col border-r border-gray-200 bg-white min-h-screen dark:bg-gray-950 dark:border-gray-700 shadow-md">
        <Sidebar />
      </aside>

      <section className="flex-grow flex flex-col">
        {/* Sticky header */}
        <div className="top-0 z-40 sticky bg-white dark:bg-gray-950">
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
