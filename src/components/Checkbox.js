import React from 'react'

// creates a link that looks like a button
// when clicked, it will open a new tab
// props must contain a url (href) and the button text (text)

function Checkbox(props) {
    return (
        <span className="checkbox__input">
            <input type="checkbox" 
                checked={props.checked}
                onChange = {() => props.handleChange(props.id)} />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
            >
                <path
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                d="M1.73 12.91l6.37 6.37L22.79 4.59"
                />
            </svg>
        </span>
    )
}

export default Checkbox