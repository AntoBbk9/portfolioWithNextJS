"use client";


import { useEffect, useState } from "react";
import axios from "axios";
import Projets from "@/components/projets";

export default function ProjetDesign() {
  const [projets, setProjets] = useState<any[]>([]);

  useEffect(() => {
    axios.get("/api/projects").then((res) => {
      setProjets(res.data.filter((p: any) => p.type === "design"));
    });
  }, []);

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
