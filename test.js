const api = require('./api');
const ObjectId = require('mongodb').ObjectId; 
const test = async() => {
    try {
        const log = {};
        api.setDbName('test');
        log.collections = await api.getCollections();
        log.dbs = await api.getDatabases();
        log.createDatabase = await api.createDatabase('test');
        log.insert = await api.insert('testCollection',{a:1,b:2});
        const id = log.insert.insertedId;
        const opt = {
            collection:"testCollection",
            limit:2,
            filter:{
                _id: ObjectId(id)
            }
        }
        log.update = await api.update(opt,{b:3});
        log.find = await api.find(opt);
        log.remove = await api.remove(opt);
        console.log(log)
    } catch (error) {
        console.log(error)
    }

}

test();