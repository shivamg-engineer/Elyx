"use strict";
// Unit Testing
Object.defineProperty(exports, "__esModule", { value: true });
// Write tests for your routes using Jest or Mocha.
// TODO: Ensure coverage for both success and error scenarios.
// jest: Testing framework
// ts-jest: Allows Jest to work with TypeScript
// supertest: For HTTP request testing against Express apps
var express_1 = require("express");
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/ping', function (req, res) {
    res.status(200).json({ message: 'pong' });
});
app.get('/error', function (req, res) {
    res.status(500).json({ error: 'Something went wrong' });
});
exports.default = app;
