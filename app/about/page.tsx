"use client";

import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import ContactForm from "@/components/contactForm";
import { useLanguage } from "@/components/language-provider";

const technologies = ["HTML", "CSS", "JavaScript", "Node.js", "React", "Next.js", "Figma", "Git", "GitHub", "Bootstrap", "Tailwind CSS"];

export default function About() {
  const { language } = useLanguage();
  const isEnglish = language === "en";

  return (
    <main id="main-content" className="about-page">
      <section className="about-intro" aria-labelledby="about-title">
        <div>
          <p className="section-kicker">{isEnglish ? "The person behind the work" : "Derrière les projets"}</p>
          <h1 id="about-title">{isEnglish ? "About me" : "À propos de moi"}</h1>
        </div>
        <div className="about-intro-copy">
          <h2>{isEnglish ? "Full-stack developer and web designer with a background in general education." : "Développeuse full-stack et web designer, diplômée en pédagogie générale."}</h2>
          <p>
            {isEnglish
              ? "I’m looking for meaningful opportunities to build accessible, intuitive web products. I enjoy solving problems, learning new technologies and shaping ideas into useful experiences. Outside of code, I’m inspired by music, design and the people I work with."
              : "Je recherche des opportunités enrichissantes pour créer des produits web accessibles et intuitifs. J’aime résoudre des problèmes, apprendre de nouvelles technologies et transformer des idées en expériences utiles. En dehors du code, la musique, le design et les rencontres nourrissent ma curiosité."}
          </p>
          <div className="home-actions">
            <a className="brand-button" href={isEnglish ? "/CV_Antho_Belebele_EN.pdf" : "/CV_Antho_Belebele_FR.pdf"} download={isEnglish ? "Antoinette_Belebele_CV_EN.pdf" : "Antoinette_Belebele_CV_FR.pdf"}>
              {isEnglish ? "Download my CV" : "Télécharger mon CV"} <FiDownload aria-hidden="true" />
            </a>
            <a className="social-link" href="https://www.linkedin.com/in/antoinette-belebele-443943260/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedinIn aria-hidden="true" /></a>
            <a className="social-link" href="https://github.com/AntoBbk9" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub aria-hidden="true" /></a>
          </div>
        </div>
      </section>

      <div className="about-photo-grid" aria-label={isEnglish ? "Selected photos" : "Quelques photos"}>
        <img src="/img2.jpg" alt="" />
        <img src="/img.jpg" alt="" />
        <img src="/img3.jpg" alt="" />
      </div>

      <section className="about-section" aria-labelledby="skills-title">
        <div>
          <p className="section-kicker">{isEnglish ? "What I work with" : "Mes outils"}</p>
          <h2 id="skills-title">{isEnglish ? "Skills & tools" : "Compétences"}</h2>
        </div>
        <div>
          <p className="about-section-copy">
            {isEnglish
              ? "I keep developing my skills in web development and design, exploring tools and methods that help me make modern, reliable and user-focused products."
              : "Je développe continuellement mes compétences en développement web et en design, en explorant les outils et méthodes qui permettent de créer des produits modernes, fiables et centrés sur les utilisateurs."}
          </p>
          <div className="skill-list">
            {technologies.map((technology) => <span key={technology} className="skill-chip">{technology}</span>)}
          </div>
        </div>
      </section>

      <section className="about-section" aria-labelledby="experience-title">
        <div>
          <p className="section-kicker">{isEnglish ? "Experience" : "Parcours"}</p>
          <h2 id="experience-title">{isEnglish ? "Where I’ve contributed" : "Mes expériences"}</h2>
        </div>
        <div>
          <div className="experience-title">
            <h3>{isEnglish ? "Front-End Developer" : "Développeuse Front-End"}</h3>
            <span>Jan 2025 – Sep 2025</span>
          </div>
          <p className="experience-company">BML Business Center</p>
          <ul className="experience-list">
            <li>{isEnglish ? "Built and improved interactive, responsive interfaces using React, HTML, CSS and Tailwind CSS." : "Développement et amélioration d’interfaces interactives et réactives avec React, HTML, CSS et Tailwind CSS."}</li>
            <li>{isEnglish ? "Improved performance and accessibility across web applications." : "Optimisation des performances et de l’accessibilité des applications web."}</li>
            <li>{isEnglish ? "Worked with the backend team to integrate frontend features with the API." : "Collaboration avec l’équipe backend pour intégrer les fonctionnalités frontend à l’API."}</li>
            <li>{isEnglish ? "Contributed to code reviews and technical discussions using web development best practices." : "Participation aux revues de code et aux échanges techniques dans le respect des bonnes pratiques."}</li>
          </ul>
        </div>
      </section>

      <ContactForm />
    </main>
  );
}
