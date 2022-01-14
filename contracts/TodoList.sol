//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract TodoList {
    uint private taskCount = 0;
    
    event TaskCreated(uint id, string content, bool completed);
    event TaskCompleted(uint id, bool completed);
    
    struct Task {
        uint id;
        string content;
        bool completed;
        address owner;
    } 

    mapping ( uint => Task ) public tasks;

    function createTask(string memory _content) public {
        taskCount++;
        tasks[taskCount] = Task(taskCount, _content, false, msg.sender);
        emit TaskCreated(taskCount, _content, false);
    }

    function toggleComplete(uint _id) public {
        Task memory _task = tasks[_id];
        _task.completed = !_task.completed;
        tasks[_id] = _task;
        emit TaskCompleted(_id, _task.completed);
    }

    function fetchTasks() public view returns (Task[] memory) {
        uint myTaskCount = 0;
        uint currentIndex = 0;
        for(uint i = 0; i < taskCount; i++) {
            if(tasks[i+1].owner == msg.sender){
                myTaskCount++;
            }
        }
        Task[] memory allTasks = new Task[](myTaskCount); 
        for(uint i = 0; i < taskCount; i++) {
            if(tasks[i+1].owner == msg.sender){
                allTasks[currentIndex] = tasks[i+1];
                currentIndex++;
            }
        }
        return allTasks;
    }
}