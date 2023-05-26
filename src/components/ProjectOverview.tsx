'use client'
import { CreateProjectForm } from '@/components/CreateProjectForm'
import { ProjectsTable } from '@/components/ProjectsTable'
import { Project } from '@/api/project'
import { useEffect, useState } from 'react'
import { ApiClient } from '@/api/client'

type Props = {
  initialProjects: Project[]
}

export const ProjectOverview = ({ initialProjects }: Props) => {
  const [projects, setProjects] = useState(initialProjects)
  const [projectCreated, setProjectCreated] = useState(false)

  const refetchProjects = async () => {
    const client = new ApiClient()
    setProjects(await client.getProjects(true))
  }

  useEffect(() => {
    if (projectCreated) {
      refetchProjects()
      setProjectCreated(false)
    }
  }, [projectCreated])

  return (
    <>
      <CreateProjectForm onProjectCreate={setProjectCreated} />
      <ProjectsTable projects={projects} />
    </>
  )
}