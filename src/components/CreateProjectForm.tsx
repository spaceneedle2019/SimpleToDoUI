'use client'
import { Form, Field } from 'react-final-form'
import type { ValidationErrors } from 'final-form'
import { Project } from '@/api/project'
import { object, string, ZodError } from 'zod'

type FormValues = Omit<Project, 'id'>

export const CreateProjectForm = () => {
  const handleFormSubmit = async (values: FormValues) => {
    alert(`name: ${values.name}, color: ${values.color}`)
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
                    <small style={{ color: 'darkred', marginLeft: '4px' }}>
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
                    <small style={{ color: 'darkred', marginLeft: '4px' }}>
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
              <div className="alert alert-error" role="alert">
                {submitError}
              </div>
            )}
          </div>
        </form>
      )}
    ></Form>
  )
}
