const {connect,test} = require('./db');
let dbName = "admin";

const setDbName = (DbName) =>dbName = DbName;

const getDbName = () =>dbName;

const getMongoClient = async () => {
    try {
        const client = await connect();
        return client;
    } catch (error) {
        throw error;
    }
}

const getMongoClientDb = async () => {
    try {
        const client = await connect();
        const dbo = client.db(dbName);
        return dbo;
    } catch (error) {
        throw error;
    }
}

const getCollections = async () =>{
    try {
        const client = await connect();
        const dbo = client.db(dbName);
        const collections = await dbo.listCollections().toArray();
        return collections;
    } catch (error) {
        throw error;
    }
}

const createCollection = async (name) =>{
    try {
        const client = await connect();
        const dbo = client.db(dbName);
        const collection = await dbo.createCollection(name);
        return collection;
    } catch (error) {
        throw error;
    }
}

const deleteCollection = async (name) =>{
    try {
        const client = await connect();
        const dbo = client.db(dbName);
        const collection = await dbo.collection(name).drop();
        return collection;
    } catch (error) {
        throw error;
    }
}

const getDatabases = async () =>{
    try {
        const client = await connect();
        const adminDb = client.db(dbName).admin();
        const dbs = await adminDb.listDatabases({nameOnly:true});
        return dbs.databases.map(d=>d.name);
    } catch (error) {
       return {error}
    } 
}

const createDatabase = async (databaseName) =>{
    try {
        const client = await connect();
        const dbo = client.db(databaseName);
        if(dbo) return true;
        return false;
    } catch (error) {
        throw error;
    } 
}

const deleteDatabase = async (databaseName) =>{
    try {
        const client = await connect();
        const dbo = client.db(databaseName);
        const data = await dbo.dropDatabase();
        return data;
    } catch (error) {
        throw error;
    } 
}

const insert = async (collection,doc) =>{
    try {
        const client = await connect();
        const dbo = client.db(dbName);
        const data = await dbo.collection(collection).insertOne(doc);
        return data;
    } catch (error) {
        throw error;
    }
}

const remove = async ({collection=null, filter={}}) =>{
    try {
        const client = await connect();
        const dbo = client.db(dbName);
        const data = await dbo.collection(collection).deleteOne(filter);
        return data;
    } catch (error) {
        throw error;
    }
}

const find = async ({collection=null, filter={},limit=20,skip=0,sort={}}) =>{
    try {
        const client = await connect();
        const dbo = client.db(dbName);
        const data = await dbo.collection(collection).find(filter).skip(skip).limit(limit).sort(sort).toArray();
        return data;
    } catch (error) {
        throw error;
    }
}

const update = async ({collection=null, filter={}},doc) => {
    try {
        const client = await connect();
        const dbo = client.db(dbName);
        const data = await dbo.collection(collection).updateOne(filter, { $set: doc });
        return data;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    connect,
    test,
    setDbName,
    getDbName,
    getMongoClientDb,
    getMongoClient,
    getCollections,
    createCollection,
    deleteCollection,
    getDatabases,
    deleteDatabase,
    createDatabase,
    find,
    insert,
    update,
    remove
}