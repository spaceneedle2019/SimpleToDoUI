import { Project } from "@/api/project";

export type Props = {
  projects: Project[]
}

export const ProjectsTable = ({projects}: Props) => {
  return (
    <div className={"container-fluid"}>
      <h3>Projects</h3>
      <button type="button" style={{float: "right"}} className="btn btn-primary btn-sm">New Project</button>
      <table className={"table"}>
        <thead>
        <tr>
          <th scope="col">Number</th>
          <th scope="col">Name</th>
          <th scope="col" colSpan={2}>Color</th>
        </tr>
        </thead>
          <tbody>
          {projects.map((project) => (
            <tr key={`project_${project.id}`}>
              <td>{project.id}</td>
              <td>{project.name}</td>
              <td>{project.color}</td>
              <td>
                <div style={{float: "right"}}>
                  <button type="button" style={{marginRight: "10pt"}} className="btn btn-secondary btn-sm">Edit</button>
                  <button type="button" className="btn btn-danger btn-sm">Delete</button>
                </div>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
    </div>
  )
}