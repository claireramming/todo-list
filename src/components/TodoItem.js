import React from "react"

function TodoItem(props) {
    const itemStyle = props.data.completed ? "completed-item" : "todo-item"
    return (
        <div className={itemStyle}>
            <input type="checkbox" 
                checked={props.data.completed}
                onChange = {() => props.handleChange(props.data.id)} />
            <p>{props.data.text}</p>
            <input type="button" value='X'
                onClick={() => props.handleClick(props.data.id)}
                />
        </div>

    )
}
 
export default TodoItem