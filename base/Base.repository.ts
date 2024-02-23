import { Model, FilterQuery, UpdateQuery } from 'npm:mongoose'

export default class BaseRepository<T> {

  model: Model<T>

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(data: T) {
    new this.model(data);
    return await this.model.create(data);
  }

  async findById(id: string) {
    return await this.model.findById(id);
  }

  async findOne(query: FilterQuery<T>) {
    if (query.id) return await this.model.findById(query.id);
    return await this.model.findOne(query);
  }

  async findMany(query: FilterQuery<T>) {
    return await this.model.find(query);
  }

  async update(id: string, update: UpdateQuery<T>) {
    return await this.model.findByIdAndUpdate(id, update, {
      new: true,
    })
  }

  async delete(id: string) {
    return await this.model.findByIdAndDelete(id);
  }
}