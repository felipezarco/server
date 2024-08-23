import { FilterQuery, Model, UpdateQuery } from "npm:mongoose";

export default class BaseRepository<T> {
  model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(data: T) {
    return await this.model.create(data);
  }

  async findMany(query: FilterQuery<T>) {
    return await this.model.find(query);
  }

  async findById(id: string) {
    return await this.model.findById(id);
  }

  async findOne(query: FilterQuery<T>) {
    if (query.id) {
      Object.assign(query, { _id: query.id });
      delete query.id;
    }
    return await this.model.findOne(query);
  }

  async update(id: string, update: UpdateQuery<T>) {
    return await this.model.findByIdAndUpdate(id, update, {
      new: true,
    });
  }

  async delete(id: string) {
    return await this.model.findByIdAndDelete(id);
  }
}
