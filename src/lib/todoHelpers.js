import moment from 'moment';

/**
 * @function addToDo
 * @description adding todo to list
 * @param list {array}
 * @param item {object}
 */
export const addToDo = (list, item) => [...list, item];

/**
 * @function generateNumber
 * @description generating random number
 */
export const generateNumber = () => Math.floor(Math.random() * 100000);

/**
 * @function findById
 * @description get item by id from list
 * @param id {number}
 * @param list {array}
 */
export const findById = (id, list) => list.find(item => item.id === id);

/**
 * @function toggleTodo
 * @description set todo isComplete value
 * @param todo
 */
export const toggleTodo = (todo) => ({...todo, isComplete: !todo.isComplete});

/**
 * @function updateTodo
 * @description update todo data
 * @param list {array}
 * @param updated {object}
 * @return {array}
 */
export const updateTodo = (list, updated) => {
    const updatedIndex = list.findIndex(item => item.id === updated.id);
    return [
        ...list.slice(0, updatedIndex),
        updated,
        ...list.slice(updatedIndex + 1)
    ]
};

/**
 * @function removeTodo
 * @description remove todo from list
 * @param list {array}
 * @param id {number}
 * @returns {array}
 */
export const removeTodo = (list, id) => {
    const removeIndex = list.findIndex(item => item.id === id);
    return [
        ...list.slice(0, removeIndex),
        ...list.slice(removeIndex + 1)
    ]
};

/**
 * @function filterTodos
 * @description filter list of todos
 * @param list {array}
 * @param route {string}
 * @returns {array}
 */
export const filterTodos = (list, route) => {
    const currentDate = moment().format('LL');
    switch (route) {
        case '/active':
            if (!list.filter(item => !item.isComplete).length) {
                return [];
            } else {
                return list.filter(item => !item.isComplete);
            }
        case '/complete':
            if (!list.filter(item => item.isComplete).length) {
                return [];
            } else {
                return list.filter(item => item.isComplete);
            }
        case '/today':
            return list.filter(item => moment(item.startDate).format('LL') === currentDate);
        case '/other':
            return list.filter(item => moment(item.startDate).format('LL') !== currentDate);
        default:
            return list;
    }
};