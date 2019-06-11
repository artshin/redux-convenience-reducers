import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import keyBy from 'lodash/keyBy'
import { Resource, ResourceById } from '../Types'
import {
  ResourceListsActions,
  resourceInitialState,
  ResourceListsReducer,
} from '../Reducers/ResourceListsReducer'

const anyErrorToString = (error: any): string => {
  if (error instanceof Error) {
    return error.message
  }

  if (typeof error === 'string') {
    return error
  }

  return 'unknown error'
}

type ThunkResult<R, S> = ThunkAction<R, S, undefined, Action>

interface ReduxState {
  resources: ResourceListsReducer
}

export interface DataSourceProtocol<T extends Resource> {
  getResources: (schemaName: string) => Promise<T[]>
  postResource: (schemaName: string, resource: T) => Promise<T>
  patchResource: (schemaName: string, resource: T) => Promise<T>
  deleteResource: (schemaName: string, resource: T) => Promise<void>
}

export const BlankDataSource: DataSourceProtocol<Resource> = {
  getResources: (_: string): Promise<Resource[]> => Promise.resolve([]),
  postResource: async (_: string, resource: Resource): Promise<Resource> =>
    Promise.resolve(resource),
  patchResource: async (_: string, resource: Resource): Promise<Resource> =>
    Promise.resolve(resource),
  deleteResource: async (): Promise<void> => Promise.resolve(),
}

export const getResources = <T extends Resource, S extends ReduxState>(
  resourceName: string,
  dataSource: DataSourceProtocol<T>,
): ThunkResult<Promise<T[]>, S> => async dispatch => {
  dispatch(ResourceListsActions.getResourcesRequest(resourceName))
  try {
    const resources = await dataSource.getResources(resourceName)

    const resourcesById: ResourceById = keyBy(resources, el => el.id)
    const ids = resources.map(el => el.id)

    dispatch(ResourceListsActions.getResourcesSuccess(resourceName, resourcesById, ids))
    return resources
  } catch (error) {
    dispatch(
      ResourceListsActions.getResourcesFailure(resourceName, { message: anyErrorToString(error) }),
    )
    return Promise.reject(error)
  }
}

export const DuplicateResourceError = 'Resource already exists'
export const postResource = <T extends Resource, S extends ReduxState>(
  resourceName: string,
  resource: T,
  dataSource: DataSourceProtocol<T>,
  validationBlock?: (resource: T) => string[],
): ThunkResult<Promise<T>, S> => async (dispatch, getState) => {
  dispatch(ResourceListsActions.postResourceRequest(resourceName))

  const { resources } = getState()
  const { byId: resourcesById } = resources[resourceName] || resourceInitialState

  try {
    if (resourcesById[resource.id]) {
      throw new Error(DuplicateResourceError)
    }

    if (validationBlock) {
      const validationErrors = validationBlock(resource)

      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join(', '))
      }
    }

    const postedResource = await dataSource.postResource(resourceName, resource)

    dispatch(ResourceListsActions.postResourceSuccess(resourceName, postedResource))
    return postedResource
  } catch (error) {
    dispatch(
      ResourceListsActions.postResourceFailure(resourceName, {
        message: anyErrorToString(error),
      }),
    )
    return Promise.reject(error)
  }
}

export const NoResourceToUpdateError = `Can't update non-existent resource`
export const patchResource = <T extends Resource, S extends ReduxState>(
  resourceName: string,
  resource: T,
  dataSource: DataSourceProtocol<T>,
): ThunkResult<Promise<T>, S> => async (dispatch, getState) => {
  dispatch(ResourceListsActions.patchResourceRequest(resourceName))

  const { resources } = getState()
  const { byId: resourcesById } = resources[resourceName] || resourceInitialState

  try {
    if (!resourcesById[resource.id]) {
      throw new Error(NoResourceToUpdateError)
    }

    const patchedResource = await dataSource.patchResource(resourceName, resource)

    dispatch(ResourceListsActions.patchResourceSuccess(resourceName, patchedResource))
    return patchedResource
  } catch (error) {
    dispatch(
      ResourceListsActions.patchResourceFailure(resourceName, {
        message: anyErrorToString(error),
      }),
    )
    return Promise.reject(error)
  }
}

export const NoResourceToDeleteError = `Can't delete non-existent resource`
export const deleteResource = <T extends Resource, S extends ReduxState>(
  resourceName: string,
  resource: T,
  dataSource: DataSourceProtocol<T>,
): ThunkResult<Promise<void>, S> => async (dispatch, getState) => {
  dispatch(ResourceListsActions.deleteResourceRequest(resourceName))

  const { resources } = getState()
  const { byId: resourcesById } = resources[resourceName] || resourceInitialState

  try {
    if (!resourcesById[resource.id]) {
      throw new Error(NoResourceToDeleteError)
    }

    await dataSource.deleteResource(resourceName, resource)

    dispatch(ResourceListsActions.deleteResourceSuccess(resourceName, resource))
    return Promise.resolve()
  } catch (error) {
    dispatch(
      ResourceListsActions.deleteResourceFailure(resourceName, {
        message: anyErrorToString(error),
      }),
    )
    return Promise.reject(error)
  }
}
