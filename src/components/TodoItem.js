import React from "react"

function TodoItem(props) {
    const itemStyle = props.data.completed ? "completed-item" : "todo-item"
    return (
        <div className={itemStyle}>
            <input type="checkbox" 
                checked={props.data.completed}
                onChange = {() => props.handleChange(props.data.id)} />
            <p>{props.data.text}</p>
        </div>

    )
}
 
export default TodoItem