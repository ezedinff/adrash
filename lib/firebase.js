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
var admin = require("firebase-admin");
var path = require("path");
var Firebase = /** @class */ (function () {
    function Firebase() {
        var p = path.join(__dirname + '/adrash-873cc-773f62517837.json');
        admin.initializeApp({
            credential: admin.credential.cert(p)
        });
    }
    Firebase.getDb = function () {
        return admin.firestore();
    };
    Firebase.findContributor = function (id) { };
    Firebase.contributors = function () {
        return Firebase.getDb().collection('contributors').get();
    };
    Firebase.addContributor = function (id, data) {
        var ref = Firebase.getDb().collection('contributors').doc(String(id));
        return ref.set(__assign({}, data));
    };
    Firebase.data = function () { };
    Firebase.addData = function (data) {
        var ref = Firebase.getDb().collection('data').doc();
        return ref.set(data);
    };
    Firebase.updateData = function (id, data) { };
    Firebase.deleteData = function (id) { };
    return Firebase;
}());
exports.Firebase = Firebase;
