"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";
import { useLanguage } from "@/components/language-provider";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const isEnglish = language === "en";
  const links = [
    { name: isEnglish ? "Home" : "Accueil", href: "/" },
    { name: isEnglish ? "About" : "À propos", href: "/about" },
    { name: isEnglish ? "Projects" : "Projets", href: "/projects" },
  ];

  const navLinks = (mobile = false) => links.map((link) => (
    <Link
      key={link.href}
      href={link.href}
      aria-current={pathname === link.href ? "page" : undefined}
      onClick={() => mobile && setIsOpen(false)}
    >
      {link.name}
    </Link>
  ));

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="brand" aria-label={isEnglish ? "Antoinette Belebele, home" : "Antoinette Belebele, accueil"}>
          <span className="brand-name">ANTOINETTE BELEBELE</span>
          <span className="brand-note">{isEnglish ? "Web developer · Portfolio" : "Développeuse web · Portfolio"}</span>
        </Link>
        <nav className="site-nav" aria-label={isEnglish ? "Main navigation" : "Navigation principale"}>
          {navLinks()}
        </nav>
        <div className="header-actions">
          <div className="language-toggle" role="group" aria-label={isEnglish ? "Choose language" : "Choisir la langue"}>
            <button type="button" aria-pressed={language === "fr"} onClick={() => setLanguage("fr")}>FR</button>
            <button type="button" aria-pressed={language === "en"} onClick={() => setLanguage("en")}>EN</button>
          </div>
          <button
            type="button"
            className="mobile-menu-button"
            aria-label={isOpen ? (isEnglish ? "Close menu" : "Fermer le menu") : (isEnglish ? "Open menu" : "Ouvrir le menu")}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
          </button>
        </div>
        {isOpen && (
          <nav id="mobile-navigation" className="mobile-nav" aria-label={isEnglish ? "Mobile navigation" : "Navigation mobile"}>
            {navLinks(true)}
          </nav>
        )}
      </div>
    </header>
  );
}
