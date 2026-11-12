"use client";

import axios from "axios";
import useSWR from "swr";
import { useMemo, useState } from "react";
import { FiArrowDownRight, FiArrowUpRight, FiSearch } from "react-icons/fi";
import Projets from "@/components/projets";
import { englishProjectCopy } from "@/components/project-translations";
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

const fetchProjects = async () => {
  const { data } = await axios.get<Project[]>("/api/projects");
  return data.filter((project) => project.type === "developpement");
};

export default function ProjetDeveloppement() {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  const [query, setQuery] = useState("");
  const { data: projects = [], error, isLoading, mutate } = useSWR("/api/projects?type=developpement", fetchProjects, {
    revalidateOnFocus: true,
    dedupingInterval: 30_000,
  });

  const visibleProjects = useMemo(() => projects.filter((project) => {
    const translation = isEnglish ? englishProjectCopy[project.id] : undefined;
    const searchable = [translation?.title ?? project.titre, translation?.description ?? project.description, translation?.role ?? project.role, project.annee].join(" ").toLocaleLowerCase();
    return searchable.includes(query.trim().toLocaleLowerCase());
  }), [isEnglish, projects, query]);

  return (
    <main id="main-content" className="portfolio-page">
      <section className="development-intro" aria-labelledby="development-title">
        <div className="intro-copy">
          <p className="eyebrow"><span className="eyebrow-dot" />{isEnglish ? "Selected work · 2024—2025" : "Projets sélectionnés · 2024—2025"}</p>
          <h1 id="development-title">{isEnglish ? <>Web that works.<br /><em>Made for people.</em></> : <>Le web qui aide.<br /><em>Créé pour les gens.</em></>}</h1>
          <p className="intro-description">
            {isEnglish
              ? "I build useful digital products with care: clear interfaces, accessible technology and experiences designed around real needs."
              : "Je conçois des produits numériques utiles avec exigence : des interfaces claires, des technologies accessibles et des expériences pensées pour de vrais besoins."}
          </p>
        </div>
        <div className="intro-aside">
          <span className="aside-index">01 / 02</span>
          <p>{isEnglish ? "Web development" : "Développement web"}</p>
          <span className="aside-line" />
          <a className="scroll-link" href="#projects-list">{isEnglish ? "Explore projects" : "Explorer les projets"}<FiArrowDownRight aria-hidden="true" /></a>
        </div>
        <div className="intro-stamp" aria-hidden="true">AB</div>
      </section>

      <section className="projects-section" id="projects-list" aria-labelledby="projects-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{isEnglish ? "Selected work" : "Sélection"}</p>
            <h2 id="projects-heading">{isEnglish ? "Projects made to matter" : "Des projets qui ont du sens"}</h2>
          </div>
          <div className="project-controls">
            <label className="project-search">
              <FiSearch aria-hidden="true" />
              <span className="sr-only">{isEnglish ? "Search projects" : "Rechercher un projet"}</span>
              <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={isEnglish ? "Search projects" : "Rechercher"} />
            </label>
            <span className="project-count" aria-live="polite">{String(visibleProjects.length).padStart(2, "0")} <span>/ {String(projects.length).padStart(2, "0")}</span></span>
          </div>
        </div>

        {isLoading && <div className="project-loading" role="status"><span className="loading-orbit" />{isEnglish ? "Loading projects…" : "Chargement des projets…"}</div>}
        {error && !isLoading && <div className="project-error" role="alert"><p>{isEnglish ? "Projects could not be loaded." : "Les projets ne peuvent pas être chargés."}</p><button type="button" onClick={() => void mutate()}>{isEnglish ? "Try again" : "Réessayer"}</button></div>}
        {!isLoading && !error && visibleProjects.length === 0 && <div className="project-empty">{isEnglish ? "No project matches your search." : "Aucun projet ne correspond à votre recherche."}</div>}
        <div className="project-list">
          {visibleProjects.map((project, index) => (
            <Projets key={project.id} projectId={project.id} number={String(index + 1).padStart(2, "0")} image={project.image ?? ""} titre={project.titre} description={project.description} annee={project.annee} role={project.role} lienDuSite={project.lienDuSite} demoUrl={project.demoUrl} language={language} />
          ))}
        </div>
      </section>

      <footer className="portfolio-footer">
        <span>ANTOINETTE BELEBELE</span>
        <span>{isEnglish ? "Web development · Selected work" : "Développement web · Projets sélectionnés"}</span>
        <a href="#main-content" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>{isEnglish ? "Back to top" : "Retour en haut"} <FiArrowUpRight aria-hidden="true" /></a>
      </footer>
    </main>
  );
}
