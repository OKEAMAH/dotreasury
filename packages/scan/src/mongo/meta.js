const { MongoClient } = require("mongodb");
const { currentChain } = require("../chain");

function getDbName() {
  const chain = currentChain();
  if ("kusama" === chain) {
    return process.env.MONGO_DB_META_KSM_NAME || "meta-ksm";
  } else if ("polkadot" === chain) {
    return process.env.MONGO_DB_META_DOT_NAME || "meta-dot";
  }

  throw new Error("unknown chain");
}

const blockCollectionName = "block";
const statusCollectionName = "status";

let client = null;
let db = null;

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017";

let statusCol = null;
let blockCol = null;

async function initDb() {
  client = await MongoClient.connect(mongoUrl, {
    useUnifiedTopology: true,
  });

  db = client.db(getDbName());
  statusCol = db.collection(statusCollectionName);
  blockCol = db.collection(blockCollectionName);

  await _createIndexes();
}

async function _createIndexes() {
  if (!db) {
    console.error("Please call initDb first");
    process.exit(1);
  }

  await blockCol.createIndex({ height: -1 }, { unique: true });
  // TODO: create indexes for better query performance
}

async function tryInit(col) {
  if (!col) {
    await initDb();
  }
}

async function getStatusCollection() {
  await tryInit(statusCol);
  return statusCol;
}

async function getBlockCollection() {
  await tryInit(blockCol);
  return blockCol;
}

async function getBlocks(startHeight, endHeight) {
  const col = await getBlockCollection();
  return await col
    .find({
      $and: [
        { height: { $gte: startHeight } },
        { height: { $lte: endHeight } },
      ],
    })
    .sort({ height: 1 })
    .toArray();
}

module.exports = {
  getStatusCollection,
  getBlockCollection,
  getBlocks,
};
