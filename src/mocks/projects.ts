import {
  ErrorResponse,
  Project,
  ProjectResponse,
  ProjectsResponse,
} from '../api/project'

export const mockedProjects = (): Project[] => [
  { id: 1, name: 'vacation', color: '#666666' },
  { id: 2, name: 'shopping list', color: '#000000' },
]

export const mockedProjectsResponse = (): ProjectsResponse => ({
  data: mockedProjects(),
})

export const mockedProject = (): Project => ({
  id: 1,
  name: 'vacation',
  color: '#666666',
})

export const mockedProjectResponse = (): ProjectResponse & {
  status: number
} => ({
  data: mockedProject(),
  status: 201,
})

export const mockedErrorResponse = (detail: unknown): ErrorResponse => ({
  errors: [
    {
      status: '422',
      title: 'unprocessable_entity',
      detail,
    },
  ],
})
