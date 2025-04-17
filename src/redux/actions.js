// Action Types
export const ADD_TODO = "ADD_TODO";
export const DEL_TODO = "DEL_TODO";
export const MARK_TODO = "MARK_TODO";
export const EDIT_TODO = "EDIT_TODO";
export const SEARCH_TODO = "SEARCH_TODO";
export const FILTER_TODO = "FILTER_TODO";
export const DELALL_TODO = "DELALL_TODO";
// Action Creators
export const addTodo = (todoInputValue) => {
    return {
        type: ADD_TODO,
        payload: {todoInputValue}
    }
}
export const delTodo = (id) => {
    return {
        type: DEL_TODO,
        payload: {id}
    }
}
export const markTodo = (id) => {
    return {
        type: MARK_TODO,
        payload: {id}
    }
}
export const editTodo = (editInputValue, id) => {
    return {
        type: EDIT_TODO,
        payload: {editInputValue, id}
    }
}
export const searchTodo = (searchInputValue) => {
    return {
        type: SEARCH_TODO,
        payload: {searchInputValue}
    }
}
export const filterTodo = (filterValue) => {
    return {
        type: FILTER_TODO,
        payload: {filterValue}
    }
}
export const delAllTodo = () => {
    return {
        type: DELALL_TODO,
        payload: {}
    }
}