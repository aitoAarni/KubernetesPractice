import { useEffect, useState } from "react"
import { apiUrl } from "./config"

function App() {
    const [todo, setTodo] = useState<string>("")
    const [todos, setTodos] = useState<string[]>([
        "Learn React",
        "Learn TypeScript",
        "Learn Kubernetes",
    ])

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await fetch(`${apiUrl}/notes`)
                if (!response.ok) {
                    throw new Error("Failed to fetch todos")
                }
                const data = await response.json()
                setTodos(prevTodos => {
                    return [...prevTodos, ...data.data]
                })
            } catch (error) {
                console.error("Error fetching todos:", error)
            }
        }

        fetchTodos()
    }, [])

    const sendTodo = async () => {
        if (todo.trim() === "") {
            alert("Todo cannot be empty")
            return
        }

        try {
            const response = await fetch(`${apiUrl}/notes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ data: todo }),
            })

            if (!response.ok) {
                throw new Error("Failed to create todo")
            }
            const responseBody = await response.json()
            console.log("Todo created:", responseBody)
            setTodos(prevTodos => [...prevTodos, responseBody.data])
            setTodo("")
        } catch (error) {
            console.error("Error creating todo:", error)
            alert("Failed to create todo")
        }
    }

    return (
        <div style={{ padding: "20px" }}>
            <h1>The project App</h1>
            <img
                src={`${apiUrl}/image`}
                alt="A random picture"
                width="500px"
                height="700px"
            />
            <br />
            <input
                type="text"
                maxLength={140}
                value={todo}
                onChange={event => {
                    setTodo(event.target.value)
                }}
            />
            <button onClick={sendTodo}>Create todo</button>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>{todo}</li>
                ))}
            </ul>
            <p>DevOps with Kubernetes 2025</p>
        </div>
    )
}

export default App
