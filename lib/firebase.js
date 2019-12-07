"use strict";
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
    Firebase.addContributor = function (id, data) {
        var ref = Firebase.getDb().collection('contributors').doc(String(id));
        return ref.set(data);
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
