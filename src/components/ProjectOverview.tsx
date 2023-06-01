'use client'
import { useEffect, useState } from 'react'
import { CreateProjectForm } from '../components/CreateProjectForm'
import { ProjectsTable } from '../components/ProjectsTable'
import { Project } from '../api/project'
import { ApiClient } from '../api/client'

type Props = {
  initialProjects: Project[]
}

export const ProjectOverview = ({ initialProjects }: Props) => {
  const [projects, setProjects] = useState(initialProjects)
  const [projectsChanged, setProjectsChanged] = useState(false)

  const refetchProjects = async () => {
    const client = new ApiClient()
    setProjects(await client.getProjects(true))
  }

  useEffect(() => {
    if (projectsChanged) {
      refetchProjects().then()
      setProjectsChanged(false)
    }
  }, [projectsChanged])

  return (
    <>
      <CreateProjectForm onProjectCreate={setProjectsChanged} />
      <ProjectsTable projects={projects} onProjectDelete={setProjectsChanged} />
    </>
  )
}
