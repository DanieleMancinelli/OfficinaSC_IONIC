import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";
import "./setupIonic.ts"; // <-- Inizializzazione di Ionic

createRoot(document.getElementById("root")!).render(<App />);
