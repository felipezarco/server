import mongoose from "npm:mongoose";
import AddressSchema, { IAddress } from "./AddressSchema.ts";
import BaseRepository from "../../../base/BaseRepository.ts";

class AddressRepository extends BaseRepository<IAddress> {
  constructor(
    model: mongoose.Model<IAddress> = mongoose.model<IAddress>("Address", AddressSchema),
  ) {
    super(model);
  }

}

export default AddressRepository;
