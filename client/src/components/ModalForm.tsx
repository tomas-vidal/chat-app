import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/User";
import { IoPerson } from "react-icons/io5";
import ReactModal from "react-modal";
import { UserContextObject } from "../types/@types.user";

export default function ModalForm() {
  const [modalIsOpen, setIsOpen] = useState<boolean>(true);
  const { loginUsername, username } = useContext(
    UserContext
  ) as UserContextObject;

  const handleLogin = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const form: HTMLFormElement = event.currentTarget;
    const input = form.querySelector("Input");
    const isInput = input instanceof HTMLInputElement;

    if (!isInput || input == null) return;
    loginUsername(input.value);
    setIsOpen(false);
    input.value == "";
  };

  useEffect(() => {
    if (username !== null) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [username]);

  return (
    <ReactModal
      isOpen={modalIsOpen}
      className="border-none h-screen flex justify-center items-center bg-gray-900"
    >
      <form
        onSubmit={(event) => handleLogin(event)}
        className=" py-8 px-10 flex flex-col rounded-lg bg-gray-800"
      >
        <h2 className="text-center text-white font-bold">Ingresar</h2>
        <hr className="w-24 mx-auto border-[1px] rounded-lg bg-gray-700 mt-2"></hr>
        <div className="mt-6 relative">
          <label className="text-xs font-bold  text-gray-600" htmlFor="name">
            NOMBRE
          </label>
          <input
            type="text"
            className="block py-1 px-2 rounded-md outline-none bg-gray-600 text-xs h-10 w-60 text-white"
            placeholder="Ingresa un nombre..."
            id="name"
          />
          <IoPerson className="absolute top-9 right-3 text-white text-lg" />
        </div>
        <button
          type="submit"
          className="bg-emerald-500 text-white py-2 px-10 rounded-lg self-center mt-6 text-sm mb-2"
        >
          Ingresar
        </button>
      </form>
    </ReactModal>
  );
}
