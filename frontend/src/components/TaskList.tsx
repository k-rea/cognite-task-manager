import React from "react";
import { Task } from "@/types/tasks";

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, task: Partial<Task>) => void;
}

export const TaskList = ({ tasks, onDelete, onUpdate}: TaskListProps) => {
  return (
    <ul>
      {tasks.map((task)=> (
        <li key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>カテゴリ: {task.category}</p>
          <p>締め切り: {task.dueDate}</p>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onUpdate(task.id, { completed: !task.completed })}
          />
          <button onClick={() => onDelete(task.id)}>削除</button>
        </li>
      ))}
    </ul>
  )
}