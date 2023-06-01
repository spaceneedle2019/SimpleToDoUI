import type { Meta, StoryObj } from '@storybook/react'
import { ProjectOverview } from '../components/ProjectOverview'
import { mockedProjects } from '../mocks/projects'

const meta: Meta<typeof ProjectOverview> = {
  title: 'SimpleToDo/ProjectOverview',
  component: ProjectOverview,
  args: { initialProjects: mockedProjects() },
}

export default meta

export type Story = StoryObj<typeof ProjectOverview>

export const Default: Story = {}

export const WithoutData: Story = {}
WithoutData.args = { initialProjects: [] }
