import { Project } from '@/api/project'

export type Props = {
  projects: Project[]
}

export const ProjectsTable = ({ projects }: Props) => {
  return projects.length === 0 ? (
    <div className="alert alert-info" style={{ padding: '8px' }} role="alert">
      No projects found.
    </div>
  ) : (
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
                  type="button"
                  style={{ marginRight: '10pt' }}
                  className="btn btn-secondary btn-sm"
                >
                  Edit
                </button>
                <button type="button" className="btn btn-danger btn-sm">
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
