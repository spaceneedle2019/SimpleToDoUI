import { UnexpectedResponseError } from '@/api/client'

export type Project = {
  id: number
  name: string
  color: string
}

export type ProjectsResponse = {
  data: Project[]
}

export type ProjectResponse = {
  data: Project
}

export type ErrorResponse = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: [{ status: string; title: string; detail: any }]
}

export class NameAlreadyTakenError extends Error {}

export class ColorInvalidError extends Error {}

export const createProject = async ({
  name,
  color,
}: Omit<Project, 'id'>): Promise<Project> => {
  const response = await fetch('api/projects', {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({ data: { name, color } }),
  })

  if (!response.ok) {
    const { errors }: ErrorResponse = await response.json()

    if (
      errors.some((error) => error.detail?.name?.includes('is already taken'))
    ) {
      throw new NameAlreadyTakenError()
    }

    if (errors.some((error) => error.detail?.color?.includes('is invalid'))) {
      throw new ColorInvalidError()
    }

    throw new UnexpectedResponseError(response)
  }

  const { data }: ProjectResponse = await response.json()
  return data
}
