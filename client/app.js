import React, { Component } from 'react'

import {Navbar} from './components'
import Routes from './routes'
import { Button } from 'semantic-ui-react'
import Web3 from 'web3'
import Contract from 'truffle-contract'
import TodoListContract from '../build/contracts/TodoList.json'

class App extends Component  {

  constructor() {
    super();
    this.state = {
      todoList: {},
      accounts: []
    }
  }

  async componentDidMount() {
    const todoList = Contract(TodoListContract);
    todoList.setProvider(window.web3.currentProvider);
    const todoListInstance = await todoList.deployed();
    console.log("todoListInstance", todoListInstance);
    this.setState({
      todoList: todoListInstance,
    });
  }

  async onClick() {
    const { todoList } = this.state;
    window.web3.eth.getAccounts((err, accounts) => {
      if(err) throw new Error(err);
      todoList.createTodo("we made a todo", { from: accounts[0] })
    });
    const numTodos = await todoList.getTotalNumTodos();
    window.alert("you have " + numTodos + " contracts!")
  }

  render() {
    return (
      <div>
        <Navbar />
        <Routes />
        <Button
          onClick={this.onClick.bind(this)}
        >
          Click me plz
        </Button>
      </div>
    )
  }
}

export default App
