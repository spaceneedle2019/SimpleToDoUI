import '@testing-library/jest-dom/extend-expect'
import 'jest-canvas-mock'
import fetchMock from 'fetch-mock-jest'
import { mockedErrorResponse, mockedProjectResponse } from '../mocks/projects'
import { render, screen } from '@testing-library/react'
import { CreateProjectForm, validate } from '../components/CreateProjectForm'
import userEvent from '@testing-library/user-event'
import { CreateProjectParams } from '@/api/project'

describe('CreateProjectForm', () => {
  afterEach(() => {
    fetchMock.reset()
  })

  const newProject: CreateProjectParams = {
    name: 'vacation',
    color: '#000000',
  }

  it('creates a project', async () => {
    fetchMock.post('/api/projects', mockedProjectResponse())
    const onProjectCreate = jest.fn()

    render(<CreateProjectForm onProjectCreate={onProjectCreate} />)
    expect(screen.getByText('Create')).toBeDisabled()

    // readOnly by default to correctly work with the color picker
    screen.getByPlaceholderText('Color').removeAttribute('readOnly')

    await userEvent.type(screen.getByPlaceholderText('Name'), 'vacation')
    await userEvent.type(screen.getByPlaceholderText('Color'), '#000000')
    await userEvent.click(screen.getByText('Create'))

    expect(await fetchMock).toHaveBeenCalledWith('api/projects', {
      body: JSON.stringify({ data: newProject }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    })
    expect(onProjectCreate).toHaveBeenCalled()
  })

  it('does not create the project on error', async () => {
    fetchMock.post('api/projects', {
      body: JSON.stringify(mockedErrorResponse({ name: ['is already taken'] })),
      status: 422,
    })
    const onProjectCreate = jest.fn()

    render(<CreateProjectForm onProjectCreate={onProjectCreate} />)

    // readOnly by default to correctly work with the color picker
    screen.getByPlaceholderText('Color').removeAttribute('readOnly')

    await userEvent.type(screen.getByPlaceholderText('Name'), 'vacation')
    await userEvent.type(screen.getByPlaceholderText('Color'), '#000000')
    await userEvent.click(screen.getByText('Create'))

    expect(onProjectCreate).not.toHaveBeenCalled()
  })
})

describe('validate', () => {
  it('returns validation errors on failed validation', () => {
    expect(validate({ name: '', color: '' })).toEqual({
      name: ['required'],
      color: ['must have 7 characters'],
    })
  })

  it('return empty error object on passed validation', () => {
    expect(validate({ name: 'vacation', color: '#666666' })).toEqual({})
  })
})
