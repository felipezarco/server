import { FilterQuery, Model, UpdateQuery } from "npm:mongoose";

export default class BaseRepository<T> {
  model: Model<T>;
  modelRefs?: Array<string>;
  queriedModel?: FilterQuery<T>;

  constructor(model: Model<T>, modelRefs?: Array<string>) { 
    this.model = model;
    this.modelRefs = modelRefs;
  }

  create(data: T) {
    return this.model.create(data);
  }

  findMany(query: FilterQuery<T>) {
    const findMany = this.model.find(query)
    this.modelRefs?.forEach(ref =>findMany.populate(ref));
    return findMany;
  }

  findById(id: string) {
    const findById = this.model.findById(id)
    this.modelRefs?.forEach(ref => findById.populate(ref));
    return findById;
  }

  findOne(query: FilterQuery<T>) {
    if (query.id) {
      Object.assign(query, { _id: query.id });
      delete query.id;
    }
    const findOne = this.model.findOne(query) 
    this.modelRefs?.forEach(ref => findOne.populate(ref));
    return findOne;
  }

  update(id: string, update: UpdateQuery<T>) {
    const findAndUpdate = this.model.findByIdAndUpdate(id, update, {
      new: true,
    })
    this.modelRefs?.forEach(ref => findAndUpdate.populate(ref));
    return findAndUpdate;
  }

  delete(id: string) {
    const findByIdAndDelete = this.model.findByIdAndDelete(id);
    this.modelRefs?.forEach(ref => findByIdAndDelete.populate(ref));
    return findByIdAndDelete;
  }
}
