export default class MongoDBStrategy {
  constructor (connectionString) {
    this.dbStrategy = connectionString

    this.collection = "warriors"
  }

  async connect() {
  }
  async create(item) {
  }
  async read(item) {
  }
}