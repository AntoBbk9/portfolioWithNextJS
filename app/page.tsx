"use client";

import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@/components/buttons/button";
import ContactForm from "@/components/contactForm";
import Projets from "@/components/projets";
import axios from "axios";

function Home() {
  const [projets, setProjets] = useState<any[]>([]);
  const contactRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
    
  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await axios.get("/api/projects");
        setProjets(res.data.filter((p: any) => p.type === "developpement"));
      } catch (err) {
        console.error(err);
      }
    }
    fetchProjects();
  }, []);
  const scrollToContact = () => {
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <div className="w-full flex justify-center items-center flex-col">
        <div className="flex flex-col md:flex-row w-full md:w-[80%] md:justify-between items-center md:m-8">
          <div className="md:w-[30rem] xl:w-[34rem]">
            <div>
              <p className="font-sans font-bold text-3xl">Bonjour, Je suis</p>
              <p className="font-sans font-bold text-3xl pt-2">
                Antoinette Belebele.
              </p>
              <p className="font-paragraph font-extralight text-xs leading-loose pt-2">
                Développeuse web fullstack et web designer passionnée par la
                création de solutions innovantes et adaptées aux besoins des
                utilisateurs. Avec un œil attentif aux détails et un souci
                constant de la performance, je conçois des applications qui
                allient esthétisme et fonctionnalité pour offrir une expérience
                utilisateur optimale.
              </p>
            </div>
            <div className="flex gap-4 pt-6">
              <Button text="Contactez Moi" onClick={scrollToContact} />
              <div className="w-10 h-10 rounded-full bg-grayColor flex items-center justify-center">
                <a href="https://www.linkedin.com/in/antoinette-belebele-443943260/">
                  <FaLinkedinIn className="text-greenColor" />
                </a>
              </div>
              <div className="w-10 h-10 rounded-full bg-grayColor flex items-center justify-center">
                <a href="https://github.com/AntoBbk9">
                  <FaGithub className="text-greenColor" />
                </a>
              </div>
            </div>
          </div>
          <div>
            <img
              src="_MG_5503.JPG.jpg"
              alt=""
              className="mt-8 md:mt-0 md:w-[28rem] rounded-lg"
            />
          </div>
        </div>
        <hr className="border-grayColor w-full " />
        <div className="py-6 my-16 w-full md:w-[80%] mx-auto px-4">
          <h1 className="font-sans font-bold text-3xl mb-6">Projets Réalisés</h1>
            <div className="pt-10">
                {projets.slice(0, 1).map((projet: any) => (
                  <Projets
                    key={projet.id}
                    image={projet.image}
                    titre={projet.titre}
                    description={projet.description}
                    annee={projet.annee}
                    role={projet.role}
                    lienDuSite={projet.lienDuSite}
                    demoUrl={projet.demoUrl}
                  />
                ))}
            </div>
              <div className="mt-10 flex justify-end">
                <Link href="/projects" className="underline text-greenColor">Voir plus</Link>
              </div>
        </div>
        <hr className="border-grayColor w-full" />
        <div className="flex flex-col sm:flex-row justify-between my-16 px-6 sm:px-0 sm:w-[80%] mx-auto">
          <h1 className="font-sans font-bold text-3xl">A propos de Moi</h1>
          <div className="pt-6 sm:px-0 sm:w-[40rem]">
            <h2>
              Développeuse full-stack et web designer, j'ai un diplôme en
              pedagogie generale.
            </h2>
            <p className="font-paragraph font-extralight text-xs leading-loose pt-2">
              {" "}
              Je suis développeuse full-stack et web designer, à la recherche
              d'opportunités enrichissantes. Je me concentre sur la création de
              solutions web accessibles et intuitives. Passionnée par la
              résolution de problèmes, j'explore actuellement ReactJS, Node.js et
              Figma. En dehors du code, j’aime explorer la musique, le design et
              découvrir de nouvelles technologies pour enrichir mes compétences.
            </p>
            <div className="pb-8">
              <a href="/about" className="text-greenColor">
                En savoir plus sur moi
              </a>
              <hr className="border-greenColor w-40" />
            </div>
          </div>
        </div>
        <hr className="border-grayColor w-full" />
        <div className="w-full" ref={contactRef}>
          <ContactForm />
        </div>
      </div>
    </div>

  );
}

export default Home;
