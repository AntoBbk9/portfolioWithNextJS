"use client";

import axios from "axios";
import useSWR from "swr";
import Link from "next/link";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import ContactForm from "@/components/contactForm";
import Projets from "@/components/projets";
import { useLanguage } from "@/components/language-provider";

interface Project {
  id: number;
  image: string;
  titre: string;
  description: string;
  annee: string;
  role: string;
  lienDuSite: string;
  demoUrl?: string;
  type: string;
}

const fetchProjects = async () => (await axios.get<Project[]>("/api/projects")).data;

export default function Home() {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  const { data: projects = [], isLoading } = useSWR<Project[]>("/api/projects", fetchProjects, { revalidateOnFocus: true });
  const featuredProject = projects.find((project) => project.type === "developpement");

  return (
    <main id="main-content" className="home-page">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-copy">
          <p className="section-kicker">{isEnglish ? "Full-stack developer · Web designer" : "Développeuse full-stack · Web designer"}</p>
          <h1 id="home-title">{isEnglish ? "Hello, I’m" : "Bonjour, je suis"}<br /><span>Antoinette Belebele.</span></h1>
          <p>
            {isEnglish
              ? "I build thoughtful digital experiences that bring together clear design, useful functionality and accessible technology."
              : "Je crée des expériences numériques soignées qui réunissent design clair, fonctionnalités utiles et technologies accessibles."}
          </p>
          <div className="home-actions">
            <a className="brand-button" href="#contact">{isEnglish ? "Let’s talk" : "Parlons de votre projet"} <FiArrowUpRight aria-hidden="true" /></a>
            <a className="social-link" href="https://www.linkedin.com/in/antoinette-belebele-443943260/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedinIn aria-hidden="true" /></a>
            <a className="social-link" href="https://github.com/AntoBbk9" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub aria-hidden="true" /></a>
          </div>
        </div>
        <div className="home-photo-frame">
          <img src="/_MG_5503.JPG.jpg" alt={isEnglish ? "Portrait of Antoinette Belebele" : "Portrait d’Antoinette Belebele"} className="home-photo" />
        </div>
      </section>

      <section className="content-section" aria-labelledby="featured-work-title">
        <div className="content-section-heading">
          <div>
            <p className="section-kicker">{isEnglish ? "Selected work" : "Sélection"}</p>
            <h2 id="featured-work-title">{isEnglish ? "Recent projects" : "Projets récents"}</h2>
          </div>
          <Link href="/projects/projects-development" className="text-link">
            {isEnglish ? "Browse all projects" : "Tous les projets"} <FiArrowUpRight aria-hidden="true" />
          </Link>
        </div>
        {isLoading && <p className="project-loading" role="status">{isEnglish ? "Loading projects…" : "Chargement des projets…"}</p>}
        {!isLoading && featuredProject && (
          <Projets
            projectId={featuredProject.id}
            image={featuredProject.image}
            titre={featuredProject.titre}
            description={featuredProject.description}
            annee={featuredProject.annee}
            role={featuredProject.role}
            lienDuSite={featuredProject.lienDuSite}
            demoUrl={featuredProject.demoUrl}
            language={language}
          />
        )}
      </section>

      <section className="content-section home-about" aria-labelledby="home-about-title">
        <div>
          <p className="section-kicker">{isEnglish ? "A little about me" : "À propos"}</p>
          <h2 id="home-about-title">{isEnglish ? "Design-minded. Detail-driven. Always curious." : "Un regard design, le souci du détail et la curiosité."}</h2>
        </div>
        <div>
          <p>
            {isEnglish
              ? "I’m a full-stack developer and web designer with a background in general education. I enjoy turning complex needs into accessible, intuitive web products, and I’m always learning with React, Node.js and Figma."
              : "Développeuse full-stack et web designer, diplômée en pédagogie générale, j’aime transformer des besoins complexes en produits web accessibles et intuitifs. J’explore continuellement React, Node.js et Figma."}
          </p>
          <Link href="/about" className="text-link" style={{ marginTop: 20 }}>
            {isEnglish ? "More about me" : "En savoir plus"} <FiArrowUpRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <ContactForm />
    </main>
  );
}
