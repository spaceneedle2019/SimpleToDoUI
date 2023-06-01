import fetchMock from 'fetch-mock-jest'
import {
  mockedErrorResponse,
  mockedProject,
  mockedProjectResponse,
} from '../mocks/projects'
import { createProject, CreateProjectParams, deleteProject } from './project'

describe('createProject', () => {
  afterEach(() => {
    fetchMock.reset()
  })

  const newProject: CreateProjectParams = {
    name: 'vacation',
    color: '#666666',
  }

  it('create a new project', async () => {
    fetchMock.post('/api/projects', mockedProjectResponse())

    const result = await createProject(newProject)

    expect(await fetchMock).toHaveBeenCalledWith('api/projects', {
      body: JSON.stringify({ data: newProject }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    })

    expect(result).toEqual(mockedProject())
  })

  it('throws on name is already taken', async () => {
    fetchMock.post('/api/projects', {
      body: JSON.stringify(mockedErrorResponse({ name: ['is already taken'] })),
      status: 422,
    })

    await expect(createProject(newProject)).rejects.toThrow()
  })

  it('throws on color is invalid', async () => {
    fetchMock.post('/api/projects', {
      body: JSON.stringify(mockedErrorResponse({ color: ['is invalid'] })),
      status: 422,
    })

    await expect(createProject(newProject)).rejects.toThrow()
  })

  it('throws on unexpected error', async () => {
    fetchMock.post('/api/projects', {
      body: JSON.stringify(mockedErrorResponse({ blubber: ['is blubb'] })),
      status: 500,
    })

    await expect(createProject(newProject)).rejects.toThrow()
  })
})

describe('deleteProject', () => {
  beforeEach(() => {
    fetchMock.reset()
  })

  it('deletes a project', async () => {
    fetchMock.delete('/api/projects/666', 204)

    await deleteProject(666)

    expect(await fetchMock).toHaveBeenCalledWith('api/projects/666', {
      headers: { 'Content-Type': 'application/json' },
      method: 'DELETE',
    })
  })

  it('throws on unexpected error', async () => {
    fetchMock.delete('/api/projects/666', 500)

    await expect(deleteProject(666)).rejects.toThrow()
  })
})
