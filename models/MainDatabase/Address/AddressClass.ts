import { IAddress } from "./AddressSchema.ts";

class AddressClass implements IAddress {

  name: IAddress["name"];
  zipcode: IAddress["zipcode"];
  street: IAddress["street"];
  number: IAddress["number"];
  complement?: IAddress["complement"];
  neighborhood: IAddress["neighborhood"];
  city: IAddress["city"];
  state: IAddress["state"];
  
  constructor(address: IAddress) {
    this.name = address.name;
    this.zipcode = address.zipcode;
    this.street = address.street;
    this.number = address.number;
    this.complement = address.complement;
    this.neighborhood = address.neighborhood;
    this.city = address.city;
    this.state = address.state;
  }

  get fullAddress() {
    return `${this.street}, ${this.number} - ${this.neighborhood}, ${this.city} - ${this.state} (${this.zipcode})`;
  }
}

export default AddressClass;
