'use client'
import { Form, Field } from 'react-final-form'
import type { ValidationErrors } from 'final-form'
import {
  ColorInvalidError,
  createProject,
  NameAlreadyTakenError,
  Project,
} from '@/api/project'
import { object, string, ZodError } from 'zod'
import { UnexpectedResponseError } from '@/api/client'

type FormValues = Omit<Project, 'id'>

type Props = {
  onProjectCreate: (value: boolean) => void
}

export const CreateProjectForm = ({ onProjectCreate }: Props) => {
  const handleFormSubmit = async (values: FormValues) => {
    const { name, color } = values
    try {
      await createProject({ name, color })
      onProjectCreate(true)
    } catch (error) {
      if ((error as Error).constructor === NameAlreadyTakenError) {
        return { ['FINAL_FORM/form-error']: 'Name is already taken.' }
      }
      if ((error as Error).constructor === ColorInvalidError) {
        return { ['FINAL_FORM/form-error']: 'Color is invalid.' }
      }
      if ((error as Error).constructor === UnexpectedResponseError) {
        return { ['FINAL_FORM/form-error']: 'Unknown error occurs.' }
      }
    }
  }

  const projectObject = object({
    name: string({ required_error: 'required' }).min(1, 'required'),
    color: string({ required_error: 'required' }).length(
      7,
      'must have 7 characters'
    ),
  })

  const validate = (values: FormValues): ValidationErrors => {
    try {
      projectObject.parse(values)
    } catch (err) {
      return (err as ZodError).formErrors.fieldErrors
    }
    return {}
  }

  return (
    <Form
      onSubmit={handleFormSubmit}
      validate={validate}
      render={({ handleSubmit, submitError, dirty, hasValidationErrors }) => (
        <form onSubmit={handleSubmit}>
          <div className="mb-3" style={{ display: 'flex' }}>
            <Field name="name">
              {({ input, meta }) => (
                <div>
                  <input
                    className="form-control"
                    type="text"
                    {...input}
                    placeholder="Name"
                    style={{ width: '150pt', marginRight: '10pt' }}
                  />
                  {meta.touched && meta.error && (
                    <small
                      className="text-danger"
                      style={{ marginLeft: '4px' }}
                    >
                      {meta.error}
                    </small>
                  )}
                </div>
              )}
            </Field>
            <Field name="color">
              {({ input, meta }) => (
                <div>
                  <input
                    className="form-control"
                    type="text"
                    {...input}
                    placeholder="Color"
                    style={{
                      width: '150pt',
                      marginRight: '10pt',
                    }}
                  />
                  {meta.touched && meta.error && (
                    <small
                      className="text-danger"
                      style={{ marginLeft: '4px' }}
                    >
                      {meta.error}
                    </small>
                  )}
                </div>
              )}
            </Field>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={hasValidationErrors || !dirty}
              style={{ alignSelf: 'flex-start' }}
            >
              Create Project
            </button>
            {submitError && (
              <small
                className="alert alert-danger"
                style={{
                  alignItems: 'flex-start',
                  marginLeft: '10pt',
                  padding: '8px',
                }}
                role="alert"
              >
                {submitError}
              </small>
            )}
          </div>
        </form>
      )}
    ></Form>
  )
}
