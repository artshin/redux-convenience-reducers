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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var rex_tils_1 = require("@martin_hotell/rex-tils");
var omit_1 = __importDefault(require("lodash/omit"));
var ResourceListActionTypes;
(function (ResourceListActionTypes) {
    ResourceListActionTypes["GET_RESOURCES_REQUEST"] = "GET_RESOURCES_REQUEST";
    ResourceListActionTypes["GET_RESOURCES_SUCCESS"] = "GET_RESOURCES_SUCCESS";
    ResourceListActionTypes["GET_RESOURCES_FAILURE"] = "GET_RESOURCES_FAILURE";
    ResourceListActionTypes["POST_RESOURCE_REQUEST"] = "POST_RESOURCE_REQUEST";
    ResourceListActionTypes["POST_RESOURCE_SUCCESS"] = "POST_RESOURCE_SUCCESS";
    ResourceListActionTypes["POST_RESOURCE_FAILURE"] = "POST_RESOURCE_FAILURE";
    ResourceListActionTypes["PATCH_RESOURCE_REQUEST"] = "PATCH_RESOURCE_REQUEST";
    ResourceListActionTypes["PATCH_RESOURCE_SUCCESS"] = "PATCH_RESOURCE_SUCCESS";
    ResourceListActionTypes["PATCH_RESOURCE_FAILURE"] = "PATCH_RESOURCE_FAILURE";
    ResourceListActionTypes["DELETE_RESOURCE_REQUEST"] = "DELETE_RESOURCE_REQUEST";
    ResourceListActionTypes["DELETE_RESOURCE_SUCCESS"] = "DELETE_RESOURCE_SUCCESS";
    ResourceListActionTypes["DELETE_RESOURCE_FAILURE"] = "DELETE_RESOURCE_FAILURE";
})(ResourceListActionTypes = exports.ResourceListActionTypes || (exports.ResourceListActionTypes = {}));
exports.ResourceListsActions = {
    getResourcesRequest: function (resourceName) {
        return rex_tils_1.createAction(ResourceListActionTypes.GET_RESOURCES_REQUEST, { resourceName: resourceName });
    },
    getResourcesSuccess: function (resourceName, resourcesById, allIds) {
        return rex_tils_1.createAction(ResourceListActionTypes.GET_RESOURCES_SUCCESS, {
            resourceName: resourceName,
            resourcesById: resourcesById,
            allIds: allIds,
        });
    },
    getResourcesFailure: function (resourceName, _a) {
        var message = _a.message;
        return rex_tils_1.createAction(ResourceListActionTypes.GET_RESOURCES_FAILURE, { message: message, resourceName: resourceName });
    },
    postResourceRequest: function (resourceName) {
        return rex_tils_1.createAction(ResourceListActionTypes.POST_RESOURCE_REQUEST, { resourceName: resourceName });
    },
    postResourceSuccess: function (resourceName, resource) {
        return rex_tils_1.createAction(ResourceListActionTypes.POST_RESOURCE_SUCCESS, { resourceName: resourceName, resource: resource });
    },
    postResourceFailure: function (resourceName, _a) {
        var message = _a.message;
        return rex_tils_1.createAction(ResourceListActionTypes.POST_RESOURCE_FAILURE, { resourceName: resourceName, message: message });
    },
    patchResourceRequest: function (resourceName) {
        return rex_tils_1.createAction(ResourceListActionTypes.PATCH_RESOURCE_REQUEST, { resourceName: resourceName });
    },
    patchResourceSuccess: function (resourceName, resource) {
        return rex_tils_1.createAction(ResourceListActionTypes.PATCH_RESOURCE_SUCCESS, { resourceName: resourceName, resource: resource });
    },
    patchResourceFailure: function (resourceName, _a) {
        var message = _a.message;
        return rex_tils_1.createAction(ResourceListActionTypes.PATCH_RESOURCE_FAILURE, { resourceName: resourceName, message: message });
    },
    deleteResourceRequest: function (resourceName) {
        return rex_tils_1.createAction(ResourceListActionTypes.DELETE_RESOURCE_REQUEST, { resourceName: resourceName });
    },
    deleteResourceSuccess: function (resourceName, resource) {
        return rex_tils_1.createAction(ResourceListActionTypes.DELETE_RESOURCE_SUCCESS, { resourceName: resourceName, resource: resource });
    },
    deleteResourceFailure: function (resourceName, _a) {
        var message = _a.message;
        return rex_tils_1.createAction(ResourceListActionTypes.DELETE_RESOURCE_FAILURE, { resourceName: resourceName, message: message });
    },
};
exports.initialState = {};
exports.resourceInitialState = { byId: {}, allIds: [], loading: false };
exports.reducer = function (state, action) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    if (state === void 0) { state = exports.initialState; }
    if (!action.payload) {
        return state;
    }
    var resourceState = state[action.payload.resourceName] || exports.resourceInitialState;
    switch (action.type) {
        case ResourceListActionTypes.GET_RESOURCES_REQUEST:
        case ResourceListActionTypes.POST_RESOURCE_REQUEST:
        case ResourceListActionTypes.PATCH_RESOURCE_REQUEST:
        case ResourceListActionTypes.DELETE_RESOURCE_REQUEST: {
            return __assign({}, state, (_a = {}, _a[action.payload.resourceName] = __assign({}, resourceState, { loading: true, error: undefined }), _a));
        }
        case ResourceListActionTypes.GET_RESOURCES_SUCCESS:
            return __assign({}, state, (_b = {}, _b[action.payload.resourceName] = __assign({}, resourceState, { byId: action.payload.resourcesById, allIds: action.payload.allIds, loading: false, error: undefined }), _b));
        case ResourceListActionTypes.POST_RESOURCE_SUCCESS: {
            return __assign({}, state, (_c = {}, _c[action.payload.resourceName] = __assign({}, resourceState, { byId: __assign({}, resourceState.byId, (_d = {}, _d[action.payload.resource.id] = action.payload.resource, _d)), allIds: resourceState.allIds.concat([action.payload.resource.id]), loading: false, error: undefined }), _c));
        }
        case ResourceListActionTypes.PATCH_RESOURCE_SUCCESS: {
            return __assign({}, state, (_e = {}, _e[action.payload.resourceName] = __assign({}, resourceState, { byId: (_f = {},
                    _f[action.payload.resource.id] = action.payload.resource,
                    _f), loading: false, error: undefined }), _e));
        }
        case ResourceListActionTypes.DELETE_RESOURCE_SUCCESS: {
            return __assign({}, state, (_g = {}, _g[action.payload.resourceName] = __assign({}, resourceState, { byId: omit_1.default(state.byId, action.payload.resource.id), allIds: resourceState.allIds.filter(function (el) { return el !== action.payload.resource.id; }), loading: false, error: undefined }), _g));
        }
        case ResourceListActionTypes.GET_RESOURCES_FAILURE:
        case ResourceListActionTypes.POST_RESOURCE_FAILURE:
        case ResourceListActionTypes.PATCH_RESOURCE_FAILURE:
        case ResourceListActionTypes.DELETE_RESOURCE_FAILURE: {
            return __assign({}, state, (_h = {}, _h[action.payload.resourceName] = __assign({}, resourceState, { loading: false, error: action.payload.message }), _h));
        }
        default:
            return state;
    }
};
