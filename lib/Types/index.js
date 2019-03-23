"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var v4_1 = __importDefault(require("uuid/v4"));
var Resource = /** @class */ (function () {
    function Resource() {
        this.id = v4_1.default();
    }
    return Resource;
}());
exports.Resource = Resource;
