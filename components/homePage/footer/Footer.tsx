import { GithubLogo } from "@/components/svg/GithubLogo";
import { buttonVariants } from "@/components/ui/button";
import { LinkedinIcon, YoutubeIcon } from "lucide-react";
import Link from "next/link";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/",
    icon: <GithubLogo className="h-5 w-5" />,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/",
    icon: <LinkedinIcon className="h-5 w-5" />,
  },
  {
    label: "YouTube",
    href: "https://youtube.com/",
    icon: <YoutubeIcon className="h-5 w-5" />,
  },
];

export const Footer = () => {
  return (
    <footer className="mt-52 w-full border-t border-border bg-background">
      <div className="container max-w-screen-2xl py-6 sm:py-12 flex flex-col-reverse gap-6 sm:flex-row sm:items-center sm:justify-between">
        {/* Brand / Copyright */}
        <div className="text-center sm:text-left lg:text-center lg:pl-50 space-y-1">
          <p className="text-sm sm:text-base font-medium">
            Made with <span className="text-primary">love</span>
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground lg:font-medium">
            © {new Date().getFullYear()} Draftly. All rights reserved.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-2">
          {socialLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              className={buttonVariants({
                variant: "ghost",
                size: "icon",
                className:
                  "text-muted-foreground transition-colors hover:text-primary dark:bg-white",
              })}
            >
              {item.icon}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};
