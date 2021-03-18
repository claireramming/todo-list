import React from 'react';
import './App.css';
import TodoItem from './components/TodoItem'
import todosData from './todosData'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      todos : todosData,
      newTask : ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.newTask = this.newTask.bind(this)
    this.enterPress = this.enterPress.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  
  handleClick(id) {
    this.setState(prevState => {
      return {
          todos : prevState.todos.filter(todo => todo.id !== id)
      }
    })
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

  newTask(event) {
    this.setState({
      newTask : event.target.value
    })
  }

  enterPress(event) {
    const nextId = this.state.todos.length + 1
    console.log(this.state.todos.length)
    if (event.key === 'Enter') {
      this.setState(prevState => {
        const newTodo = {
          id : nextId,
          text : event.target.value,
          completed : false
        }
        return {
          todos : [...prevState.todos, newTodo],
          newTask : ''
        }
      })
    }
  }

  render() {
    const todoList = this.state.todos.map(todo => 
      <TodoItem 
        key={todo.id} 
        data={todo} 
        handleChange={this.handleChange} 
        handleClick={this.handleClick}
      />)

    return (
      <div>
      <header className="App-header">Todo List</header>
      <div className="todo-list">
        {todoList}
      </div>
      <div>
        <h1>Add a Todo!</h1>
        <input 
          type='text'
          value={this.state.newTask}
          placeholder='what do you want to do?'
          onChange={this.newTask}
          onKeyPress={this.enterPress}
          /> 
        </div>
      </div>
      )
  }
}

export default App;
