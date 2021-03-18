import React from 'react';
import './App.css';
import TodoItem from './components/TodoItem'
import todosData from './todosData'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      todos : todosData
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(id) {
    this.setState(prevState => {
      const updateTodos = prevState.todos.map(todo => {
          if (todo.id === id) {
            return {
              ...todo,
              completed : !todo.completed
            }
          }
          return todo
      })
      return {
        todos : updateTodos
      }
    })
  }

  render() {
    const todoList = this.state.todos.map(todo => <TodoItem key={todo.id} data={todo} handleChange={this.handleChange}/>)

    return (
      <div>
      <header className="App-header">Todo List</header>
      <div className="todo-list">
        {todoList}
      </div>
      </div>
      )
  }
}

export default App;
