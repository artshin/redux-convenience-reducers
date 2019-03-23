import { ActionsUnion, createAction } from '@martin_hotell/rex-tils'
import omit from 'lodash/omit'
import { Resource, ResourceById } from '../Types'

export interface ResourceListsReducer {
  [index: string]: ListReducer
}

interface ListReducer {
  byId: {
    [index: string]: Resource
  }
  allIds: string[]
  loading: boolean
  error?: string
}

export enum ResourceListActionTypes {
  GET_RESOURCES_REQUEST = 'GET_RESOURCES_REQUEST',
  GET_RESOURCES_SUCCESS = 'GET_RESOURCES_SUCCESS',
  GET_RESOURCES_FAILURE = 'GET_RESOURCES_FAILURE',

  POST_RESOURCE_REQUEST = 'POST_RESOURCE_REQUEST',
  POST_RESOURCE_SUCCESS = 'POST_RESOURCE_SUCCESS',
  POST_RESOURCE_FAILURE = 'POST_RESOURCE_FAILURE',

  PATCH_RESOURCE_REQUEST = 'PATCH_RESOURCE_REQUEST',
  PATCH_RESOURCE_SUCCESS = 'PATCH_RESOURCE_SUCCESS',
  PATCH_RESOURCE_FAILURE = 'PATCH_RESOURCE_FAILURE',

  DELETE_RESOURCE_REQUEST = 'DELETE_RESOURCE_REQUEST',
  DELETE_RESOURCE_SUCCESS = 'DELETE_RESOURCE_SUCCESS',
  DELETE_RESOURCE_FAILURE = 'DELETE_RESOURCE_FAILURE',
}

export const ResourceListsActions = {
  getResourcesRequest: (resourceName: string) =>
    createAction(ResourceListActionTypes.GET_RESOURCES_REQUEST, { resourceName }),
  getResourcesSuccess: (resourceName: string, resourcesById: ResourceById, allIds: string[]) =>
    createAction(ResourceListActionTypes.GET_RESOURCES_SUCCESS, {
      resourceName,
      resourcesById,
      allIds,
    }),
  getResourcesFailure: (resourceName: string, { message }: { message: string }) =>
    createAction(ResourceListActionTypes.GET_RESOURCES_FAILURE, { message, resourceName }),

  postResourceRequest: (resourceName: string) =>
    createAction(ResourceListActionTypes.POST_RESOURCE_REQUEST, { resourceName }),
  postResourceSuccess: (resourceName: string, resource: Resource) =>
    createAction(ResourceListActionTypes.POST_RESOURCE_SUCCESS, { resourceName, resource }),
  postResourceFailure: (resourceName: string, { message }: { message: string }) =>
    createAction(ResourceListActionTypes.POST_RESOURCE_FAILURE, { resourceName, message }),

  patchResourceRequest: (resourceName: string) =>
    createAction(ResourceListActionTypes.PATCH_RESOURCE_REQUEST, { resourceName }),
  patchResourceSuccess: (resourceName: string, resource: Resource) =>
    createAction(ResourceListActionTypes.PATCH_RESOURCE_SUCCESS, { resourceName, resource }),
  patchResourceFailure: (resourceName: string, { message }: { message: string }) =>
    createAction(ResourceListActionTypes.PATCH_RESOURCE_FAILURE, { resourceName, message }),

  deleteResourceRequest: (resourceName: string) =>
    createAction(ResourceListActionTypes.DELETE_RESOURCE_REQUEST, { resourceName }),
  deleteResourceSuccess: (resourceName: string, resource: Resource) =>
    createAction(ResourceListActionTypes.DELETE_RESOURCE_SUCCESS, { resourceName, resource }),
  deleteResourceFailure: (resourceName: string, { message }: { message: string }) =>
    createAction(ResourceListActionTypes.DELETE_RESOURCE_FAILURE, { resourceName, message }),
}

export const initialState: ResourceListsReducer = {}
export const resourceInitialState: ListReducer = { byId: {}, allIds: [], loading: false }

type Actions = ActionsUnion<typeof ResourceListsActions>

export const reducer = (state: ResourceListsReducer = initialState, action: Actions | any) => {
  if (!action.payload) {
    return state
  }

  const resourceState = state[action.payload.resourceName] || resourceInitialState

  switch (action.type) {
    case ResourceListActionTypes.GET_RESOURCES_REQUEST:
    case ResourceListActionTypes.POST_RESOURCE_REQUEST:
    case ResourceListActionTypes.PATCH_RESOURCE_REQUEST:
    case ResourceListActionTypes.DELETE_RESOURCE_REQUEST: {
      return {
        ...state,
        [action.payload.resourceName]: {
          ...resourceState,
          loading: true,
          error: undefined,
        },
      }
    }
    case ResourceListActionTypes.GET_RESOURCES_SUCCESS:
      return {
        ...state,
        [action.payload.resourceName]: {
          ...resourceState,
          byId: action.payload.resourcesById,
          allIds: action.payload.allIds,
          loading: false,
          error: undefined,
        },
      }
    case ResourceListActionTypes.POST_RESOURCE_SUCCESS: {
      return {
        ...state,
        [action.payload.resourceName]: {
          ...resourceState,
          byId: {
            [action.payload.resource.id]: action.payload.resource,
          },
          allIds: [...resourceState.allIds, action.payload.resource.id],
          loading: false,
          error: undefined,
        },
      }
    }
    case ResourceListActionTypes.PATCH_RESOURCE_SUCCESS: {
      return {
        ...state,
        [action.payload.resourceName]: {
          ...resourceState,
          byId: {
            [action.payload.resource.id]: action.payload.resource,
          },
          loading: false,
          error: undefined,
        },
      }
    }
    case ResourceListActionTypes.DELETE_RESOURCE_SUCCESS: {
      return {
        ...state,
        [action.payload.resourceName]: {
          ...resourceState,
          byId: omit(state.byId, action.payload.resource.id),
          allIds: resourceState.allIds.filter(el => el !== action.payload.resource.id),
          loading: false,
          error: undefined,
        },
      }
    }
    case ResourceListActionTypes.GET_RESOURCES_FAILURE:
    case ResourceListActionTypes.POST_RESOURCE_FAILURE:
    case ResourceListActionTypes.PATCH_RESOURCE_FAILURE:
    case ResourceListActionTypes.DELETE_RESOURCE_FAILURE: {
      return {
        ...state,
        [action.payload.resourceName]: {
          ...resourceState,
          loading: false,
          error: action.payload.message,
        },
      }
    }
    default:
      return state
  }
}
