import { ethers } from "hardhat";

interface task {
  id:any, 
  content: string, 
  completed: boolean, 
  owner: any
}

async function main() {

  const TodoList = await ethers.getContractFactory("TodoList");
  const todo = await TodoList.attach("0x3F633d7A2D7f91452d8F9a02e05568035226fA9a");
  
  const allTasks:Array<any> = await todo.fetchTasks();

  allTasks.map((item:task) => {
    console.log(item.id.toNumber());
    console.log(item.content);
    console.log(item.completed);
    console.log(item.owner);
  });
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
