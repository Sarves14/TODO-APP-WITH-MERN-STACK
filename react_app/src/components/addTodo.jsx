import React, { Component } from 'react';

class AddTodo extends Component {
 state = {
  value: ''
 }
 onChange = (e) => {
  this.setState({ value: e.target.value });
 }

 render() {
  return (
   <div>
    <input style={{ width: '95vw' }} type="text" name="addfield" onChange={this.onChange} />
    <input type="button" value="Submit" onClick={this.props.onSubmit.bind(this, this.state.value)} />

   </div>
  );


 }
}

export default AddTodo;