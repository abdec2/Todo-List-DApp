import { ethers } from "hardhat";

async function main() {

  const TodoList = await ethers.getContractFactory("TodoList");
  const todo = await TodoList.attach("0x3F633d7A2D7f91452d8F9a02e05568035226fA9a");
  
  await todo.createTask('Study Bootcamp 2021');
  
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
