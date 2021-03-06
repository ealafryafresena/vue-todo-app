import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default {
  getTodos() {
    return apiClient.get("/todos");
  },
  getTodo(id) {
    return apiClient.get("/todos/" + id);
  },
  postTodo(todo) {
    return apiClient.post("/todos", todo);
  },
  updateTodo(id, status) {
    return apiClient.patch("/todos/" + id, { status });
  },
  editTodo(id, { title, description, priority, updatedAt, status, userId }) {
    return apiClient.patch("/todos/" + id, {
      title,
      description,
      priority,
      updatedAt,
      status,
      userId
    });
  },
  deleteTodo(id) {
    return apiClient.delete("/todos/" + id);
  }
};
