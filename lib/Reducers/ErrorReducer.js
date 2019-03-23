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
function reducer(state, action) {
    if (state === void 0) { state = {}; }
    var _a;
    var type = action.type, payload = action.payload;
    var matches = /(.*)_(REQUEST|FAILURE)/.exec(type);
    if (!matches)
        return state;
    var requestName = matches[1], requestState = matches[2];
    return __assign({}, state, (_a = {}, _a[requestName] = requestState === 'FAILURE' ? payload.message : undefined, _a));
}
exports.reducer = reducer;
