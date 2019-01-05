const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = 'mongodb://localhost' || process.env.MONGO_URI;
let db = null;
const connect = async (dbName ='') => {
    try {
        if(db) return db;
        const client = await MongoClient.connect(`${MONGO_URL}/${dbName}`,{ useNewUrlParser: true });
        db = client;
        return client;
    } catch (error) {
        throw error;
    }
}

const test = async () =>{
    try {
        await connect();
        return true;
    } catch (error) {
        console.error(error)
        return false;
    }
}

module.exports = {
    test,
    connect
}