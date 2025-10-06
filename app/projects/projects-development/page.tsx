import axios from "axios";
import Projets from "@/components/projets";

async function getProjects() {
  const res = await axios.get("http://localhost:3000/api/projects");
  const data = res.data;
  return data.filter((p: any) => p.type === "developpement");
}

export default async function ProjetDeveloppement() {
  const projets = await getProjects();

  return (
    <div className="pt-10 space-y-8">
      {projets.map((projet: any) => (
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
  );
}
