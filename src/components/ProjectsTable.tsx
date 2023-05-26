import { deleteProject, Project } from '@/api/project'
import { Trash3 } from 'react-bootstrap-icons'

export type Props = {
  projects: Project[]
  onProjectDelete: (value: boolean) => void
}

export const ProjectsTable = ({ projects, onProjectDelete }: Props) => {
  const handleProjectDelete = async (id: number) => {
    await deleteProject(id)
    onProjectDelete(true)
  }

  if (projects.length == 0) return null

  return (
    <table className={'table'}>
      <thead>
        <tr>
          <th scope="col" colSpan={2}>
            Project
          </th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project) => (
          <tr key={`project_${project.id}`}>
            <td>
              <div style={{ display: 'flex' }}>
                <div
                  style={{
                    backgroundColor: project.color,
                    border: '1pt solid lightgrey',
                    width: '20pt',
                    marginRight: '10pt',
                    borderRadius: '2pt',
                  }}
                >
                  &nbsp;
                </div>
                {project.name}
              </div>
            </td>
            <td>
              <div style={{ float: 'right' }}>
                <button
                  title="Delete project"
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => handleProjectDelete(project.id)}
                >
                  <Trash3 />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
