import AddressRepository from "./MainDatabase/Address/AddressRepository.ts";
import UserRepository from "./MainDatabase/User/UserRepository.ts";

const InitializeRepositories = () => {
  // TODO: go accross all repostiories on folder directly
  new UserRepository();
  new AddressRepository();
}

export default InitializeRepositories;