import { useState, useContext, useEffect, useRef } from "react";
import { UserContextObject } from "../types/@types.user";
import { UserContext } from "../context/User";
import { io, Socket } from "socket.io-client";

type message = {
  text: string;
  username: string;
};

function Chat() {
  const [messages, setMessages] = useState<message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const myRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/messages")
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
      });
    setSocket(io("ws://localhost:3000", { withCredentials: true }));
  }, []);

  useEffect(() => {
    if (myRef.current) {
      myRef.current.scrollIntoView();
    }
  }, [messages]);

  if (socket) {
    socket.on("chat message", ({ text, username }) => {
      setMessages([...messages, { text: text, username: username }]);
    });
  }

  const { username } = useContext(UserContext) as UserContextObject;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const form: HTMLFormElement = event.currentTarget;
    const input = form.querySelector("Input");
    const isInput = input instanceof HTMLInputElement;
    if (!isInput || input == null) return;
    if (!input.value) return;
    if (!socket) return;
    socket.emit("chat message", { text: input.value, username });
    input.value = "";
  };

  return (
    <section className="bg-gray-800 w-[70%] max-h rounded-lg flex flex-col pt-3">
      <ul className="flex-1 text-white flex flex-col gap-3 overflow-auto">
        {messages.map((msg) => {
          if (username == msg.username) {
            return (
              <li className="rounded-lg p-2 mx-3">
                <h3 className="text-xs font-bold text-gray-500">
                  {msg.username}
                </h3>
                {msg.text}
              </li>
            );
          } else {
            return (
              <li className="bg-gray-600 rounded-lg p-2 mx-3">
                <h3 className="text-xs font-bold text-gray-500">
                  {msg.username}
                </h3>
                {msg.text}
              </li>
            );
          }
        })}
        <li ref={myRef}></li>
      </ul>
      <form
        className="flex gap-2 self-stretch bg-gray-800/50 p-2"
        onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
          handleSubmit(event)
        }
      >
        <input
          className="h-10 flex-1 bg-gray-700 outline-none text-white p-3 rounded-lg"
          type="text"
          placeholder="Escribe un mensaje..."
        />
        <button
          type="submit"
          className="px-6 py-1 text-white font-bold text-sm rounded-lg bg-emerald-400"
        >
          Enviar
        </button>
      </form>
    </section>
  );
}

export default Chat;
