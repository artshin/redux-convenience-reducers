import { Action } from 'redux'

export interface ErrorReducer {
  [index: string]: string | undefined
}

interface ErrorPayloadAction extends Action {
  payload: {
    message: string
  }
}

export function reducer(state: ErrorReducer = {}, action: ErrorPayloadAction | any) {
  const { type, payload } = action
  const matches = /(.*)_(REQUEST|FAILURE)/.exec(type)

  if (!matches) return state

  const [, requestName, requestState] = matches
  return {
    ...state,
    [requestName]: requestState === 'FAILURE' ? payload.message : undefined,
  }
}
