import { ApiClient } from '@/api/client'
import { Project } from '@/api/project'
import { ProjectOverview } from '@/components/ProjectOverview'

const Page = async () => {
  const client = new ApiClient()
  const initialProjects: Project[] = await client.getProjects()
  return (
    <div className={'container-fluid'}>
      <h3>Projects</h3>
      <ProjectOverview initialProjects={initialProjects} />
    </div>
  )
}
export default Page
