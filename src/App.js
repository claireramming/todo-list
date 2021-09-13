import React, { useState } from 'react';
import './App.css';
import TodoItem from './components/TodoItem'

function App() {
  const origTodos = JSON.parse(localStorage.getItem('todos'))
  const [ todos, setTodos ] = useState(origTodos ? origTodos : [])
  const [ lastTaskId, setLastTaskId ] = useState(todos.length > 0 ? todos.at(-1).id : 0)
  const [ newTask, setNewTask ] = useState()
  const todoList = todos.map(todo => 
    <TodoItem 
      key={todo.id} 
      data={todo} 
      handleChange={handleChange} 
      handleClick={removeTask}
      handleEditTask={editTask}
      handleUpdate={updateTask}
      saveTask={saveTask}
    />)

  function updateTaskState(condition, outputOnTrue, outputOnFalse) {
    setTodos(prevTodos => {
      const updateTodos = prevTodos.map(todo => {
        if (todo.id === condition) {
          return {
            ...todo,
            ...outputOnTrue
          }
        } else {
          return {
            ...todo,
            ...outputOnFalse
          }
        }
      })
      return updateTodos
    })
  }
  
  function removeTask(id) {
    setTodos(prevTodos => {
      const newTodos = prevTodos.filter(todo => todo.id !== id)
      localStorage.setItem('todos', JSON.stringify(newTodos))
      return newTodos
    })
  }

  function editTask(id) { updateTaskState(id, {edit:true}, {edit:false}) }

  function updateTask(event, id) { 
    updateTaskState(id, {text: event.target.value}, {}) 
    localStorage.setItem('todos', JSON.stringify(todos))
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
      localStorage.setItem('todos', JSON.stringify(updateTodos))
      return updateTodos
    })
  }

  function addNewTask(event) {
    const nextId = lastTaskId + 1
    if (event.key === 'Enter') {
      setTodos(prevTodos => {
        const newTodo = {
          id : nextId,
          text : event.target.value,
          completed : false,
          edit : false
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

  function saveTask(event, task) {
    if (event.key === 'Backspace' && !task.text) {
      removeTask(task.id)
    }
    if (event.key === 'Enter') {
      updateTaskState(
        task.id, 
        {text: event.target.value,
          edit: false},
        {}
        )
        localStorage.setItem('todos', JSON.stringify(todos))
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
