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
          <th scope="col">Number</th>
          <th scope="col">Name</th>
          <th scope="col" colSpan={2}>
            Color
          </th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project) => (
          <tr key={`project_${project.id}`}>
            <td>{project.id}</td>
            <td>{project.name}</td>
            <td>{project.color}</td>
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
