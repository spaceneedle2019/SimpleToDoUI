import { Project, ProjectsResponse } from '@/api/project'
import { simpleToDoEndpoint } from '@/env'

export class ApiClient {
  async getProjects(): Promise<Project[]> {
    const response = await fetch(`${simpleToDoEndpoint()}/projects`)

    if (!response.ok) {
      handleErrorResponse(response)
    }

    const { data }: ProjectsResponse = await response.json()
    return data
  }
}

export class NotFoundError extends Error {
  message = 'not found'
}

export class UnexpectedResponseError extends Error {
  public response: Response

  constructor(response: Response) {
    super(
      `Unexpected error with status ${response.status} from ${response.url}`
    )
    this.response = response
  }
}

function handleErrorResponse(response: Response) {
  if (response.status == 404) {
    throw new NotFoundError()
  }

  throw new UnexpectedResponseError(response)
}
