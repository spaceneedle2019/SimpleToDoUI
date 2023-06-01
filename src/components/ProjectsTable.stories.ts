import type { Meta, StoryObj } from '@storybook/react'
import { mockedProjects } from '../mocks/projects'
import { ProjectsTable } from '../components/ProjectsTable'

const meta: Meta<typeof ProjectsTable> = {
  title: 'SimpleToDo/ProjectOverview/ProjectsTable',
  component: ProjectsTable,
  args: { projects: mockedProjects() },
}

export default meta

export type Story = StoryObj<typeof ProjectsTable>

export const Default: Story = {}
