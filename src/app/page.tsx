import { ApiClient } from '@/api/client'
import { Project } from '@/api/project'
import { ProjectsTable } from '@/components/ProjectsTable'

const Page = async () => {
  const client = new ApiClient()
  const projects: Project[] = await client.getProjects()
  return <ProjectsTable projects={projects} />
}

Page.displayName = 'Page'
export default Page
