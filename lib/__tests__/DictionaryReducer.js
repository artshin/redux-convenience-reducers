"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var DictionaryReducer_1 = require("../src/Reducers/DictionaryReducer");
describe('Dictionary Reducer', function () {
    test('is correct', function () {
        expect(DictionaryReducer_1.reducer(DictionaryReducer_1.initialState, {})).toEqual(DictionaryReducer_1.initialState);
    });
    test('SET_DICTIONARY_VALUE works as expected', function () {
        expect(DictionaryReducer_1.reducer(DictionaryReducer_1.initialState, DictionaryReducer_1.DictionaryActions.setDictionaryValue('foo', 'bar'))).toEqual(__assign({}, DictionaryReducer_1.initialState, { foo: 'bar' }));
        expect(DictionaryReducer_1.reducer(DictionaryReducer_1.initialState, DictionaryReducer_1.DictionaryActions.setDictionaryValue('foo', { foo: 'bar' }))).toEqual(__assign({}, DictionaryReducer_1.initialState, { foo: {
                foo: 'bar',
            } }));
    });
    test('REMOVE_DICTIONARY_VALUE works as expected', function () {
        expect(DictionaryReducer_1.reducer(__assign({}, DictionaryReducer_1.initialState, { foo: 'bar' }), DictionaryReducer_1.DictionaryActions.removeDictionaryValue('foo'))).toEqual(__assign({}, DictionaryReducer_1.initialState));
    });
});
