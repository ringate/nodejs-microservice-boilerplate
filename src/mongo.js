import { MongoClient } from 'mongodb'
const dbUrl = 'mongodb://localhost:27017';
const dbName = 'crudtest';
const dbOpts = {
  useUnifiedTopology: true,
  useNewUrlParser: true
};
const client = new MongoClient(dbUrl, dbOpts);

const isConnected = () => {
  return !!client && !!client.topology && client.topology.isConnected()
}

const open = async () => {
  try {
    if (!isConnected()) {
      await client.connect();
      return 'OK';
    } else {
      return 'OK';
    }
  } catch (err) {
    return err;
  }
}

const close = async () => {
  try {
    if (isConnected()) {
      await client.close();
      return 'OK';
    } else {
      return 'OK';
    }
  } catch (err) {
    return err;
  }
}

const insert = async (collection, data) => {
  try {
    if (isConnected()) {
      let res = await client.db(dbName).collection(collection).insertOne(data);
      return res;
    } else {
      return 'No connection.';
    }
  } catch (err) {
    return err;
  }
}

const select = async (collection, query, fields) => {
  try {
    if (isConnected()) {
      let res = await client.db(dbName).collection(collection).find(query).project(fields).toArray();
      return res;
    } else {
      return 'No connection.';
    }
  } catch (err) {
    return err;
  }
}

const update = async (collection, query, data) => {
  try {
    if (isConnected()) {
      let res = await client.db(dbName).collection(collection).updateMany(query, data);
      return res;
    } else {
      return 'No connection.';
    }
  } catch (err) {
    return err;
  }
}

const remove = async (collection, query) => {
  try {
    if (isConnected()) {
      let res = await client.db(dbName).collection(collection).deleteMany(query);
      return res;
    } else {
      return 'No connection.';
    }
  } catch (err) {
    return err;
  }
}

module.exports = {
  open,
  close,
  insert,
  select,
  update,
  remove
}
