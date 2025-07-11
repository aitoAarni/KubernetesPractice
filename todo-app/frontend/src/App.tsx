import { imageUrl } from "./config"

function App() {
    return (
        <div style={{ padding: "20px" }}>
            <h1>The project App</h1>
            <img
                src={imageUrl}
                alt="A random picture"
                width="500px"
                height="700px"
            />
            <p>DevOps with Kubernetes 2025</p>
        </div >
    )
}

export default App
