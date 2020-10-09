"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crud_controller_1 = __importDefault(require("../controlers/crud.controller"));
class CrudRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', crud_controller_1.default.get);
        this.router.post('/', crud_controller_1.default.post);
        this.router.put('/:postId', crud_controller_1.default.put);
        this.router.get('/:postId', crud_controller_1.default.getUser);
        this.router.delete('/:postId', crud_controller_1.default.delete);
    }
}
const CrudApp = new CrudRoutes();
exports.default = CrudApp.router;
