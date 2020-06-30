const MongoClient = require('mongodb').MongoClient;
const dbUrl = 'mongodb://localhost:27017';
const dbName = 'crudtest';
const dbOpts = {
  useUnifiedTopology: true,
  useNewUrlParser: true
};
const client = new MongoClient(dbUrl, dbOpts);

const open = () => {
  return new Promise((resolve, reject) => {
    if (!client.isConnected()) {
      return client.connect((err) => {
        if (err == null) {
          resolve('OK');
        } else {
          reject(err);
        }
      });
    } else {
      resolve('OK');
    }
  });
}

const close = () => {
  return new Promise((resolve, reject) => {
    if (client.isConnected()) {
      return client.close((err) => {
        if (err == null) {
          resolve('OK');
        } else {
          reject(err);
        }
      });
    } else {
      resolve('OK');
    }
  });
}

const insert = (collection, data) => {
  return new Promise((resolve, reject) => {
    if (client.isConnected()) {
      client.db(dbName).collection(collection).insertOne(data).then((res) => {
        resolve(res);
      }).catch((err) => {
        reject(err);
      });
    } else {
      reject('No connection.');
    }
  });
}

const select = (collection, query, fields) => {
  return new Promise((resolve, reject) => {
    if (client.isConnected()) {
      client.db(dbName).collection(collection).find(query).project(fields).toArray((err, res) => {
        if (err) {
          reject(err); 
        } else {
          resolve(res);
        } 
      });
    } else {
      reject('No connection.');
    }
  });
}

const update = (collection, query, data) => {
  return new Promise((resolve, reject) => {
    if (client.isConnected()) {
      client.db(dbName).collection(collection).updateMany(query, data, (err, res) => {
        if (err) {
          reject(err); 
        } else {
          resolve(res);
        } 
      });
    } else {
      reject('No connection.');
    }
  });
}

const remove = (collection, query) => {
  return new Promise((resolve, reject) => {
    if (client.isConnected()) {
      client.db(dbName).collection(collection).deleteMany(query, (err, res) => {
        if (err) {
          reject(err); 
        } else {
          resolve(res);
        } 
      });
    } else {
      reject('No connection.');
    }
  });
}

module.exports = {
  open,
  close,
  insert,
  select,
  update,
  remove
}