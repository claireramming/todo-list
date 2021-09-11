import React, { useState } from 'react';
import './App.css';
import TodoItem from './components/TodoItem'

function App() {
  const origTodos = JSON.parse(localStorage.getItem('todos'))
  const [ todos, setTodos ] = useState(origTodos ? origTodos : [])
  const [lastTaskId, setLastTaskId] = useState(origTodos.at(-1).id)
  const [ newTask, setNewTask ] = useState()
  const todoList = todos.map(todo => 
    <TodoItem 
      key={todo.id} 
      data={todo} 
      handleChange={handleChange} 
      handleClick={handleClick}
    />)
  
  function handleClick(id) {
    setTodos(prevTodos => {
      const newTodos = prevTodos.filter(todo => todo.id !== id)
      localStorage.setItem('todos', JSON.stringify(newTodos))
      return newTodos
    })
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
          } else { return todo }
          
      })
      console.log(updateTodos)
      return {
        updateTodos
      }
    })
  }

  function addNewTask(event) {
    const nextId = lastTaskId + 1
    if (event.key === 'Enter') {
      setTodos(prevTodos => {
        const newTodo = {
          id : nextId,
          text : event.target.value,
          completed : false
        }
        setLastTaskId(nextId)
        const newTodos = [...prevTodos, newTodo]
        localStorage.setItem('todos', JSON.stringify(newTodos))
        return newTodos
        }
      )
      setNewTask('')
    }
  }

    return (
      <div className="todo-list">
        <h1 className="App-header">Todo List</h1>
        {todoList}
        <input 
          className='new-task'
          type='text'
          value={newTask || ''}
          placeholder='what do you want to do?'
          onChange={updateNewTask}
          onKeyPress={addNewTask}
          /> 
      </div>
      )
}

export default App;
