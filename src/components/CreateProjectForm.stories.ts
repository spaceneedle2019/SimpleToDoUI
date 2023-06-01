import type { Meta, StoryObj } from '@storybook/react'
import { CreateProjectForm } from '../components/CreateProjectForm'

const meta: Meta<typeof CreateProjectForm> = {
  title: 'SimpleToDo/ProjectOverview/CreateProjectForm',
  component: CreateProjectForm,
}

export default meta

export type Story = StoryObj<typeof CreateProjectForm>

export const Default: Story = {}
