import { ActionsUnion, createAction } from '@martin_hotell/rex-tils'

type DictionaryValue = string | number | boolean | undefined | null | object
type DictionaryValueTypes = DictionaryValue | DictionaryValue[]

export interface DictionaryReducer {
  [index: string]: DictionaryValueTypes
}

export const initialState: DictionaryReducer = {}

export enum DictionaryActionTypes {
  SET_DICTIONARY_VALUE = 'SET_DICTIONARY_VALUE',
  REMOVE_DICTIONARY_VALUE = 'REMOVE_DICTIONARY_VALUE',
}

export const DictionaryActions = {
  setDictionaryValue: (key: string, value: DictionaryValueTypes) =>
    createAction(DictionaryActionTypes.SET_DICTIONARY_VALUE, { key, value }),
  removeDictionaryValue: (key: string) =>
    createAction(DictionaryActionTypes.REMOVE_DICTIONARY_VALUE, { key }),
}

type Actions = ActionsUnion<typeof DictionaryActions>

export const reducer = (state: DictionaryReducer = {}, action: Actions | any) => {
  if (!action.payload) {
    return state
  }

  switch (action.type) {
    case DictionaryActionTypes.SET_DICTIONARY_VALUE:
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      }
    case DictionaryActionTypes.REMOVE_DICTIONARY_VALUE:
      const { [action.payload.key]: _, ...rest } = state
      return rest
    default:
      return state
  }
}
