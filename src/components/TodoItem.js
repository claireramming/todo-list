import React, {useEffect, useRef} from "react"
import Foco from 'react-foco'
import Checkbox from './Checkbox'
// import OutsideClickHandler from "./OutsideClickHandler";

function TodoItem(props) {
    const inputRef = useRef()
    const itemStyle = props.data.completed ? "completed-item" : "todo-item"

    useEffect(() => {
        if (inputRef && inputRef.current && props.data.edit === true) {
          inputRef.current.focus();
        }
      }, [props.data.edit]);

    return (
        <div className={itemStyle}>
            <Checkbox 
                checked={props.data.completed}
                handleChange = {props.handleChange}
                id = {props.data.id} />
                <p 
                    onClick={()=> props.handleEditTask(props.data.id)} 
                    hidden={props.data.edit}>{props.data.text}</p>
                <Foco className={props.data.edit ? '' : 'hidden'} onClickOutside={(e)=>{props.onOutsideClick(e, props.data.id)}}>
                <input
                    ref={inputRef}
                    type='text'
                    id={props.data.aid}
                    hidden={!props.data.edit} 
                    className='update-task'
                    value={props.data.text}
                    placeholder='what do you want to do?'
                    onChange={(e) => props.handleUpdate(e, props.data.id)}
                    onKeyDown={(e) => props.saveTask(e, props.data)} />
                </Foco>
            <button 
                onClick={() => props.handleClick(props.data.id)}
            >X</button>
        </div>

    )
}
 
export default TodoItem