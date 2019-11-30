import * as admin from 'firebase-admin';
import * as path from 'path';

export class Firebase {
    static db;
    constructor() {
        const p = path.join(__dirname + '/adrash-873cc-773f62517837.json');
        admin.initializeApp({
            credential: admin.credential.cert(p)
        });
    }
    public static getDb() {
       return admin.firestore();
    }

    public static findContributor(id) {};
    public static addContributor(id) {
        const ref = Firebase.getDb().collection('contributors').doc(String(id));
        return ref.set({
            id: id
        })
    };

    public static  data(){}
    public static  addData(data){
        const ref = Firebase.getDb().collection('data').doc();
        return ref.set(data);
    }

    public static  updateData(id, data){};
    public static  deleteData(id){};
}