import React, { Component } from 'react';
import AddTodo from './components/addTodo.jsx'
import Todo from './components/todo.jsx';
import Header from './components/header.jsx';
const axios = require('axios');

class App extends Component {
  state = {
    todoList: []
  };
  onChange = (todo) => {
    const todoList = this.state.todoList.map(current_todo => {
      if (current_todo === todo) {
        current_todo.completed = !current_todo.completed;
      }
      return current_todo;
    });
    axios({
      method: 'put',
      url: 'http://localhost:5000/' + todo.id,
      data: { completed: todo.completed }
    }).then(this.setState({ todoList: todoList })).catch(err => console.log(err));
    return 0;
  };

  onSubmit = (value) => {
    console.log(value);
    const id = this.state.todoList[this.state.todoList.length - 1].id + 1;
    const newTodo = {
      id,
      title: value,
      completed: false
    };
    axios({
      method: 'post',
      url: 'http://localhost:5000/',
      data: newTodo
    }).then(this.setState({ todoList: [...this.state.todoList, newTodo] })).catch(err => console.log(err));
    this.setState({ todoList: [...this.state.todoList, newTodo] });
  }

  onDelete = (todo) => {
    axios({
      method: 'delete',
      url: 'http://localhost:5000/' + todo.id
    }).then(this.setState({ todoList: this.state.todoList.filter((Currenttodo) => Currenttodo !== todo) })
    ).catch(err => console.log(err));
    return 0;
  }

  render() {
    return (
      <div>
        <Header />
        <AddTodo onSubmit={this.onSubmit} />
        {this.state.todoList.map((todo) => <Todo key={parseInt(todo.id)} todo={todo} onChange={this.onChange} onDelete={this.onDelete} />)}
      </div>

    );
  }
  componentDidMount() {
    axios({
      method: 'get',
      url: 'http://localhost:5000/',
    }).then((data) => {
      console.log(typeof (data.data));
      console.log((data.data));
      this.setState({ todoList: data.data })
    }).catch(err => console.log(err));
  }
}

export default App;