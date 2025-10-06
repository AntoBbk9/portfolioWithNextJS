"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="md:w-[80%] mx-auto px-4 md:p-0">
      {/* Onglets */}
      <div className="flex gap-3 items-center mb-6">
        <Link 
          href="/projects/projects-development"
          className={`font-paragraph font-extralight text-xs pb-1 ${
            pathname === "/projects/projects-development" ? "border-b border-greenColor text-greenColor" : ""
          }`}
        >
          Projets de Développement Web
        </Link>
        |
        <Link 
          href="/projects/projects-design"
          className={`font-paragraph font-extralight text-xs pb-1 ${
            pathname === "/projects/projects-design" ? "border-b border-greenColor text-greenColor" : ""
          }`}
        >
          Projets de Web Design
        </Link>
      </div>

      {/* Contenu dynamique */}
      <div>{children}</div>
    </div>
  );
}
