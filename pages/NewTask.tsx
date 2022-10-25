import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

export default function NewTask() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const titleHandler = (e:ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  };

  const descriptionHandler = (e:ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  };

  const aceptTask = async () => {
    await fetch("http://localhost:3000/api/tasks", {
      method: "POST",
      headers: {
        "Content-type": "Application/json",
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });
    router.push("/");
  };

  const rejectTask = () => {
    router.push("/");
  };

  return (
    <div className="App">
      <div className="newTask">
        <input
          type="text"
          className="newTitle"
          placeholder="Title"
          onChange={titleHandler}
        ></input>
        <textarea
          className="newDescription"
          placeholder="Description"
          onChange={descriptionHandler}
        ></textarea>
      </div>
      <div className="buttons">
        <button onClick={rejectTask}>Volver</button>
        <button onClick={aceptTask}>Aceptar</button>
      </div>
    </div>
  );
}
