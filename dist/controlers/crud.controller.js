"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database/database");
class CrudDatabase {
    constructor() {
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.connect();
            const posts = yield conn.query('SELECT * FROM usuarios');
            res.status(200).json(posts[0]);
        });
    }
    post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.connect();
            try {
                let body = req.body;
                let data = yield conn.query('INSERT INTO usuarios SET ?', [body]);
                let dataResponse = yield conn.query(`SELECT * FROM usuarios WHERE id = ${data[0].insertId}`);
                res.status(201).json(dataResponse[0][0]);
            }
            catch (e) {
                console.error(e);
                res.status(400).json({
                    'msg': 'Datos invalidos'
                });
            }
        });
    }
    put(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.postId;
                const updatePost = req.body;
                const conn = yield database_1.connect();
                let data = yield conn.query('UPDATE usuarios set ? WHERE id = ?', [updatePost, id]);
                let dataResponse = yield conn.query(`SELECT * FROM usuarios WHERE id = ${id}`);
                res.status(201).json(dataResponse[0][0]);
            }
            catch (e) {
                console.error(e);
                res.status(400).json({
                    'msg': 'Datos invalidos'
                });
            }
            const id = req.params.postId;
            const updatePost = req.body;
            const conn = yield database_1.connect();
            let data = yield conn.query('UPDATE usuarios set ? WHERE id = ?', [updatePost, id]);
            let dataResponse = yield conn.query(`SELECT * FROM usuarios WHERE id = ${data[0].insertId}`);
            res.status(201).json(dataResponse[0][0]);
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.connect();
            const id = req.params.postId;
            const posts = yield conn.query('SELECT * FROM usuarios WHERE id = ?', [id]);
            if (posts[0].length == 0) {
                res.status(400).json({
                    'msg': "User doesn't exists"
                });
            }
            else {
                res.json(posts[0][0]);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.postId;
            const conn = yield database_1.connect();
            yield conn.query('DELETE FROM usuarios WHERE id = ?', [id]);
            res.status(204).send();
        });
    }
}
const apiCrud = new CrudDatabase();
exports.default = apiCrud;
