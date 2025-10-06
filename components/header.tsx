"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { name: "Accueil", href: "/" },
    { name: "À propos", href: "/about" },
    { name: "Projets", href: "/projects" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header className="fixed top-0 left-0 w-full bg-black z-50">
      <div className="flex justify-between p-4 w-full md:w-[80%] m-auto relative">
        <Link href="/">
          <h1 className="font-sans text-[16px] font-bold">ANTOINETTE BELEBELE</h1>
        </Link>

        {/* Menu Desktop */}
        <nav className="hidden md:flex gap-10">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                isActive(link.href)
                  ? "font-menu font-light text-black bg-[#BFDE42] px-5 py-2 rounded-xl"
                  : "font-menu font-light"
              }
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Bouton Hamburger (mobile) */}
        <div className="md:hidden">
          <button className="text-2xl" onClick={() => setIsOpen(!isOpen)}>
            <RxHamburgerMenu />
          </button>
        </div>

        {/* Menu Mobile (pop-up) */}
        {isOpen && (
          <nav className="absolute top-14 right-4 bg-white text-black shadow-lg rounded-xl p-4 flex flex-col gap-4 md:hidden z-50">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={
                  isActive(link.href)
                    ? "font-menu font-light text-black bg-[#BFDE42] px-5 py-2 rounded-xl"
                    : "font-menu font-light"
                }
              >
                {link.name}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
