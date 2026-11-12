"use client";

import { FiArrowUpRight } from "react-icons/fi";
import { englishProjectCopy } from "@/components/project-translations";
import type { Language } from "@/components/language-provider";

export interface ProjetProps {
  projectId?: number;
  image: string;
  titre: string;
  description: string;
  annee: string;
  role: string;
  lienDuSite: string;
  demoUrl?: string;
  number?: string;
  language?: Language;
}

export default function Projets({
  projectId,
  image,
  titre,
  description,
  annee,
  role,
  lienDuSite,
  demoUrl,
  number = "01",
  language = "fr",
}: ProjetProps) {
  const englishCopy = language === "en" && projectId ? englishProjectCopy[projectId] : undefined;
  const projectTitle = englishCopy?.title ?? titre;
  const projectDescription = englishCopy?.description ?? description;
  const projectRole = englishCopy?.role ?? role;
  const isEnglish = language === "en";

  return (
    <article className="project-card">
      <a
        className="project-visual"
        href={lienDuSite}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${isEnglish ? "Open" : "Ouvrir"} ${projectTitle}`}
      >
        {image ? (
          <img src={image} alt={`${isEnglish ? "Preview of" : "Aperçu du projet"} ${projectTitle}`} loading="lazy" />
        ) : (
          <div className="project-visual-empty">{isEnglish ? "Preview coming soon" : "Aperçu bientôt disponible"}</div>
        )}
        <span className="visual-index">{number} <span>— {annee}</span></span>
        <span className="visual-action" aria-hidden="true"><FiArrowUpRight /></span>
      </a>
      <div className="project-details">
        <div className="project-title-row">
          <div>
            <p className="project-kicker">{isEnglish ? "Digital product" : "Produit numérique"} <span>·</span> {projectRole}</p>
            <h3>{projectTitle}</h3>
          </div>
          <span className="project-year">{annee}</span>
        </div>
        <p className="project-description">{projectDescription}</p>
        <div className="project-links">
          <a href={lienDuSite} target="_blank" rel="noopener noreferrer" className="project-link-primary">
            {isEnglish ? "Visit project" : "Voir le projet"} <FiArrowUpRight aria-hidden="true" />
          </a>
          {demoUrl && (
            <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="project-link-secondary">
              {isEnglish ? "Source code" : "Code source"}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
