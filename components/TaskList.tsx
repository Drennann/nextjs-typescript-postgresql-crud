import { Task } from "../interfaces/Task";
import TaskDetail from "./TaskDetail";
import {useRouter} from "next/router"

interface Props {
    tasks: Task[];
}

export default function TaskList(props: Props){

    const router = useRouter();

    const createNewTask = () => {
        router.push("/NewTask")
    }

    return(
        <>
        <div className="TaskContainer">
            {props.tasks.map( task => <TaskDetail key={task.id} task={task}/>)}
        </div>
        <button className="NewTaskButton" onClick={createNewTask}>Create new task</button>
        </>
    )
}