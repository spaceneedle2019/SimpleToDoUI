'use client'
import { Form, Field } from 'react-final-form'
import type { ValidationErrors } from 'final-form'
import {
  ColorInvalidError,
  createProject,
  CreateProjectParams,
  NameAlreadyTakenError,
} from '../api/project'
import { object, string, ZodError } from 'zod'
import { UnexpectedResponseError } from '../api/client'
import { SketchPicker } from 'react-color'
import { useState } from 'react'

const projectObject = object({
  name: string({ required_error: 'required' }).min(1, 'required'),
  color: string({ required_error: 'required' }).length(
    7,
    'must have 7 characters'
  ),
})

export const validate = (values: CreateProjectParams): ValidationErrors => {
  try {
    projectObject.parse(values)
  } catch (err) {
    return (err as ZodError).formErrors.fieldErrors
  }
  return {}
}

type Props = {
  onProjectCreate: (value: boolean) => void
}

export const CreateProjectForm = ({ onProjectCreate }: Props) => {
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [color, setColor] = useState('#00000')

  const handleFormSubmit = async (values: CreateProjectParams) => {
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
            <Field name="color" initialValue={color}>
              {({ input, meta }) => (
                <div>
                  {showColorPicker ? (
                    <div
                      style={{
                        position: 'absolute',
                        zIndex: '100',
                        top: '140pt',
                      }}
                    >
                      <div
                        style={{
                          position: 'fixed',
                          inset: 0,
                        }}
                        onClick={() => setShowColorPicker(false)}
                      />
                      <SketchPicker
                        color={color}
                        onChange={(e) => setColor(e.hex)}
                      />
                    </div>
                  ) : null}
                  <input
                    className="form-control"
                    type="text"
                    {...input}
                    placeholder="Color"
                    style={{
                      width: '150pt',
                      marginRight: '10pt',
                    }}
                    readOnly
                    value={color}
                    onClick={() => setShowColorPicker(!showColorPicker)}
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
              Create
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
