import { reducer, initialState, DictionaryActions } from '../src/Reducers/DictionaryReducer'

describe('Dictionary Reducer', () => {
  test('is correct', () => {
    expect(reducer(initialState, {})).toEqual(initialState)
  })

  test('SET_DICTIONARY_VALUE works as expected', () => {
    expect(reducer(initialState, DictionaryActions.setDictionaryValue('foo', 'bar'))).toEqual({
      ...initialState,
      foo: 'bar',
    })

    expect(
      reducer(initialState, DictionaryActions.setDictionaryValue('foo', { foo: 'bar' })),
    ).toEqual({
      ...initialState,
      foo: {
        foo: 'bar',
      },
    })
  })

  test('REMOVE_DICTIONARY_VALUE works as expected', () => {
    expect(
      reducer({ ...initialState, foo: 'bar' }, DictionaryActions.removeDictionaryValue('foo')),
    ).toEqual({
      ...initialState,
    })
  })
})
