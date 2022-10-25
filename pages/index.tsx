import TaskList from "../components/TaskList";
import { Task } from "../interfaces/Task";

interface Props {
  tasks: Task[];
}

export default function Main(props: Props) {
  
  return (
    <div className="App">
      {props.tasks.length === 0 ? <h1>No Tasks</h1>: <TaskList tasks={props.tasks}/>}
    </div>
  );
}

export const getServerSideProps = async () => {
  
  const fetchTasks = await fetch("http://localhost:3000/api/tasks");
  const tasks = await fetchTasks.json();

  return {
    props: {
      tasks: [...tasks],
    },
  };
};
