import ContactForm from "@/components/contactForm";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

const technologies = [
  "HTML",
  "CSS",
  "JavaScript",
  "NodeJS",
  "ReactJS",
  "NextJS",
  "NodeJS",
  "Figma",
  "Git",
  "GitHub",
  "Bootstrap",
  "TailwindCSS",
];

function About() {
  return (
    <div className="my-0 md:my-16">
      <div className="w-full md:w-[80%] flex flex-col md:flex-row justify-between px-4 mx-auto md:p-0">
        <h1 className="font-sans font-bold text-3xl mb-3 md:mb-0">A propos de Moi</h1>
        <div className="md:w-[45rem]">
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
          <div className="flex gap-4 pt-6">
            <a
              href="/CV_Antho_Belebele.pdf"
              download="Antoinette_Belebele_CV.pdf"
              className="px-4 py-2 bg-greenColor text-black rounded-full"
            >
              Télécharger mon CV
            </a>{" "}
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
      </div>
      <div className="md:w-[80%] mx-auto px-4 md:p-0 my-16">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <img
            src="img2.jpg"
            alt=""
            className="rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-lg"
          />
          <img
            src="img.jpg"
            alt=""
            className="rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-lg"
          />
          <img
            src="img3.jpg"
            alt=""
            className="rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-lg"
          />
        </div>
      </div>
      <div className="md:w-[80%] mx-auto flex flex-col md:flex-row justify-between my-16 px-4 md:p-0">
        <h1 className="font-sans font-bold text-3xl mb-3 md:mb-0">Mes Capacités</h1>
        <div className="md:w-[45rem]">
          <p className="">
            Je suis toujours à la recherche de nouvelles compétences à
            développer pour enrichir mon expertise en développement web et
            design. Passionnée par l'innovation, j'explore continuellement de
            nouvelles technologies et méthodologies afin de proposer des
            solutions modernes, performantes et adaptées aux besoins des
            utilisateurs.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="text-white border border-grayColor px-4 py-2 rounded-full text-center font-semibold"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
      <hr className="border-grayColor w-full " />
      <div className="md:w-[80%] mx-auto flex flex-col md:flex-row justify-between my-16 px-4 md:p-0">
        <h1 className="font-sans font-bold text-3xl mb-3 md:mb-0">Mes experiences</h1>
        <div className="md:w-[45rem]">
          <div>
            <div className="flex justify-between mb-5">
              <h2>Developpeuse Front-End</h2>
              <p>Jan 2025 - Sep 2025</p>
            </div>
            <p className="text-greenColor mb-5">BML Business Center</p>
            <ul className="list-disc mb-3">
              <li>
                Développement et amélioration d'interfaces utilisateur
                interactives et réactives avec ReactJS, HTML, CSS et
                TailwindCSS.
              </li>
              <li>
                Optimisation du code pour améliorer la performance et
                l'accessibilité des applications web.
              </li>
              <li>
                Collaboration avec l'équipe backend pour assurer la bonne
                communication entre le frontend et l'API.
              </li>
              <li>
                Participation aux révisions de code et aux réunions techniques,
                en appliquant les bonnes pratiques du développement web.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="border-grayColor w-full " />
      <div>
      <ContactForm />
      </div>
    </div>
  );
}

export default About;
