import '@testing-library/jest-dom/extend-expect'
import 'jest-canvas-mock'
import fetchMock from 'fetch-mock-jest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ProjectsTable } from '../components/ProjectsTable'
import { mockedProjects } from '../mocks/projects'

describe('ProjectsTable', () => {
  afterEach(() => {
    fetchMock.reset()
  })

  it('deletes a project', async () => {
    fetchMock.delete('/api/projects/1', 204)
    const onProjectDelete = jest.fn()

    render(
      <ProjectsTable
        projects={mockedProjects()}
        onProjectDelete={onProjectDelete}
      />
    )
    expect(screen.getByText('vacation')).toBeVisible()
    await userEvent.click(screen.getAllByTitle('Delete project')[0])

    expect(await fetchMock).toHaveBeenCalledWith('api/projects/1', {
      headers: { 'Content-Type': 'application/json' },
      method: 'DELETE',
    })
    expect(onProjectDelete).toHaveBeenCalled()
  })
})
