"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var redux_mock_store_1 = __importDefault(require("redux-mock-store"));
var ResourceListReducer_1 = require("../src/Reducers/ResourceListReducer");
var keyBy_1 = __importDefault(require("lodash/keyBy"));
var Types_1 = require("../src/Types");
var ResourceListActions_1 = require("../src/Actions/ResourceListActions");
var redux_thunk_1 = __importDefault(require("redux-thunk"));
var Bill = /** @class */ (function (_super) {
    __extends(Bill, _super);
    function Bill(title) {
        var _this = _super.call(this) || this;
        _this.title = title;
        return _this;
    }
    Bill.schemaName = 'Bill';
    return Bill;
}(Types_1.Resource));
// tslint:disable-next-line max-classes-per-file
var Contact = /** @class */ (function (_super) {
    __extends(Contact, _super);
    function Contact(name) {
        var _this = _super.call(this) || this;
        _this.name = name;
        return _this;
    }
    Contact.schemaName = 'Contact';
    return Contact;
}(Types_1.Resource));
// tslint:disable-next-line max-classes-per-file
var DataSource = /** @class */ (function () {
    function DataSource() {
        this.getResources = function (_) {
            return [];
        };
        this.postResource = function (_, resource) {
            return Promise.resolve(resource);
        };
        this.patchResource = function (_, resource) {
            return Promise.resolve(resource);
        };
        this.deleteResource = function () {
            return Promise.resolve();
        };
    }
    return DataSource;
}());
exports.mockStore = redux_mock_store_1.default([redux_thunk_1.default]);
exports.emptyReduxStateMock = {
    resources: {},
};
var loadingNoError = {
    loading: true,
    error: undefined,
};
var notLoadingError = {
    loading: false,
    error: 'error message',
};
var notLoadingNoError = {
    loading: false,
    error: undefined,
};
describe('Resources List Reducer', function () {
    test('is correct', function () {
        expect(ResourceListReducer_1.reducer(ResourceListReducer_1.initialState, {})).toEqual(ResourceListReducer_1.initialState);
    });
    test('GET_RESOURCES_SUCCESS works as expected', function () {
        var _a, _b, _c;
        var resource1 = new Bill('');
        var resource2 = new Bill('');
        var resource3 = new Contact('Peter Parker');
        var resource4 = new Contact('Miles Morales');
        var billResourcesById = (_a = {},
            _a[resource1.id] = resource1,
            _a[resource2.id] = resource2,
            _a);
        var contactResourcesById = (_b = {},
            _b[resource3.id] = resource3,
            _b[resource4.id] = resource4,
            _b);
        var allBillIds = [resource1.id, resource2.id];
        var allContactIds = [resource3.id, resource4.id];
        var state = ResourceListReducer_1.reducer(ResourceListReducer_1.initialState, {});
        state = ResourceListReducer_1.reducer(state, ResourceListReducer_1.ResourceListsActions.getResourcesSuccess(Bill.schemaName, billResourcesById, allBillIds));
        state = ResourceListReducer_1.reducer(state, ResourceListReducer_1.ResourceListsActions.getResourcesSuccess(Contact.schemaName, contactResourcesById, allContactIds));
        expect(state).toEqual(__assign({}, ResourceListReducer_1.initialState, (_c = {}, _c[Bill.schemaName] = __assign({ byId: billResourcesById, allIds: allBillIds }, notLoadingNoError), _c[Contact.schemaName] = __assign({ byId: contactResourcesById, allIds: allContactIds }, notLoadingNoError), _c)));
    });
    test('POST_RESOURCE_SUCCESS works as expected', function () {
        var _a, _b;
        var resourceToPost = new Bill('');
        expect(ResourceListReducer_1.reducer(ResourceListReducer_1.initialState, ResourceListReducer_1.ResourceListsActions.postResourceSuccess(Bill.schemaName, resourceToPost))).toEqual(__assign({}, ResourceListReducer_1.initialState, (_a = {}, _a[Bill.name] = __assign({ byId: (_b = {}, _b[resourceToPost.id] = resourceToPost, _b), allIds: [resourceToPost.id] }, notLoadingNoError), _a)));
    });
    test('PATCH_RESOURCE_SUCCESS works as expected', function () {
        var _a, _b, _c, _d;
        var existingResource = new Bill('original title');
        var patchedResource = existingResource;
        patchedResource.title = 'new title';
        expect(ResourceListReducer_1.reducer(__assign({}, ResourceListReducer_1.initialState, (_a = {}, _a[Bill.schemaName] = __assign({ byId: (_b = {}, _b[existingResource.id] = existingResource, _b), allIds: [existingResource.id] }, notLoadingNoError), _a)), ResourceListReducer_1.ResourceListsActions.patchResourceSuccess(Bill.schemaName, patchedResource))).toEqual(__assign({}, ResourceListReducer_1.initialState, (_c = {}, _c[Bill.schemaName] = __assign({ byId: (_d = {}, _d[existingResource.id] = patchedResource, _d), allIds: [existingResource.id] }, notLoadingNoError), _c)));
    });
    test('DELETE_RESOURCE_SUCCESS works as expected', function () {
        var _a, _b, _c;
        var existingResource = new Bill('resource title');
        expect(ResourceListReducer_1.reducer(__assign({}, ResourceListReducer_1.initialState, (_a = {}, _a[Bill.schemaName] = __assign({ byId: (_b = {}, _b[existingResource.id] = existingResource, _b), allIds: [existingResource.id] }, notLoadingNoError), _a)), ResourceListReducer_1.ResourceListsActions.deleteResourceSuccess(Bill.schemaName, existingResource))).toEqual(__assign({}, ResourceListReducer_1.initialState, (_c = {}, _c[Bill.schemaName] = __assign({ byId: {}, allIds: [] }, notLoadingNoError), _c)));
    });
});
describe('Resources meta properties', function () {
    var _a;
    var reducerState = __assign({}, ResourceListReducer_1.initialState, (_a = {}, _a[Bill.schemaName] = {
        byId: {},
        allIds: [],
        loading: false,
        error: undefined,
    }, _a));
    var errorMessage = {
        message: notLoadingError.error,
    };
    test('GET_RESOURCES_REQUEST properly updates reducer', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            expect(ResourceListReducer_1.reducer(reducerState, ResourceListReducer_1.ResourceListsActions.getResourcesRequest(Bill.schemaName))).toEqual(__assign({}, reducerState, (_a = {}, _a[Bill.schemaName] = __assign({ byId: {}, allIds: [] }, loadingNoError), _a)));
            return [2 /*return*/];
        });
    }); });
    test('POST_RESOURCES_REQUEST properly updates reducer', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            expect(ResourceListReducer_1.reducer(reducerState, ResourceListReducer_1.ResourceListsActions.postResourceRequest(Bill.schemaName))).toEqual(__assign({}, reducerState, (_a = {}, _a[Bill.schemaName] = __assign({ byId: {}, allIds: [] }, loadingNoError), _a)));
            return [2 /*return*/];
        });
    }); });
    test('PATCH_RESOURCES_REQUEST properly updates reducer', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            expect(ResourceListReducer_1.reducer(reducerState, ResourceListReducer_1.ResourceListsActions.patchResourceRequest(Bill.schemaName))).toEqual(__assign({}, reducerState, (_a = {}, _a[Bill.schemaName] = __assign({ byId: {}, allIds: [] }, loadingNoError), _a)));
            return [2 /*return*/];
        });
    }); });
    test('DELETE_RESOURCES_REQUEST properly updates reducer', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            expect(ResourceListReducer_1.reducer(reducerState, ResourceListReducer_1.ResourceListsActions.deleteResourceRequest(Bill.schemaName))).toEqual(__assign({}, reducerState, (_a = {}, _a[Bill.schemaName] = __assign({ byId: {}, allIds: [] }, loadingNoError), _a)));
            return [2 /*return*/];
        });
    }); });
    test('GET_RESOURCES_FAILURE properly updates reducer', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            expect(ResourceListReducer_1.reducer(reducerState, ResourceListReducer_1.ResourceListsActions.getResourcesFailure(Bill.schemaName, errorMessage))).toEqual(__assign({}, reducerState, (_a = {}, _a[Bill.schemaName] = __assign({ byId: {}, allIds: [] }, notLoadingError), _a)));
            return [2 /*return*/];
        });
    }); });
    test('POST_RESOURCES_FAILURE properly updates reducer', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            expect(ResourceListReducer_1.reducer(reducerState, ResourceListReducer_1.ResourceListsActions.postResourceFailure(Bill.schemaName, errorMessage))).toEqual(__assign({}, reducerState, (_a = {}, _a[Bill.schemaName] = __assign({ byId: {}, allIds: [] }, notLoadingError), _a)));
            return [2 /*return*/];
        });
    }); });
    test('PATCH_RESOURCES_FAILURE properly updates reducer', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            expect(ResourceListReducer_1.reducer(reducerState, ResourceListReducer_1.ResourceListsActions.patchResourceFailure(Bill.schemaName, errorMessage))).toEqual(__assign({}, reducerState, (_a = {}, _a[Bill.schemaName] = __assign({ byId: {}, allIds: [] }, notLoadingError), _a)));
            return [2 /*return*/];
        });
    }); });
    test('DELETE_RESOURCES_FAILURE properly updates reducer', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            expect(ResourceListReducer_1.reducer(reducerState, ResourceListReducer_1.ResourceListsActions.deleteResourceFailure(Bill.schemaName, errorMessage))).toEqual(__assign({}, reducerState, (_a = {}, _a[Bill.schemaName] = __assign({ byId: {}, allIds: [] }, notLoadingError), _a)));
            return [2 /*return*/];
        });
    }); });
});
describe('Resources.getResources action', function () {
    var store = exports.mockStore(exports.emptyReduxStateMock);
    var dataSource = new DataSource();
    beforeEach(function () {
        dataSource.getResources = jest.fn(function (_) { return []; });
        store = exports.mockStore(exports.emptyReduxStateMock);
    });
    test('getResources returns resources in the order received from DataSource', function () { return __awaiter(_this, void 0, void 0, function () {
        var mockData, actions, expectedResourcesById, expectedAllIds;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockData = [new Bill('resource1'), new Bill('resource')];
                    dataSource.getResources = jest.fn(function () { return mockData; });
                    return [4 /*yield*/, store.dispatch(ResourceListActions_1.getResources(Bill.schemaName, dataSource))];
                case 1:
                    _a.sent();
                    actions = store.getActions();
                    expect(actions[0]).toStrictEqual({
                        type: ResourceListReducer_1.ResourceListActionTypes.GET_RESOURCES_REQUEST,
                        payload: {
                            resourceName: Bill.schemaName,
                        },
                    });
                    expectedResourcesById = keyBy_1.default(mockData, function (el) { return el.id; });
                    expectedAllIds = mockData.map(function (el) { return el.id; });
                    expect(actions[1]).toStrictEqual({
                        type: ResourceListReducer_1.ResourceListActionTypes.GET_RESOURCES_SUCCESS,
                        payload: {
                            resourcesById: expectedResourcesById,
                            allIds: expectedAllIds,
                            resourceName: Bill.schemaName,
                        },
                    });
                    expect(actions.length === 2);
                    return [2 /*return*/];
            }
        });
    }); });
    test('getResources catches any error and handles it', function () { return __awaiter(_this, void 0, void 0, function () {
        var mockError, actions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockError = 'error';
                    dataSource.getResources = jest.fn(function () {
                        throw new Error(mockError);
                    });
                    return [4 /*yield*/, store.dispatch(ResourceListActions_1.getResources(Bill.schemaName, dataSource))];
                case 1:
                    _a.sent();
                    actions = store.getActions();
                    expect(actions[0]).toEqual({
                        type: ResourceListReducer_1.ResourceListActionTypes.GET_RESOURCES_REQUEST,
                        payload: {
                            resourceName: Bill.schemaName,
                        },
                    });
                    expect(actions[1]).toEqual({
                        type: ResourceListReducer_1.ResourceListActionTypes.GET_RESOURCES_FAILURE,
                        payload: {
                            message: mockError,
                            resourceName: Bill.schemaName,
                        },
                    });
                    expect(actions.length === 2);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('Resources.postResource action', function () {
    var store = exports.mockStore(exports.emptyReduxStateMock);
    var dataSource = new DataSource();
    beforeAll(function () {
        dataSource.postResource = jest.fn(function (_, resource) { return Promise.resolve(resource); });
        store = exports.mockStore(exports.emptyReduxStateMock);
    });
    test('postResource creates new resource passing validation tests', function () { return __awaiter(_this, void 0, void 0, function () {
        var newResource, actions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newResource = new Bill('resource1');
                    return [4 /*yield*/, store.dispatch(ResourceListActions_1.postResource(Bill.schemaName, newResource, dataSource, function (_) { return []; }))];
                case 1:
                    _a.sent();
                    actions = store.getActions();
                    expect(actions[0]).toEqual({
                        type: ResourceListReducer_1.ResourceListActionTypes.POST_RESOURCE_REQUEST,
                        payload: {
                            resourceName: Bill.schemaName,
                        },
                    });
                    expect(actions[1]).toEqual({
                        type: ResourceListReducer_1.ResourceListActionTypes.POST_RESOURCE_SUCCESS,
                        payload: {
                            resource: newResource,
                            resourceName: Bill.schemaName,
                        },
                    });
                    expect(actions.length === 2);
                    return [2 /*return*/];
            }
        });
    }); });
    test('postResource validation tests', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, _b, resource1, resource2, EmptyTitleValidationErrror, LongTitleValidationErrror, actions, longName;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    resource1 = new Bill('resource1');
                    resource2 = resource1;
                    EmptyTitleValidationErrror = 'Bill title can\t be empty';
                    LongTitleValidationErrror = 'Bill title length is restricted to 256 characters';
                    store = exports.mockStore(__assign({}, exports.emptyReduxStateMock, { resources: (_a = {},
                            _a[Bill.schemaName] = __assign({ byId: (_b = {},
                                    _b[resource1.id] = resource1,
                                    _b), allIds: [resource1.id] }, notLoadingNoError),
                            _a) }));
                    return [4 /*yield*/, store.dispatch(ResourceListActions_1.postResource(Bill.schemaName, resource2, dataSource))];
                case 1:
                    _c.sent();
                    actions = store.getActions();
                    store.clearActions();
                    expect(actions[0]).toEqual({
                        type: ResourceListReducer_1.ResourceListActionTypes.POST_RESOURCE_REQUEST,
                        payload: {
                            resourceName: Bill.schemaName,
                        },
                    });
                    expect(actions[1]).toEqual({
                        type: ResourceListReducer_1.ResourceListActionTypes.POST_RESOURCE_FAILURE,
                        payload: {
                            message: ResourceListActions_1.DuplicateResourceError,
                            resourceName: Bill.schemaName,
                        },
                    });
                    return [4 /*yield*/, store.dispatch(ResourceListActions_1.postResource(Bill.schemaName, new Bill(''), dataSource, function (resource) {
                            return resource.title.length === 0 ? [EmptyTitleValidationErrror] : [];
                        }))];
                case 2:
                    _c.sent();
                    actions = store.getActions();
                    store.clearActions();
                    expect(actions[0]).toEqual({
                        type: ResourceListReducer_1.ResourceListActionTypes.POST_RESOURCE_REQUEST,
                        payload: {
                            resourceName: Bill.schemaName,
                        },
                    });
                    expect(actions[1]).toEqual({
                        type: ResourceListReducer_1.ResourceListActionTypes.POST_RESOURCE_FAILURE,
                        payload: {
                            message: EmptyTitleValidationErrror,
                            resourceName: Bill.schemaName,
                        },
                    });
                    longName = '0123'.repeat(65) // 256 character name
                    ;
                    return [4 /*yield*/, store.dispatch(ResourceListActions_1.postResource(Bill.schemaName, new Bill(longName), dataSource, function (resource) {
                            return resource.title.length > 256 ? [LongTitleValidationErrror] : [];
                        }))];
                case 3:
                    _c.sent();
                    actions = store.getActions();
                    store.clearActions();
                    expect(actions[0]).toEqual({
                        type: ResourceListReducer_1.ResourceListActionTypes.POST_RESOURCE_REQUEST,
                        payload: {
                            resourceName: Bill.schemaName,
                        },
                    });
                    expect(actions[1]).toEqual({
                        type: ResourceListReducer_1.ResourceListActionTypes.POST_RESOURCE_FAILURE,
                        payload: {
                            message: LongTitleValidationErrror,
                            resourceName: Bill.schemaName,
                        },
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    test('postResources catches any error and handles it', function () { return __awaiter(_this, void 0, void 0, function () {
        var mockError, actions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockError = 'error';
                    dataSource.postResource = jest.fn(function () {
                        throw new Error(mockError);
                    });
                    return [4 /*yield*/, store.dispatch(ResourceListActions_1.postResource(Bill.schemaName, new Bill('abcd'), dataSource))];
                case 1:
                    _a.sent();
                    actions = store.getActions();
                    expect(actions[0]).toEqual({
                        type: ResourceListReducer_1.ResourceListActionTypes.POST_RESOURCE_REQUEST,
                        payload: {
                            resourceName: Bill.schemaName,
                        },
                    });
                    expect(actions[1]).toEqual({
                        type: ResourceListReducer_1.ResourceListActionTypes.POST_RESOURCE_FAILURE,
                        payload: {
                            message: mockError,
                            resourceName: Bill.schemaName,
                        },
                    });
                    expect(actions.length === 2);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('Resource.patchResource action', function () {
    var store = exports.mockStore(exports.emptyReduxStateMock);
    var dataSource = new DataSource();
    beforeEach(function () {
        dataSource.patchResource = jest.fn(function (_, resource) { return Promise.resolve(resource); });
        store = exports.mockStore(exports.emptyReduxStateMock);
    });
    test('patchResource updates an existing resource passing validation tests', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, _b, resourceToUpdate, actions;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    resourceToUpdate = new Bill('original title');
                    store = exports.mockStore(__assign({}, exports.emptyReduxStateMock, { resources: (_a = {},
                            _a[Bill.schemaName] = __assign({ byId: (_b = {},
                                    _b[resourceToUpdate.id] = resourceToUpdate,
                                    _b), allIds: [resourceToUpdate.id] }, notLoadingNoError),
                            _a) }));
                    resourceToUpdate.title = 'new title';
                    return [4 /*yield*/, store.dispatch(ResourceListActions_1.patchResource(Bill.schemaName, resourceToUpdate, dataSource))];
                case 1:
                    _c.sent();
                    actions = store.getActions();
                    expect(actions[0]).toEqual({
                        type: ResourceListReducer_1.ResourceListActionTypes.PATCH_RESOURCE_REQUEST,
                        payload: {
                            resourceName: Bill.schemaName,
                        },
                    });
                    expect(actions[1]).toEqual({
                        type: ResourceListReducer_1.ResourceListActionTypes.PATCH_RESOURCE_SUCCESS,
                        payload: {
                            resource: resourceToUpdate,
                            resourceName: Bill.schemaName,
                        },
                    });
                    expect(actions.length === 2);
                    return [2 /*return*/];
            }
        });
    }); });
    test('patchResource fails with error if resource to update doesnt exist', function () { return __awaiter(_this, void 0, void 0, function () {
        var resourceToUpdate, actions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    resourceToUpdate = new Bill('original title');
                    resourceToUpdate.title = 'new title';
                    return [4 /*yield*/, store.dispatch(ResourceListActions_1.patchResource(Bill.schemaName, resourceToUpdate, dataSource))];
                case 1:
                    _a.sent();
                    actions = store.getActions();
                    expect(actions[0]).toEqual({
                        type: ResourceListReducer_1.ResourceListActionTypes.PATCH_RESOURCE_REQUEST,
                        payload: {
                            resourceName: Bill.schemaName,
                        },
                    });
                    expect(actions[1]).toEqual({
                        type: ResourceListReducer_1.ResourceListActionTypes.PATCH_RESOURCE_FAILURE,
                        payload: {
                            message: ResourceListActions_1.NoResourceToUpdateError,
                            resourceName: Bill.schemaName,
                        },
                    });
                    expect(actions.length === 2);
                    return [2 /*return*/];
            }
        });
    }); });
    test('patchResource catches any error and handles it', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, _b, mockError, resourceToUpdate, actions;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    mockError = 'error';
                    resourceToUpdate = new Bill('original title');
                    dataSource.patchResource = jest.fn(function () {
                        throw new Error(mockError);
                    });
                    store = exports.mockStore(__assign({}, exports.emptyReduxStateMock, { resources: (_a = {},
                            _a[Bill.schemaName] = __assign({ byId: (_b = {},
                                    _b[resourceToUpdate.id] = resourceToUpdate,
                                    _b), allIds: [resourceToUpdate.id] }, notLoadingNoError),
                            _a) }));
                    resourceToUpdate.title = 'new title';
                    return [4 /*yield*/, store.dispatch(ResourceListActions_1.patchResource(Bill.schemaName, resourceToUpdate, dataSource))];
                case 1:
                    _c.sent();
                    actions = store.getActions();
                    expect(actions[0]).toEqual({
                        type: ResourceListReducer_1.ResourceListActionTypes.PATCH_RESOURCE_REQUEST,
                        payload: {
                            resourceName: Bill.schemaName,
                        },
                    });
                    expect(actions[1]).toEqual({
                        type: ResourceListReducer_1.ResourceListActionTypes.PATCH_RESOURCE_FAILURE,
                        payload: {
                            message: mockError,
                            resourceName: Bill.schemaName,
                        },
                    });
                    expect(actions.length === 2);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('Resources.deleteResource action', function () {
    var store = exports.mockStore(exports.emptyReduxStateMock);
    var dataSource = new DataSource();
    beforeEach(function () {
        dataSource.deleteResource = jest.fn(function () { return Promise.resolve(); });
        store = exports.mockStore(exports.emptyReduxStateMock);
    });
    test('deleteResource deletes an existing resource passing validation tests', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, _b, resourceToDelete, actions;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    resourceToDelete = new Bill('original title');
                    store = exports.mockStore(__assign({}, exports.emptyReduxStateMock, { resources: (_a = {},
                            _a[Bill.schemaName] = __assign({ byId: (_b = {},
                                    _b[resourceToDelete.id] = resourceToDelete,
                                    _b), allIds: [resourceToDelete.id] }, notLoadingNoError),
                            _a) }));
                    return [4 /*yield*/, store.dispatch(ResourceListActions_1.deleteResource(Bill.schemaName, resourceToDelete, dataSource))];
                case 1:
                    _c.sent();
                    actions = store.getActions();
                    expect(actions[0]).toEqual({
                        type: ResourceListReducer_1.ResourceListActionTypes.DELETE_RESOURCE_REQUEST,
                        payload: {
                            resourceName: Bill.schemaName,
                        },
                    });
                    expect(actions[1]).toEqual({
                        type: ResourceListReducer_1.ResourceListActionTypes.DELETE_RESOURCE_SUCCESS,
                        payload: {
                            resource: resourceToDelete,
                            resourceName: Bill.schemaName,
                        },
                    });
                    expect(actions.length === 2);
                    return [2 /*return*/];
            }
        });
    }); });
    test('deleteResource fails with error if resource to delete doesnt exist', function () { return __awaiter(_this, void 0, void 0, function () {
        var resourceToDelete, actions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    resourceToDelete = new Bill('resource title');
                    return [4 /*yield*/, store.dispatch(ResourceListActions_1.deleteResource(Bill.schemaName, resourceToDelete, dataSource))];
                case 1:
                    _a.sent();
                    actions = store.getActions();
                    expect(actions[0]).toEqual({
                        type: ResourceListReducer_1.ResourceListActionTypes.DELETE_RESOURCE_REQUEST,
                        payload: {
                            resourceName: Bill.schemaName,
                        },
                    });
                    expect(actions[1]).toEqual({
                        type: ResourceListReducer_1.ResourceListActionTypes.DELETE_RESOURCE_FAILURE,
                        payload: {
                            message: ResourceListActions_1.NoResourceToDeleteError,
                            resourceName: Bill.schemaName,
                        },
                    });
                    expect(actions.length === 2);
                    return [2 /*return*/];
            }
        });
    }); });
    test('deleteResource catches any error and handles it', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, _b, mockError, resourceToDelete, actions;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    mockError = 'error';
                    resourceToDelete = new Bill('original title');
                    dataSource.deleteResource = jest.fn(function () {
                        throw new Error(mockError);
                    });
                    store = exports.mockStore(__assign({}, exports.emptyReduxStateMock, { resources: (_a = {},
                            _a[Bill.schemaName] = {
                                byId: (_b = {},
                                    _b[resourceToDelete.id] = resourceToDelete,
                                    _b),
                                allIds: [resourceToDelete.id],
                                loading: false,
                                error: undefined,
                            },
                            _a) }));
                    return [4 /*yield*/, store.dispatch(ResourceListActions_1.deleteResource(Bill.schemaName, resourceToDelete, dataSource))];
                case 1:
                    _c.sent();
                    actions = store.getActions();
                    expect(actions[0]).toEqual({
                        type: ResourceListReducer_1.ResourceListActionTypes.DELETE_RESOURCE_REQUEST,
                        payload: {
                            resourceName: Bill.schemaName,
                        },
                    });
                    expect(actions[1]).toEqual({
                        type: ResourceListReducer_1.ResourceListActionTypes.DELETE_RESOURCE_FAILURE,
                        payload: {
                            message: mockError,
                            resourceName: Bill.schemaName,
                        },
                    });
                    expect(actions.length === 2);
                    return [2 /*return*/];
            }
        });
    }); });
});
