"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var keyBy_1 = __importDefault(require("lodash/keyBy"));
var ResourceListReducer_1 = require("../Reducers/ResourceListReducer");
var anyErrorToString = function (error) {
    if (error instanceof Error) {
        return error.message;
    }
    if (typeof error === 'string') {
        return error;
    }
    return 'unknown error';
};
exports.getResources = function (resourceName, dataSource) { return function (dispatch) { return __awaiter(_this, void 0, void 0, function () {
    var resources, resourcesById, ids;
    return __generator(this, function (_a) {
        dispatch(ResourceListReducer_1.ResourceListsActions.getResourcesRequest(resourceName));
        try {
            resources = dataSource.getResources(resourceName);
            resourcesById = keyBy_1.default(resources, function (el) { return el.id; });
            ids = resources.map(function (el) { return el.id; });
            dispatch(ResourceListReducer_1.ResourceListsActions.getResourcesSuccess(resourceName, resourcesById, ids));
        }
        catch (error) {
            dispatch(ResourceListReducer_1.ResourceListsActions.getResourcesFailure(resourceName, { message: anyErrorToString(error) }));
        }
        return [2 /*return*/];
    });
}); }; };
exports.DuplicateResourceError = 'Resource already exists';
exports.postResource = function (resourceName, resource, dataSource, validationBlock) { return function (dispatch, getState) { return __awaiter(_this, void 0, void 0, function () {
    var resources, resourcesById, validationErrors, postedResource, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                dispatch(ResourceListReducer_1.ResourceListsActions.postResourceRequest(resourceName));
                resources = getState().resources;
                resourcesById = (resources[resourceName] || ResourceListReducer_1.resourceInitialState).byId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                if (resourcesById[resource.id]) {
                    throw new Error(exports.DuplicateResourceError);
                }
                if (validationBlock) {
                    validationErrors = validationBlock(resource);
                    if (validationErrors.length > 0) {
                        throw new Error(validationErrors.join(', '));
                    }
                }
                return [4 /*yield*/, dataSource.postResource(resourceName, resource)];
            case 2:
                postedResource = _a.sent();
                dispatch(ResourceListReducer_1.ResourceListsActions.postResourceSuccess(resourceName, postedResource));
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                dispatch(ResourceListReducer_1.ResourceListsActions.postResourceFailure(resourceName, {
                    message: anyErrorToString(error_1),
                }));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); }; };
exports.NoResourceToUpdateError = "Can't update non-existent resource";
exports.patchResource = function (resourceName, resource, dataSource) { return function (dispatch, getState) { return __awaiter(_this, void 0, void 0, function () {
    var resources, resourcesById, patchedResource, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                dispatch(ResourceListReducer_1.ResourceListsActions.patchResourceRequest(resourceName));
                resources = getState().resources;
                resourcesById = (resources[resourceName] || ResourceListReducer_1.resourceInitialState).byId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                if (!resourcesById[resource.id]) {
                    throw new Error(exports.NoResourceToUpdateError);
                }
                return [4 /*yield*/, dataSource.patchResource(resourceName, resource)];
            case 2:
                patchedResource = _a.sent();
                dispatch(ResourceListReducer_1.ResourceListsActions.patchResourceSuccess(resourceName, patchedResource));
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                dispatch(ResourceListReducer_1.ResourceListsActions.patchResourceFailure(resourceName, {
                    message: anyErrorToString(error_2),
                }));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); }; };
exports.NoResourceToDeleteError = "Can't delete non-existent resource";
exports.deleteResource = function (resourceName, resource, dataSource) { return function (dispatch, getState) { return __awaiter(_this, void 0, void 0, function () {
    var resources, resourcesById, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                dispatch(ResourceListReducer_1.ResourceListsActions.deleteResourceRequest(resourceName));
                resources = getState().resources;
                resourcesById = (resources[resourceName] || ResourceListReducer_1.resourceInitialState).byId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                if (!resourcesById[resource.id]) {
                    throw new Error(exports.NoResourceToDeleteError);
                }
                return [4 /*yield*/, dataSource.deleteResource(resourceName, resource)];
            case 2:
                _a.sent();
                dispatch(ResourceListReducer_1.ResourceListsActions.deleteResourceSuccess(resourceName, resource));
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                dispatch(ResourceListReducer_1.ResourceListsActions.deleteResourceFailure(resourceName, {
                    message: anyErrorToString(error_3),
                }));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); }; };
