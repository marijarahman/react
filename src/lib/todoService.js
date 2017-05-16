const baseUrl = 'http://localhost:8080/';

export const loadTodos = () => {
    return fetch(baseUrl + 'todos').then(response => response.json());
};

export const createTodo = (todo) => {
    return fetch(baseUrl + 'todos', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    }).then(response => response.json());
};

export const saveTodo = (todo) => {
    return fetch(`${baseUrl}/todos/${todo.id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    }).then(response => response.json());
};

export const destroyTodo = (id) => {
    return fetch(`${baseUrl}todos/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
};
