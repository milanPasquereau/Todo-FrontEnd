import { rest } from 'msw'

function getTodos() {
    return rest.get('http://localhost:8080/todos', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([])
        );
    });
}

function saveTodo() {
    return rest.post('http://localhost:8080/todos/', async (req, res, ctx) => {
        const todo = await req.json();
        return res(
            ctx.status(200),
            ctx.json({
                id: 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
                title: todo.title,
                completed: false,
                order: 1,
                url: "http://localhost:8080/todos/f79e82e8-c34a-4dc7-a49e-9fadc0979fda"
            })
        );
    });
}

function checkTodo() {
    return rest.patch('http://localhost:8080/todos/:todoId', async (req, res, ctx) => {
        const todoCompleted = (await req.json()).completed;
        return res(
            ctx.status(200),
            ctx.json({
                id: req.params.todoId,
                title: 'Premier todo',
                completed: todoCompleted,
                order: 1,
                url: 'http://localhost:8080/todos/f79e82e8-c34a-4dc7-a49e-9fadc0979fda'
            })
        );
    });
}

function updateTodo() {
    return rest.patch('http://localhost:8080/todos/:todoId', async (req, res, ctx) => {
        const todo = await req.json();

        return res(
            ctx.status(200),
            ctx.json({
                id: req.params.todoId,
                title: todo.title,
                completed: todo.completed,
                order: todo.order,
                url: 'http://localhost:8080/todos/'+req.params.todoId
            })
        );
    });
}

function removeTodo() {
    return rest.delete('http://localhost:8080/todos/:todoId', (req, res, ctx) => {
        return res(
            ctx.status(204),
        );
    });
}

export const handlers = [saveTodo(), getTodos(), checkTodo(), updateTodo(), removeTodo()]