import mongoose from "npm:mongoose";
import AddressClass from "./AddressClass.ts";
import BaseSchema, { required } from "../../../base/BaseSchema.ts";

export type IAddressDocument = IAddress & mongoose.Document;
export interface IAddress extends IAddressVirtuals {
  name: string;
  zipcode: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
}

// deno-lint-ignore no-empty-interface
interface IAddressVirtuals {
  
}

class AddressSchemaClass extends BaseSchema {
  constructor() {
    super({
      name: {
        type: String,
        required: required("O endereço deve ter um nome!"),
      },
      zipcode: {
        type: String,
        required: required("O endereço deve ter um CEP!"),
      },
      street: {
        type: String,
        required: required("O endereço deve ter uma rua!"),
      },
      number: {
        type: String,
        required: required("O endereço deve ter um número!"),
      },
      complement: {
        type: String,
      },
      neighborhood: {
        type: String,
        required: required("O endereço deve ter um bairro!"),
      },
      city: {
        type: String,
        required: required("O endereço deve ter uma cidade!"),
      },
      state: {
        type: String,
        required: required("O endereço deve ter um estado!"),
      },

      /************************* BEGIN: REFERENCES  /*************************/
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      /************************* END: REFERENCES  /*************************/

    }, {});
  }
}

const AddressSchema = new AddressSchemaClass().schema;

AddressSchema.index({ zipcode: 1 });

AddressSchema.loadClass(AddressClass);

export default AddressSchema;
