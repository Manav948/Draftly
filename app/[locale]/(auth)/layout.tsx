import { LocaleSwitcher } from "@/components/switcher/LocaleSwitcher";
import { ThemeSwitcher } from "@/components/switcher/ThemeSwitcher";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <main className="flex flex-col justify-center items-center min-h-screen w-full p-4 md:p-6 bg-white dark:bg-[#0c0c0c]">
    <div className="absolute top-0 left-0 flex justify-end w-full">
      <div className="flex items-center gap-2 max-w-7xl p-4 md:p-6">
        <ThemeSwitcher alignHover={"end"} alignDropdown={"end"} size={"icon"} variant={"outline"} />
        <LocaleSwitcher alignHover={"end"} alignDropdown={"end"} size={"icon"} variant={"outline"} />
      </div>
    </div>
    <div className="w-full mt-16 sm:mt-0 flex flex-col justify-center">
      {children}
    </div>
  </main>;
}

export default AuthLayout;