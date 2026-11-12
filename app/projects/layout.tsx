"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/components/language-provider";

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { language } = useLanguage();
  const isEnglish = language === "en";
  const tabs = [
    { href: "/projects/projects-development", label: isEnglish ? "Web development" : "Développement web", index: "01" },
    { href: "/projects/projects-design", label: isEnglish ? "Product design" : "Design produit", index: "02" },
  ];

  return (
    <div className="projects-shell">
      <nav className="project-tabs" aria-label={isEnglish ? "Project categories" : "Catégories de projets"}>
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className="project-tab"
            aria-current={pathname === tab.href ? "page" : undefined}
          >
            <span className="project-tab-index">{tab.index}</span>
            <span>{tab.label}</span>
          </Link>
        ))}
      </nav>
      {children}
    </div>
  );
}
