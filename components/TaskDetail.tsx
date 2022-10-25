import { Task } from "../interfaces/Task";
import {useRouter} from "next/router";

interface Props {
  task: Task;
}

export default function TaskDetail(props: Props) {

    const router = useRouter();

  const deleteTask = async (id: string) => {
    await fetch("http://localhost:3000/api/tasks/" + id, {
      method: "DELETE",
    });
    router.push("/");
  };

  return (
    <div className="Task">
      <div className="title">{props.task.title}</div>
      <div className="description">{props.task.description}</div>
      <div className="date">
        {new Date(props.task.created_on).toLocaleDateString()}
      </div>
      <div className="buttonsm">
        <button onClick={() => deleteTask(props.task.id)}>Delete</button>
        <button onClick={() => router.push("/edit/"+props.task.id)}>Edit</button>
      </div>
    </div>
  );
}