"use client";

import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import type { Language } from "@/components/language-provider";

export interface ProjetProps {
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

export default function Projets({ image, titre, description, annee, role, lienDuSite, demoUrl, number = "01", language = "fr" }: ProjetProps) {
  const isEnglish = language === "en";

  return (
    <article className="project-card">
      <a className="project-visual" href={lienDuSite} target="_blank" rel="noopener noreferrer" aria-label={`${isEnglish ? 'Open' : 'Ouvrir'} ${titre}`}>
        {image ? (
          <img src={image} alt={`${isEnglish ? 'Preview of' : 'Aperçu du projet'} ${titre}`} loading="lazy" />
        ) : (
          <div className="project-visual-empty">{isEnglish ? 'Preview coming soon' : 'Aperçu bientôt disponible'}</div>
        )}
        <span className="visual-index">{number} <span>— {annee}</span></span>
        <span className="visual-action" aria-hidden="true"><FiArrowUpRight /></span>
      </a>
      <div className="project-details">
        <div className="project-title-row">
          <div>
            <p className="project-kicker">{isEnglish ? 'Digital product' : 'Produit numérique'} <span>·</span> {role}</p>
            <h3>{titre}</h3>
          </div>
          <span className="project-year">{annee}</span>
        </div>
        <p className="project-description">{description}</p>
        <div className="project-links">
          <a href={lienDuSite} target="_blank" rel="noopener noreferrer" className="project-link-primary">
            {isEnglish ? 'Visit live project' : 'Voir le projet'} <FiArrowUpRight aria-hidden="true" />
          </a>
          {demoUrl && (
            <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="project-link-secondary">
              <FiGithub aria-hidden="true" /> {isEnglish ? 'Source code' : 'Code source'}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
