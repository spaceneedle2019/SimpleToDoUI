import styles from './page.module.css'
import { ApiClient } from "@/api/client";
import { Project } from "@/api/project";
import { ProjectsTable } from "@/components/ProjectsTable";


const Page = async () => {
    const client = new ApiClient();
    const projects: Project[] = await client.getProjects();
    return (
      <>
        <header>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <big>SimpleToDo</big>
                <small><em>An easy-to-use to-do application.</em></small>
            </div>
          </nav>
        </header>
        <main>
          <ProjectsTable projects={projects} />
        </main>
     </>
    );
}

Page.displayName = 'Page';
export default Page;
