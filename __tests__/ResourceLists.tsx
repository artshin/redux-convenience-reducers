import createMockStore from 'redux-mock-store'
import {
  reducer,
  initialState,
  ResourceListsActions,
  ResourceListActionTypes,
  ResourceListsReducer,
} from '../src/Reducers/ResourceListsReducer'
import keyBy from 'lodash/keyBy'
import { Resource } from '../src/Types'
import {
  getResources,
  postResource,
  patchResource,
  deleteResource,
  DuplicateResourceError,
  NoResourceToUpdateError,
  NoResourceToDeleteError,
  DataSourceProtocol,
} from '../src/Actions/ResourceListsActions'
import thunk, { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'

class Bill extends Resource {
  public static schemaName: string = 'Bill'
  public title: string

  constructor(title: string) {
    super()
    this.title = title
  }
}

// tslint:disable-next-line max-classes-per-file
class Contact extends Resource {
  public static schemaName: string = 'Contact'
  public name: string

  constructor(name: string) {
    super()
    this.name = name
  }
}

interface ReduxState {
  resources: ResourceListsReducer
}

// tslint:disable-next-line max-classes-per-file
class DataSource implements DataSourceProtocol<Resource> {
  public getResources = (_: string): Resource[] => {
    return []
  }

  public postResource = (_: string, resource: Resource): Promise<Resource> => {
    return Promise.resolve(resource)
  }

  public patchResource = (_: string, resource: Resource): Promise<Resource> => {
    return Promise.resolve(resource)
  }

  public deleteResource = (): Promise<void> => {
    return Promise.resolve()
  }
}

export type ReduxDispatch = ThunkDispatch<ReduxState, undefined, Action>

export const mockStore = createMockStore<ReduxState, ReduxDispatch>([thunk])
export const emptyReduxStateMock: ReduxState = {
  resources: {},
}

const loadingNoError = {
  loading: true,
  error: undefined,
}

const notLoadingError = {
  loading: false,
  error: 'error message',
}

const notLoadingNoError = {
  loading: false,
  error: undefined,
}

describe('Resources List Reducer', () => {
  test('is correct', () => {
    expect(reducer(initialState, {})).toEqual(initialState)
  })

  test('GET_RESOURCES_SUCCESS works as expected', () => {
    const resource1 = new Bill('')
    const resource2 = new Bill('')
    const resource3 = new Contact('Peter Parker')
    const resource4 = new Contact('Miles Morales')
    const billResourcesById = {
      [resource1.id]: resource1,
      [resource2.id]: resource2,
    }
    const contactResourcesById = {
      [resource3.id]: resource3,
      [resource4.id]: resource4,
    }
    const allBillIds = [resource1.id, resource2.id]
    const allContactIds = [resource3.id, resource4.id]

    let state = reducer(initialState, {})

    state = reducer(
      state,
      ResourceListsActions.getResourcesSuccess(Bill.schemaName, billResourcesById, allBillIds),
    )

    state = reducer(
      state,
      ResourceListsActions.getResourcesSuccess(
        Contact.schemaName,
        contactResourcesById,
        allContactIds,
      ),
    )

    expect(state).toEqual({
      ...initialState,
      [Bill.schemaName]: {
        byId: billResourcesById,
        allIds: allBillIds,
        ...notLoadingNoError,
      },

      [Contact.schemaName]: {
        byId: contactResourcesById,
        allIds: allContactIds,
        ...notLoadingNoError,
      },
    })
  })

  test('POST_RESOURCE_SUCCESS works as expected', () => {
    const resourceToPost = new Bill('')

    expect(
      reducer(
        initialState,
        ResourceListsActions.postResourceSuccess(Bill.schemaName, resourceToPost),
      ),
    ).toEqual({
      ...initialState,
      [Bill.name]: {
        byId: { [resourceToPost.id]: resourceToPost },
        allIds: [resourceToPost.id],
        ...notLoadingNoError,
      },
    })
  })

  test('PATCH_RESOURCE_SUCCESS works as expected', () => {
    const existingResource = new Bill('original title')
    const patchedResource = existingResource
    patchedResource.title = 'new title'

    expect(
      reducer(
        {
          ...initialState,
          [Bill.schemaName]: {
            byId: { [existingResource.id]: existingResource },
            allIds: [existingResource.id],
            ...notLoadingNoError,
          },
        },
        ResourceListsActions.patchResourceSuccess(Bill.schemaName, patchedResource),
      ),
    ).toEqual({
      ...initialState,
      [Bill.schemaName]: {
        byId: { [existingResource.id]: patchedResource },
        allIds: [existingResource.id],
        ...notLoadingNoError,
      },
    })
  })

  test('DELETE_RESOURCE_SUCCESS works as expected', () => {
    const existingResource = new Bill('resource title')

    expect(
      reducer(
        {
          ...initialState,
          [Bill.schemaName]: {
            byId: { [existingResource.id]: existingResource },
            allIds: [existingResource.id],
            ...notLoadingNoError,
          },
        },
        ResourceListsActions.deleteResourceSuccess(Bill.schemaName, existingResource),
      ),
    ).toEqual({
      ...initialState,
      [Bill.schemaName]: {
        byId: {},
        allIds: [],
        ...notLoadingNoError,
      },
    })
  })
})

describe('Resources meta properties', () => {
  const reducerState = {
    ...initialState,
    [Bill.schemaName]: {
      byId: {},
      allIds: [],
      loading: false,
      error: undefined,
    },
  }
  const errorMessage = {
    message: notLoadingError.error,
  }

  test('GET_RESOURCES_REQUEST properly updates reducer', async () => {
    expect(
      reducer(reducerState, ResourceListsActions.getResourcesRequest(Bill.schemaName)),
    ).toEqual({ ...reducerState, [Bill.schemaName]: { byId: {}, allIds: [], ...loadingNoError } })
  })
  test('POST_RESOURCES_REQUEST properly updates reducer', async () => {
    expect(
      reducer(reducerState, ResourceListsActions.postResourceRequest(Bill.schemaName)),
    ).toEqual({ ...reducerState, [Bill.schemaName]: { byId: {}, allIds: [], ...loadingNoError } })
  })
  test('PATCH_RESOURCES_REQUEST properly updates reducer', async () => {
    expect(
      reducer(reducerState, ResourceListsActions.patchResourceRequest(Bill.schemaName)),
    ).toEqual({ ...reducerState, [Bill.schemaName]: { byId: {}, allIds: [], ...loadingNoError } })
  })
  test('DELETE_RESOURCES_REQUEST properly updates reducer', async () => {
    expect(
      reducer(reducerState, ResourceListsActions.deleteResourceRequest(Bill.schemaName)),
    ).toEqual({ ...reducerState, [Bill.schemaName]: { byId: {}, allIds: [], ...loadingNoError } })
  })

  test('GET_RESOURCES_FAILURE properly updates reducer', async () => {
    expect(
      reducer(
        reducerState,
        ResourceListsActions.getResourcesFailure(Bill.schemaName, errorMessage),
      ),
    ).toEqual({ ...reducerState, [Bill.schemaName]: { byId: {}, allIds: [], ...notLoadingError } })
  })
  test('POST_RESOURCES_FAILURE properly updates reducer', async () => {
    expect(
      reducer(
        reducerState,
        ResourceListsActions.postResourceFailure(Bill.schemaName, errorMessage),
      ),
    ).toEqual({ ...reducerState, [Bill.schemaName]: { byId: {}, allIds: [], ...notLoadingError } })
  })
  test('PATCH_RESOURCES_FAILURE properly updates reducer', async () => {
    expect(
      reducer(
        reducerState,
        ResourceListsActions.patchResourceFailure(Bill.schemaName, errorMessage),
      ),
    ).toEqual({ ...reducerState, [Bill.schemaName]: { byId: {}, allIds: [], ...notLoadingError } })
  })
  test('DELETE_RESOURCES_FAILURE properly updates reducer', async () => {
    expect(
      reducer(
        reducerState,
        ResourceListsActions.deleteResourceFailure(Bill.schemaName, errorMessage),
      ),
    ).toEqual({ ...reducerState, [Bill.schemaName]: { byId: {}, allIds: [], ...notLoadingError } })
  })
})

describe('Resources.getResources action', () => {
  let store = mockStore(emptyReduxStateMock)
  const dataSource = new DataSource()

  beforeEach(() => {
    dataSource.getResources = jest.fn(_ => [])
    store = mockStore(emptyReduxStateMock)
  })

  test('getResources returns resources in the order received from DataSource', async () => {
    const mockData: Bill[] = [new Bill('resource1'), new Bill('resource')]
    dataSource.getResources = jest.fn(() => mockData)

    await store.dispatch(getResources(Bill.schemaName, dataSource))
    const actions = store.getActions()

    expect(actions[0]).toStrictEqual({
      type: ResourceListActionTypes.GET_RESOURCES_REQUEST,
      payload: {
        resourceName: Bill.schemaName,
      },
    })

    const expectedResourcesById = keyBy(mockData, el => el.id)
    const expectedAllIds = mockData.map(el => el.id)

    expect(actions[1]).toStrictEqual({
      type: ResourceListActionTypes.GET_RESOURCES_SUCCESS,
      payload: {
        resourcesById: expectedResourcesById,
        allIds: expectedAllIds,
        resourceName: Bill.schemaName,
      },
    })

    expect(actions.length === 2)
  })

  test('getResources catches any error and handles it', async () => {
    const mockError = 'error'
    dataSource.getResources = jest.fn(() => {
      throw new Error(mockError)
    })

    await store.dispatch(getResources(Bill.schemaName, dataSource))
    const actions = store.getActions()

    expect(actions[0]).toEqual({
      type: ResourceListActionTypes.GET_RESOURCES_REQUEST,
      payload: {
        resourceName: Bill.schemaName,
      },
    })

    expect(actions[1]).toEqual({
      type: ResourceListActionTypes.GET_RESOURCES_FAILURE,
      payload: {
        message: mockError,
        resourceName: Bill.schemaName,
      },
    })

    expect(actions.length === 2)
  })
})

describe('Resources.postResource action', () => {
  let store = mockStore(emptyReduxStateMock)
  const dataSource = new DataSource()

  beforeAll(() => {
    dataSource.postResource = jest.fn((_, resource) => Promise.resolve(resource))
    store = mockStore(emptyReduxStateMock)
  })

  test('postResource creates new resource passing validation tests', async () => {
    const newResource = new Bill('resource1')

    await store.dispatch(postResource(Bill.schemaName, newResource, dataSource, _ => []))
    const actions = store.getActions()

    expect(actions[0]).toEqual({
      type: ResourceListActionTypes.POST_RESOURCE_REQUEST,
      payload: {
        resourceName: Bill.schemaName,
      },
    })

    expect(actions[1]).toEqual({
      type: ResourceListActionTypes.POST_RESOURCE_SUCCESS,
      payload: {
        resource: newResource,
        resourceName: Bill.schemaName,
      },
    })

    expect(actions.length === 2)
  })

  test('postResource validation tests', async () => {
    const resource1 = new Bill('resource1')
    const resource2 = resource1
    const EmptyTitleValidationErrror = 'Bill title can\t be empty'
    const LongTitleValidationErrror = 'Bill title length is restricted to 256 characters'

    store = mockStore({
      ...emptyReduxStateMock,
      resources: {
        [Bill.schemaName]: {
          byId: {
            [resource1.id]: resource1,
          },
          allIds: [resource1.id],
          ...notLoadingNoError,
        },
      },
    })

    await store.dispatch(postResource(Bill.schemaName, resource2, dataSource))
    let actions = store.getActions()
    store.clearActions()

    expect(actions[0]).toEqual({
      type: ResourceListActionTypes.POST_RESOURCE_REQUEST,
      payload: {
        resourceName: Bill.schemaName,
      },
    })

    expect(actions[1]).toEqual({
      type: ResourceListActionTypes.POST_RESOURCE_FAILURE,
      payload: {
        message: DuplicateResourceError,
        resourceName: Bill.schemaName,
      },
    })

    await store.dispatch(
      postResource(Bill.schemaName, new Bill(''), dataSource, resource =>
        (resource as Bill).title.length === 0 ? [EmptyTitleValidationErrror] : [],
      ),
    )
    actions = store.getActions()
    store.clearActions()

    expect(actions[0]).toEqual({
      type: ResourceListActionTypes.POST_RESOURCE_REQUEST,
      payload: {
        resourceName: Bill.schemaName,
      },
    })

    expect(actions[1]).toEqual({
      type: ResourceListActionTypes.POST_RESOURCE_FAILURE,
      payload: {
        message: EmptyTitleValidationErrror,
        resourceName: Bill.schemaName,
      },
    })

    const longName = '0123'.repeat(65) // 256 character name
    await store.dispatch(
      postResource(Bill.schemaName, new Bill(longName), dataSource, resource =>
        (resource as Bill).title.length > 256 ? [LongTitleValidationErrror] : [],
      ),
    )
    actions = store.getActions()
    store.clearActions()

    expect(actions[0]).toEqual({
      type: ResourceListActionTypes.POST_RESOURCE_REQUEST,
      payload: {
        resourceName: Bill.schemaName,
      },
    })

    expect(actions[1]).toEqual({
      type: ResourceListActionTypes.POST_RESOURCE_FAILURE,
      payload: {
        message: LongTitleValidationErrror,
        resourceName: Bill.schemaName,
      },
    })
  })

  test('postResources catches any error and handles it', async () => {
    const mockError = 'error'
    dataSource.postResource = jest.fn(() => {
      throw new Error(mockError)
    })

    await store.dispatch(postResource(Bill.schemaName, new Bill('abcd'), dataSource))
    const actions = store.getActions()

    expect(actions[0]).toEqual({
      type: ResourceListActionTypes.POST_RESOURCE_REQUEST,
      payload: {
        resourceName: Bill.schemaName,
      },
    })

    expect(actions[1]).toEqual({
      type: ResourceListActionTypes.POST_RESOURCE_FAILURE,
      payload: {
        message: mockError,
        resourceName: Bill.schemaName,
      },
    })

    expect(actions.length === 2)
  })
})

describe('Resource.patchResource action', () => {
  let store = mockStore(emptyReduxStateMock)
  const dataSource = new DataSource()

  beforeEach(() => {
    dataSource.patchResource = jest.fn((_, resource) => Promise.resolve(resource))
    store = mockStore(emptyReduxStateMock)
  })

  test('patchResource updates an existing resource passing validation tests', async () => {
    const resourceToUpdate = new Bill('original title')

    store = mockStore({
      ...emptyReduxStateMock,
      resources: {
        [Bill.schemaName]: {
          byId: {
            [resourceToUpdate.id]: resourceToUpdate,
          },
          allIds: [resourceToUpdate.id],
          ...notLoadingNoError,
        },
      },
    })

    resourceToUpdate.title = 'new title'

    await store.dispatch(patchResource(Bill.schemaName, resourceToUpdate, dataSource))
    const actions = store.getActions()

    expect(actions[0]).toEqual({
      type: ResourceListActionTypes.PATCH_RESOURCE_REQUEST,
      payload: {
        resourceName: Bill.schemaName,
      },
    })

    expect(actions[1]).toEqual({
      type: ResourceListActionTypes.PATCH_RESOURCE_SUCCESS,
      payload: {
        resource: resourceToUpdate,
        resourceName: Bill.schemaName,
      },
    })

    expect(actions.length === 2)
  })

  test('patchResource fails with error if resource to update doesnt exist', async () => {
    const resourceToUpdate = new Bill('original title')
    resourceToUpdate.title = 'new title'

    await store.dispatch(patchResource(Bill.schemaName, resourceToUpdate, dataSource))
    const actions = store.getActions()

    expect(actions[0]).toEqual({
      type: ResourceListActionTypes.PATCH_RESOURCE_REQUEST,
      payload: {
        resourceName: Bill.schemaName,
      },
    })

    expect(actions[1]).toEqual({
      type: ResourceListActionTypes.PATCH_RESOURCE_FAILURE,
      payload: {
        message: NoResourceToUpdateError,
        resourceName: Bill.schemaName,
      },
    })

    expect(actions.length === 2)
  })

  test('patchResource catches any error and handles it', async () => {
    const mockError = 'error'
    const resourceToUpdate = new Bill('original title')
    dataSource.patchResource = jest.fn(() => {
      throw new Error(mockError)
    })

    store = mockStore({
      ...emptyReduxStateMock,
      resources: {
        [Bill.schemaName]: {
          byId: {
            [resourceToUpdate.id]: resourceToUpdate,
          },
          allIds: [resourceToUpdate.id],
          ...notLoadingNoError,
        },
      },
    })

    resourceToUpdate.title = 'new title'

    await store.dispatch(patchResource(Bill.schemaName, resourceToUpdate, dataSource))
    const actions = store.getActions()

    expect(actions[0]).toEqual({
      type: ResourceListActionTypes.PATCH_RESOURCE_REQUEST,
      payload: {
        resourceName: Bill.schemaName,
      },
    })

    expect(actions[1]).toEqual({
      type: ResourceListActionTypes.PATCH_RESOURCE_FAILURE,
      payload: {
        message: mockError,
        resourceName: Bill.schemaName,
      },
    })

    expect(actions.length === 2)
  })
})

describe('Resources.deleteResource action', () => {
  let store = mockStore(emptyReduxStateMock)
  const dataSource = new DataSource()

  beforeEach(() => {
    dataSource.deleteResource = jest.fn(() => Promise.resolve())
    store = mockStore(emptyReduxStateMock)
  })

  test('deleteResource deletes an existing resource passing validation tests', async () => {
    const resourceToDelete = new Bill('original title')

    store = mockStore({
      ...emptyReduxStateMock,
      resources: {
        [Bill.schemaName]: {
          byId: {
            [resourceToDelete.id]: resourceToDelete,
          },
          allIds: [resourceToDelete.id],
          ...notLoadingNoError,
        },
      },
    })

    await store.dispatch(deleteResource(Bill.schemaName, resourceToDelete, dataSource))
    const actions = store.getActions()

    expect(actions[0]).toEqual({
      type: ResourceListActionTypes.DELETE_RESOURCE_REQUEST,
      payload: {
        resourceName: Bill.schemaName,
      },
    })

    expect(actions[1]).toEqual({
      type: ResourceListActionTypes.DELETE_RESOURCE_SUCCESS,
      payload: {
        resource: resourceToDelete,
        resourceName: Bill.schemaName,
      },
    })

    expect(actions.length === 2)
  })

  test('deleteResource fails with error if resource to delete doesnt exist', async () => {
    const resourceToDelete = new Bill('resource title')

    await store.dispatch(deleteResource(Bill.schemaName, resourceToDelete, dataSource))
    const actions = store.getActions()

    expect(actions[0]).toEqual({
      type: ResourceListActionTypes.DELETE_RESOURCE_REQUEST,
      payload: {
        resourceName: Bill.schemaName,
      },
    })

    expect(actions[1]).toEqual({
      type: ResourceListActionTypes.DELETE_RESOURCE_FAILURE,
      payload: {
        message: NoResourceToDeleteError,
        resourceName: Bill.schemaName,
      },
    })

    expect(actions.length === 2)
  })

  test('deleteResource catches any error and handles it', async () => {
    const mockError = 'error'
    const resourceToDelete = new Bill('original title')
    dataSource.deleteResource = jest.fn(() => {
      throw new Error(mockError)
    })

    store = mockStore({
      ...emptyReduxStateMock,
      resources: {
        [Bill.schemaName]: {
          byId: {
            [resourceToDelete.id]: resourceToDelete,
          },
          allIds: [resourceToDelete.id],
          loading: false,
          error: undefined,
        },
      },
    })

    await store.dispatch(deleteResource(Bill.schemaName, resourceToDelete, dataSource))
    const actions = store.getActions()

    expect(actions[0]).toEqual({
      type: ResourceListActionTypes.DELETE_RESOURCE_REQUEST,
      payload: {
        resourceName: Bill.schemaName,
      },
    })

    expect(actions[1]).toEqual({
      type: ResourceListActionTypes.DELETE_RESOURCE_FAILURE,
      payload: {
        message: mockError,
        resourceName: Bill.schemaName,
      },
    })

    expect(actions.length === 2)
  })
})
