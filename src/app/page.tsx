import { ApiClient } from '@/api/client'
import { Project } from '@/api/project'
import { ProjectsTable } from '@/components/ProjectsTable'
import { CreateProjectForm } from '@/components/CreateProjectForm'

const Page = async () => {
  const client = new ApiClient()
  const projects: Project[] = await client.getProjects()
  return (
    <div className={'container-fluid'}>
      <h3>Projects</h3>

      <CreateProjectForm />
      <ProjectsTable projects={projects} />
    </div>
  )
}
export default Page
