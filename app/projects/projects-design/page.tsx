"use client";

import axios from "axios";
import useSWR from "swr";
import { FiArrowDownRight } from "react-icons/fi";
import Projets from "@/components/projets";
import { useLanguage } from "@/components/language-provider";

interface Project {
  id: number;
  image?: string;
  titre: string;
  description: string;
  annee: string;
  role: string;
  lienDuSite: string;
  demoUrl?: string;
  type: string;
}

const fetchDesignProjects = async () => {
  const { data } = await axios.get<Project[]>("/api/projects");
  return data.filter((project) => project.type === "design");
};

export default function ProjetDesign() {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  const { data: projects = [], error, isLoading, mutate } = useSWR("/api/projects?type=design", fetchDesignProjects, { revalidateOnFocus: true });

  return (
    <main id="main-content" className="portfolio-page">
      <section className="development-intro" aria-labelledby="design-title">
        <div className="intro-copy">
          <p className="eyebrow"><span className="eyebrow-dot" />{isEnglish ? "Selected work · 2024—2025" : "Projets sélectionnés · 2024—2025"}</p>
          <h1 id="design-title">{isEnglish ? <>Thoughtful ideas.<br /><em>Beautifully clear.</em></> : <>Des idées utiles.<br /><em>Des interfaces claires.</em></>}</h1>
          <p className="intro-description">{isEnglish ? "Digital design focused on people: accessible journeys, clear systems and interfaces that make everyday tasks feel easier." : "Un design numérique centré sur les personnes : des parcours accessibles, des systèmes clairs et des interfaces qui simplifient le quotidien."}</p>
        </div>
        <div className="intro-aside">
          <span className="aside-index">02 / 02</span>
          <p>{isEnglish ? "Product & interface design" : "Design produit & interfaces"}</p>
          <span className="aside-line" />
          <a className="scroll-link" href="#design-projects">{isEnglish ? "Explore projects" : "Explorer les projets"}<FiArrowDownRight aria-hidden="true" /></a>
        </div>
        <div className="intro-stamp" aria-hidden="true">AB</div>
      </section>
      <section id="design-projects" className="projects-section" aria-label={isEnglish ? "Design projects" : "Projets de design"}>
        {isLoading && <div className="project-loading" role="status"><span className="loading-orbit" />{isEnglish ? "Loading projects…" : "Chargement des projets…"}</div>}
        {error && !isLoading && <div className="project-error" role="alert"><p>{isEnglish ? "Projects could not be loaded." : "Les projets ne peuvent pas être chargés."}</p><button type="button" onClick={() => void mutate()}>{isEnglish ? "Try again" : "Réessayer"}</button></div>}
        <div className="project-list">
          {projects.map((project, index) => <Projets key={project.id} projectId={project.id} number={String(index + 1).padStart(2, "0")} image={project.image ?? ""} titre={project.titre} description={project.description} annee={project.annee} role={project.role} lienDuSite={project.lienDuSite} demoUrl={project.demoUrl} language={language} />)}
        </div>
      </section>
    </main>
  );
}
