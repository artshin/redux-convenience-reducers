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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var rex_tils_1 = require("@martin_hotell/rex-tils");
exports.initialState = {};
var DictionaryActionTypes;
(function (DictionaryActionTypes) {
    DictionaryActionTypes["SET_DICTIONARY_VALUE"] = "SET_DICTIONARY_VALUE";
    DictionaryActionTypes["REMOVE_DICTIONARY_VALUE"] = "REMOVE_DICTIONARY_VALUE";
})(DictionaryActionTypes = exports.DictionaryActionTypes || (exports.DictionaryActionTypes = {}));
exports.DictionaryActions = {
    setDictionaryValue: function (key, value) {
        return rex_tils_1.createAction(DictionaryActionTypes.SET_DICTIONARY_VALUE, { key: key, value: value });
    },
    removeDictionaryValue: function (key) {
        return rex_tils_1.createAction(DictionaryActionTypes.REMOVE_DICTIONARY_VALUE, { key: key });
    },
};
exports.reducer = function (state, action) {
    if (state === void 0) { state = {}; }
    var _a;
    if (!action.payload) {
        return state;
    }
    switch (action.type) {
        case DictionaryActionTypes.SET_DICTIONARY_VALUE:
            return __assign({}, state, (_a = {}, _a[action.payload.key] = action.payload.value, _a));
        case DictionaryActionTypes.REMOVE_DICTIONARY_VALUE:
            var _b = action.payload.key, _1 = state[_b], rest = __rest(state, [typeof _b === "symbol" ? _b : _b + ""]);
            return rest;
        default:
            return state;
    }
};
