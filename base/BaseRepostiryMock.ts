// create abstract class that repository classes will extend
import { FilterQuery, UpdateQuery } from 'npm:mongoose'
export default abstract class RepositoryMock<T> {
  abstract create(data: T): T
  abstract findById(id: string): T
  abstract findOne(query: FilterQuery<T>): T
  abstract findMany(query: FilterQuery<T>): T
  abstract update(id: string, update: UpdateQuery<T>): T
  abstract delete(id: string): T
} 

