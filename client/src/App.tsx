import ModalForm from "./components/ModalForm";
import Chat from "./components/Chat";
import "./App.css";
import { User } from "./context/User";

function App() {
  return (
    <main className="bg-gray-900 h-screen flex justify-center py-10">
      <User>
        <ModalForm />
        <Chat />
      </User>
    </main>
  );
}

export default App;
