import { notFound } from "next/navigation";
import ProjectDetail from "@/components/ProjectDetail";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/projectsData";

export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = props.params;
  
  return {
    title: "Project",
    description: "Project details",
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}
