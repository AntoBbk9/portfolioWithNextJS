import { NextResponse } from "next/server";
import { projects } from "@/data/projects";

// Cette fonction sera exécutée quand on fait une requête GET à /api/projects
export async function GET() {
  return NextResponse.json(projects);
}