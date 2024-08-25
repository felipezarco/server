import AddressRepository from "./MainDatabase/Address/AddressRepository.ts";
import UserRepository from "./MainDatabase/User/UserRepository.ts";

const InitializeRepositories = () => {
  new UserRepository();
  new AddressRepository();
}

export default InitializeRepositories;