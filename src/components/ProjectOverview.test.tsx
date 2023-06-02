import '@testing-library/jest-dom/extend-expect'
import 'jest-canvas-mock'
import fetchMock from 'fetch-mock-jest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ProjectOverview } from '../components/ProjectOverview'
import { mockedProjectResponse, mockedProjects } from '../mocks/projects'
import { ProjectsResponse } from '../api/project'

describe('ProjectOverview', () => {
  const mockedCreatedProjectsResponse = (): ProjectsResponse => ({
    data: [
      ...mockedProjects(),
      { id: 3, name: 'next party', color: '#000000' },
    ],
  })

  const mockedDeletedProjectsResponse = (): ProjectsResponse => ({
    data: [{ id: 2, name: 'shopping list', color: '#000000' }],
  })

  afterEach(() => {
    fetchMock.reset()
  })

  it('creates a project', async () => {
    fetchMock.post('/api/projects', mockedProjectResponse())
    fetchMock.get('/api/projects', mockedCreatedProjectsResponse())

    render(<ProjectOverview initialProjects={mockedProjects()} />)

    // readOnly by default to correctly work with the color picker
    screen.getByPlaceholderText('Color').removeAttribute('readOnly')

    await userEvent.type(screen.getByPlaceholderText('Name'), 'next party')
    await userEvent.type(screen.getByPlaceholderText('Color'), '#000000')
    await userEvent.click(screen.getByText('Create'))

    await waitFor(() => expect(screen.getByText('next party')).toBeVisible())
  })

  it('deletes a project', async () => {
    fetchMock.delete('/api/projects/1', 204)
    fetchMock.get('/api/projects', mockedDeletedProjectsResponse())

    render(<ProjectOverview initialProjects={mockedProjects()} />)
    expect(screen.getByText('vacation')).toBeVisible()

    await userEvent.click(screen.getAllByTitle('Delete project')[0])

    expect(screen.queryByText('vacation')).toBeNull()
  })
})
