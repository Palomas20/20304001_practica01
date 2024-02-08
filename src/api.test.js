const request = require("supertest");
const app = require("./api");

// Test the /tasks GET endpoint
test("GET /tasks returns all tasks", async () => {
  const response = await request(app).get("/tasks");
  expect(response.status).toBe(200);
  expect(response.body).toHaveLength(2); // Assuming there are 2 tasks initially
});

test("GET /tasks/:id returns a specific task", async () => {
  const taskId = 1; // Assuming task with ID 1 exists

  const response = await request(app).get(`/tasks/${taskId}`);

  expect(response.status).toBe(200);
  expect(response.body.id).toBe(taskId);
});

test("POST /tasks creates a new task", async () => {
  const newTask = {
    title: "New Task",
    description: "This is a new task.",
  };

  const response = await request(app).post("/tasks").send(newTask);

  expect(response.status).toBe(201); // Assuming 201 for successful creation
  expect(response.body.title).toBe(newTask.title);
  expect(response.body.description).toBe(newTask.description);
});

/*---------------------------------*/
test("PUT /tasks/:id updates a task", async () => {
  const taskId = 1; // Assuming task with ID 1 exists
  const updatedTask = {
    title: "Updated Task",
    description: "This task has been updated.",
  };

  const response = await request(app).put(`/tasks/${taskId}`).send(updatedTask);

  expect(response.status).toBe(200);
  expect(response.body.title).toBe(updatedTask.title);
  expect(response.body.description).toBe(updatedTask.description);
});

test("DELETE /tasks/:id deletes a task", async () => {
  const taskIdToDelete = 1; // Assuming task with ID 1 exists

  const response = await request(app).delete(`/tasks/${taskIdToDelete}`);

  expect(response.status).toBe(204); // Assuming 204 for successful deletion
});
