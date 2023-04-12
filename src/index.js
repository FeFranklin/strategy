import ContextStrategy from "./base/contextStrategy.js";
import MongoDBStrategy from "./strategies/mongoDBStrategy.js";
import PostgresStrategy from "./strategies/postgresStrategy.js";

const postgresConnectionString = "postgres://felipe:senha0001@localhost:5432/heroes"
const postgresContext = new ContextStrategy(new PostgresStrategy(postgresConnectionString))
await postgresContext.connect()

const mongoDBConnectionString = "mongodb://felipe:senhaadmin@localhost:27017/heroes"
const mongodbContext = new ContextStrategy(new MongoDBStrategy(mongoDBConnectionString))
await mongodbContext.connect()


const data = [{
  name: 'felipe',
  type: 'transcation'
}, {
  name: 'maria',
  type: 'activityLog'
}]

// await mongodbContext.create({name: data[1].name})
console.log(await mongodbContext.read())

const contextTypes = {
  transcation: postgresContext,
  activityLog: mongodbContext
}

for (const {type, name} of data) {
  const context = contextTypes[type]
  await context.create({ name: name + Date.now()})

  console.log(type, context.dbStrategy.constructor.name)
  console.log(await context.read())
}