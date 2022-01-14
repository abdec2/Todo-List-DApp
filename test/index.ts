import { expect } from "chai";
import { ethers } from "hardhat";

describe("TodoList", function() {
  it("Should create the todos", async function(){
    const Todo = await ethers.getContractFactory("TodoList");
    const todo = await Todo.deploy();
    await todo.deployed();
    const createTodoTx = await todo.createTask('Task 1');
    await createTodoTx.wait();
    const task = await todo.tasks(1);
    expect(task.content).to.equal("Task 1");
    expect(task.completed).to.equal(false);
    expect(task.owner).to.not.equal(undefined);
    expect(task.owner).to.not.equal("0x0");
    expect(task.owner).to.not.equal(" ");
    expect(task.owner).to.not.equal("");
    expect(task.owner).to.not.equal(null);
  });


});

// describe("Greeter", function () {
//   it("Should return the new greeting once it's changed", async function () {
//     const Greeter = await ethers.getContractFactory("Greeter");
//     const greeter = await Greeter.deploy("Hello, world!");
//     await greeter.deployed();

//     expect(await greeter.greet()).to.equal("Hello, world!");

//     const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

//     // wait until the transaction is mined
//     await setGreetingTx.wait();

//     expect(await greeter.greet()).to.equal("Hola, mundo!");
//   });
// });
