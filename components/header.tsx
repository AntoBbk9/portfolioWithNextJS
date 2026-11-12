"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import { useLanguage } from "@/components/language-provider";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage, theme, setTheme } = useLanguage();
  const isEnglish = language === "en";
  const isProjectsRoute = pathname.startsWith("/projects");
  const links = [
    { label: isEnglish ? "Home" : "Accueil", href: "/", active: pathname === "/" },
    { label: isEnglish ? "About" : "À propos", href: "/about", active: pathname === "/about" },
    { label: isEnglish ? "Projects" : "Projets", href: "/projects/projects-development", active: isProjectsRoute },
  ];

  function closeMenu() {
    setIsOpen(false);
  }

  const navigation = (mobile = false) => links.map((link) => (
    <Link
      key={link.href}
      href={link.href}
      className="site-nav-link"
      aria-current={link.active ? "page" : undefined}
      onClick={mobile ? closeMenu : undefined}
    >
      {link.label}
    </Link>
  ));

  return (
    <>
      <a className="skip-link" href="#main-content">{isEnglish ? "Skip to content" : "Aller au contenu"}</a>
      <header className="site-header">
        <div className="site-header-inner">
          <Link href="/" className="brand" aria-label={isEnglish ? "Antoinette Belebele, home" : "Antoinette Belebele, accueil"} onClick={closeMenu}>
            <span className="brand-name">ANTOINETTE BELEBELE</span>
            <span className="brand-note">{isEnglish ? "Full-stack developer · Web designer" : "Développeuse full-stack · Web designer"}</span>
          </Link>

          <nav className="site-nav" aria-label={isEnglish ? "Main navigation" : "Navigation principale"}>
            {navigation()}
          </nav>

          <div className="header-actions">
            <div className="language-toggle" role="group" aria-label={isEnglish ? "Choose language" : "Choisir la langue"}>
              <button type="button" aria-pressed={language === "fr"} onClick={() => setLanguage("fr")}>FR</button>
              <button type="button" aria-pressed={language === "en"} onClick={() => setLanguage("en")}>EN</button>
            </div>
            <button
              type="button"
              className="theme-toggle"
              aria-label={theme === "dark" ? (isEnglish ? "Switch to light mode" : "Activer le mode clair") : (isEnglish ? "Switch to dark mode" : "Activer le mode sombre")}
              title={theme === "dark" ? (isEnglish ? "Light mode" : "Mode clair") : (isEnglish ? "Dark mode" : "Mode sombre")}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
            </button>
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
              {navigation(true)}
            </nav>
          )}
        </div>
      </header>
    </>
  );
}
