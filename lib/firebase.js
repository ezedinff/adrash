const admin = require('firebase-admin');

module.exports = () => {
    let serviceAccount = require('./serviceAccountKey.json');

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });

    let db = admin.firestore();

    const findContributor = (id) => {};
    const addContributor = (id) => {

    };

    const data = () => {};
    const addData = (data) => {};

    const updateData = (id, data) => {};
    const deleteData = (id) => {};
};