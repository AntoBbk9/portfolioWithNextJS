"use client";

import axios from "axios";
import useSWR from "swr";
import { useMemo, useState } from "react";
import { FiArrowDownRight, FiArrowUpRight, FiSearch } from "react-icons/fi";
import Projets from "@/components/projets";
import { useLanguage } from "@/components/language-provider";

type Project = {
  id: number;
  image?: string;
  titre: string;
  description: string;
  annee: string;
  role: string;
  lienDuSite: string;
  demoUrl?: string;
  type: string;
};

const fetchProjects = async () => {
  const { data } = await axios.get<Project[]>('/api/projects');
  return data.filter((project) => project.type === 'developpement');
};

const englishCopy: Record<number, { title: string; description: string; role: string }> = {
  1: {
    title: 'StudyBoard — Teacher portal',
    description: 'A school management platform that helps teachers deliver lessons, follow student progress, assign work, connect with parents and organize school resources in one place.',
    role: 'Web developer',
  },
  2: {
    title: 'StudyBoard — Student portal',
    description: 'A dedicated student space to review grades, access courses and learning resources, and keep track of school activities.',
    role: 'Web developer',
  },
  3: {
    title: 'StudyBoard — Parent portal',
    description: 'A clear view of each child’s attendance, grades and school life, with access to resources and tuition payment.',
    role: 'Web developer',
  },
  4: {
    title: 'MRHE — Ministry of Water Resources and Electricity',
    description: 'A digital management initiative for the Republic of the Congo’s Ministry of Water Resources and Electricity, designed to improve administration and resource monitoring.',
    role: 'Web developer',
  },
  5: {
    title: 'BR Civil — Civil registry platform',
    description: 'A birth registration platform for the civil registry in the Republic of the Congo, including citizen registration and notification workflows.',
    role: 'Web developer',
  },
  8: {
    title: 'Kapita Production',
    description: 'An online experience for discovering and purchasing pineapple-based wines and juices from Kapita Production.',
    role: 'Web developer',
  },
};

export default function ProjetDeveloppement() {
  const { language } = useLanguage();
  const [query, setQuery] = useState('');
  const isEnglish = language === 'en';
  const { data: projects = [], error, isLoading } = useSWR('/api/projects?type=developpement', fetchProjects, {
    revalidateOnFocus: true,
    dedupingInterval: 30_000,
  });

  const visibleProjects = useMemo(() => projects.filter((project) => {
    const translated = isEnglish ? englishCopy[project.id] : undefined;
    const searchable = [translated?.title ?? project.titre, translated?.description ?? project.description, translated?.role ?? project.role, project.annee].join(' ').toLocaleLowerCase();
    return searchable.includes(query.trim().toLocaleLowerCase());
  }), [isEnglish, projects, query]);

  return (
    <main id="top" className="portfolio-page">
      <section className="development-intro" aria-labelledby="development-title">
        <div className="intro-copy">
          <p className="eyebrow"><span className="eyebrow-dot" />{isEnglish ? 'Selected work · 2024—2025' : 'Projets sélectionnés · 2024—2025'}</p>
          <h1 id="development-title">
            {isEnglish ? <>Built with <em>purpose.</em></> : <>Le code au service<br /><em>des idées.</em></>}
          </h1>
          <p className="intro-description">
            {isEnglish
              ? 'Digital products made to solve real problems — thoughtful interfaces, useful tools and experiences built around people.'
              : 'Des produits numériques conçus pour répondre à de vrais besoins : des interfaces utiles, des outils accessibles et des expériences pensées pour les personnes.'}
          </p>
        </div>
        <div className="intro-aside">
          <span className="aside-index">01 / 02</span>
          <p>{isEnglish ? 'Web development' : 'Développement web'}</p>
          <span className="aside-line" />
          <a className="scroll-link" href="#projects-list">
            {isEnglish ? 'Explore projects' : 'Explorer les projets'}
            <FiArrowDownRight aria-hidden="true" />
          </a>
        </div>
        <div className="intro-stamp" aria-hidden="true">A<span>B</span></div>
      </section>

      <section className="projects-section" id="projects-list" aria-labelledby="projects-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{isEnglish ? 'The work' : 'Le portfolio'}</p>
            <h2 id="projects-heading">{isEnglish ? 'A few things I’ve built' : 'Quelques projets réalisés'}</h2>
          </div>
          <div className="project-controls">
            <label className="project-search">
              <FiSearch aria-hidden="true" />
              <span className="sr-only">{isEnglish ? 'Search projects' : 'Rechercher un projet'}</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={isEnglish ? 'Search projects' : 'Rechercher'}
              />
            </label>
            <span className="project-count" aria-live="polite">{String(visibleProjects.length).padStart(2, '0')} <span>/ {String(projects.length).padStart(2, '0')}</span></span>
          </div>
        </div>

        {isLoading && (
          <div className="project-loading" role="status" aria-live="polite">
            <span className="loading-orbit" />
            {isEnglish ? 'Loading selected work…' : 'Chargement des projets…'}
          </div>
        )}
        {error && !isLoading && (
          <div className="project-error" role="alert">
            <p>{isEnglish ? 'Projects could not be loaded right now.' : 'Les projets ne sont pas disponibles pour le moment.'}</p>
            <button type="button" onClick={() => window.location.reload()}>{isEnglish ? 'Try again' : 'Réessayer'}</button>
          </div>
        )}
        {!isLoading && !error && visibleProjects.length === 0 && (
          <div className="project-empty">{isEnglish ? 'No project matches your search.' : 'Aucun projet ne correspond à votre recherche.'}</div>
        )}
        <div className="project-list">
          {visibleProjects.map((project, index) => {
            const translated = isEnglish ? englishCopy[project.id] : undefined;
            return (
              <Projets
                key={project.id}
                number={String(index + 1).padStart(2, '0')}
                image={project.image ?? ''}
                titre={translated?.title ?? project.titre}
                description={translated?.description ?? project.description}
                annee={project.annee}
                role={translated?.role ?? project.role}
                lienDuSite={project.lienDuSite}
                demoUrl={project.demoUrl}
                language={language}
              />
            );
          })}
        </div>
      </section>
      <footer className="portfolio-footer">
        <span>ANTOINETTE BELEBELE</span>
        <span>{isEnglish ? 'Selected digital work' : 'Projets numériques sélectionnés'}</span>
        <a href="#top" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          {isEnglish ? 'Back to top' : 'Retour en haut'} <FiArrowUpRight aria-hidden="true" />
        </a>
      </footer>
    </main>
  );
}
