import {
  ResourceListsActions,
  ResourceListsReducer,
  ResourceListActionTypes,
  initialState as resourceListReducerInitialState,
  resourceInitialState,
  reducer as resourceListReducer,
} from './Reducers/ResourceListReducer'

import {
  DictionaryActionTypes,
  DictionaryReducer,
  initialState as dictionaryReducerInitialState,
  reducer as dictionaryReducer,
} from './Reducers/DictionaryReducer'
import { LoadingReducer, reducer as loadingReducer } from './Reducers/LoadingReducer'
import { ErrorReducer, reducer as errorReducer } from './Reducers/ErrorReducer'
import { Resource, ResourceById } from './Types'

export {
  DictionaryActionTypes,
  DictionaryReducer,
  dictionaryReducerInitialState,
  dictionaryReducer,
  ResourceListsActions,
  ResourceListsReducer,
  ResourceListActionTypes,
  resourceListReducerInitialState,
  resourceInitialState,
  resourceListReducer,
  LoadingReducer,
  loadingReducer,
  ErrorReducer,
  errorReducer,
  Resource,
  ResourceById,
}
