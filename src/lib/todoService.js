const baseUrl = 'http://localhost:8080/';

/**
 * @function loadTodos
 * @description return todos from database
 * @returns {Promise.<TResult>}
 */
export const loadTodos = () => {
    return fetch(baseUrl + 'todos').then(response => response.json());
};

/**
 * @function createTodo
 * @description create todo
 * @param todo {object}
 * @returns {Promise.<TResult>}
 */
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

/**
 * @function saveTodo
 * @description update todo data
 * @param todo {object}
 * @returns {Promise.<TResult>}
 */
export const saveTodo = (todo) => {
    return fetch(`${baseUrl}todos/${todo.id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    }).then(response => response.json());
};

/**
 * @function destroyTodo
 * @description delete todo from database
 * @param id {number}
 * @returns {Promise.<TResult>}
 */
export const destroyTodo = (id) => {
    return fetch(`${baseUrl}todos/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
};
