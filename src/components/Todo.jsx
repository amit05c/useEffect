import React from 'react'
import { useState, useEffect } from 'react'

const Todo = () => {
    const [newTodo, setNewTodo] = useState("")
    const [todos, setTodos] = useState([])
    useEffect(() => {
        fetch("http://localhost:8080/todos").then(res => res.json()).then(data => { setTodos(data); console.log(data) })

    }, [])

    const saveInfo = () => {
        // call api to save this info in backend
        fetch("http://localhost:8080/todos", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                text: newTodo,
                isCompleted: false
            }) 
        }).then(res => res.json()).then(data => {
             setTodos([...todos,newTodo]);
            setNewTodo("") 
        })

    }


    return (
        <div>
            <div>
                <div>
                    <input value={newTodo} onChange={({ target }) => 
                       setNewTodo(target.value)
                    // console.log(target.value)
                    } />
                    <button onClick={saveInfo}>+</button>

                </div>
                {todos.map(el => (
                    <div key={el.id}>{el.text}</div>
                ))}

            </div>

        </div>
    )
}

export default Todo