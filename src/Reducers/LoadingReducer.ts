import { Action } from 'redux'
export interface LoadingReducer {
  [index: string]: boolean | undefined
}

export function reducer(state: LoadingReducer = {}, action: Action) {
  const { type } = action
  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type)

  if (!matches) return state

  const [, requestName, requestState] = matches
  return {
    ...state,
    [requestName]: requestState === 'REQUEST',
  }
}
