"use client";

import { usePathname } from "next/navigation";

const Welcoming = () => {
  const pathname = usePathname();

  // Show for dashboard and its children (/dashboard/settings etc.)
  if (pathname.startsWith("/dashboard")) {
    return (
      <div className="text-gray-700 dark:text-gray-200">
        <p className="font-semibold text-lg">
          Hey, <span className="text-primary">Manav</span> 👋
        </p>
        <p className="text-sm">Welcome back to Draftly</p>
      </div>
    );
  }

  return null;
};

export default Welcoming;
