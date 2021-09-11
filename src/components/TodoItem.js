import React from "react"
import Checkbox from './Checkbox'

function TodoItem(props) {
    const itemStyle = props.data.completed ? "completed-item" : "todo-item"
    return (
        <div className={itemStyle}>
            <Checkbox 
                checked={props.data.completed}
                handleChange = {props.handleChange}
                id = {props.data.id} />
            <p>{props.data.text}</p>
            <button 
                onClick={() => props.handleClick(props.data.id)}
            >X</button>
        </div>

    )
}
 
export default TodoItem