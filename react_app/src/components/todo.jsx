import React, { Component } from 'react';
import '../App.css';

class Todo extends Component {
 getStyle = () => {
  return { textDecoration: this.props.todo.completed ? 'line-through' : 'none' }
 }
 render() {
  const { title } = this.props.todo;
  return (
   <div className='todo'>
    <input type="checkbox" onChange={this.props.onChange.bind(this, this.props.todo)} />{'  '}
    <span style={this.getStyle()}>{title}</span>
    <input type="button" value="x" onClick={this.props.onDelete.bind(this, this.props.todo)} style={{ borderRadius: '50%', backgroundColor: '#d43f3f', color: 'black', float: 'right' }} />
   </div>
  );
 }
}

export default Todo;


