const todoList = artifacts.require("./TodoList.sol");

module.exports = function(deployer) {
  deployer.deploy(todoList);
};
