import { useState } from "react"
import { imageUrl } from "./config"

function App() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [todos, _] = useState<string[]>([
        "Learn React",
        "Learn TypeScript",
        "Learn Kubernetes",
    ])
    return (
        <div style={{ padding: "20px" }}>
            <h1>The project App</h1>
            <img
                src={imageUrl}
                alt="A random picture"
                width="500px"
                height="700px"
            />
            <br />
            <input type="text" maxLength={140} />
            <button>Create todo</button>
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
