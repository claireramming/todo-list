import React, { useState } from 'react';
import './App.css';
import TodoItem from './components/TodoItem'
import todosData from './todosData'

function App() {
  const [ todos, setTodos ] = useState(todosData)
  const [ newTask, setNewTask ] = useState()
  const todoList = todos.map(todo => 
    <TodoItem 
      key={todo.id} 
      data={todo} 
      handleChange={handleChange} 
      handleClick={handleClick}
    />)
  
  function handleClick(id) {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
  }

  function updateNewTask(event) {setNewTask(event.target.value)}

  function handleChange(id) {
    setTodos(prevTodos => {
      const updateTodos = prevTodos.map(todo => {
          if (todo.id === id) {
            return {
              ...todo,
              completed : !todo.completed
            }
          }
          return todo
      })
      return {
        updateTodos
      }
    })
  }

  function addNewTask(event) {
    const nextId = todos.length + 1
    console.log(todos.length)
    if (event.key === 'Enter') {
      setTodos(prevTodos => {
        const newTodo = {
          id : nextId,
          text : event.target.value,
          completed : false
        }
        return [...prevTodos, newTodo]
        }
      )
      setNewTask('')
    }
  }

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
          value={newTask}
          placeholder='what do you want to do?'
          onChange={updateNewTask}
          onKeyPress={addNewTask}
          /> 
        </div>
      </div>
      )
}

export default App;
