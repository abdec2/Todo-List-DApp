import { ethers } from "hardhat";

async function main() {

  const TodoList = await ethers.getContractFactory("TodoList");
  const todo = await TodoList.deploy();
  await todo.deployed();
  console.log("Address: ", todo.address);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
