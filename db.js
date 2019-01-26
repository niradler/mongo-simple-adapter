const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = process.env.MONGO_URI || 'mongodb://localhost';
let db = null;
const connect = async () => {
    try {
        if(db) return db;
        const client = await MongoClient.connect(`${MONGO_URL}`,{ useNewUrlParser: true });
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