import axios from "axios";
import {Task} from "@/types/tasks";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
})

export const createTask = async (task: Omit<Task, "id">) =>
  (await api.post<Task>('/tasks', task)).data

export const getTasks = async () =>
  (await api.get<Task[]>('/tasks')).data

export const updateTask = async (taskId: string, task: Partial<Task>) =>
  (await api.put<Task>(`/tasks/${taskId}`, task)).data

export const deleteTask = async (taskId: string) =>
  (await api.delete<Task>(`/tasks/${taskId}`)).data