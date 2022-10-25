import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { Task } from "../../interfaces/Task";

interface Props {
  task: Task;
}

export default function EditTask(props: Props) {

    const router = useRouter();
    const [title, setTitle] = useState(props.task.title);
    const [description, setDescription] = useState(props.task.description);

    const titleHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    const descriptionHandler = (e:ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    }

    const EditTask = async () => {
        await fetch("http://localhost:3000/api/tasks/"+props.task.id, {
            headers: {
                "Content-Type": "Application/json"
            },
            method:"PUT",
            body: JSON.stringify({
                title, description
            })
        })
        router.push("/")
    }

  return (
    <div className="App">
      <div className="newTask">
        <input
          type="text"
          className="newTitle"
          placeholder="Title"
          value={title}
          onChange={titleHandler}
        ></input>
        <textarea
          className="newDescription"
          placeholder="Description"
          value={description}
          onChange={descriptionHandler}
        ></textarea>
      </div>
      <div className="buttons">
        <button onClick={() => router.push("/")}>Volver</button>
        <button onClick={EditTask}>Aceptar</button>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.params === undefined)
    return {
      props: {
        task: {
          id: "1",
          title: "Placeholder",
          description: "Placeholder",
          created_on: new Date(),
        },
      },
    };

  const id = context.params.id;

  const fetchTask = await fetch("http://localhost:3000/api/tasks/" + id);
  const task = await fetchTask.json();

  return {
    props: {
      task,
    },
  };
};
