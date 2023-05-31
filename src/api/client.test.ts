import fetchMock from 'fetch-mock-jest'
import { describe, it, expect } from '@jest/globals'
import { ApiClient } from './client'
import { mockedProjects, mockedProjectsResponse } from '../mocks/projects'

describe('ApiClient', () => {
  it('returns projects', async () => {
    fetchMock.get('/api/projects', mockedProjectsResponse())

    const apiClient = new ApiClient()
    expect(await apiClient.getProjects(true)).toEqual(mockedProjects())
  })
})
