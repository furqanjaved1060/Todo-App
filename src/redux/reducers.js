import { ADD_TODO, DEL_TODO, DELALL_TODO, EDIT_TODO, FILTER_TODO, MARK_TODO, SEARCH_TODO } from "./actions"

const initialState = {
    todoArray: [],
    filter: "ALL",
    searchTerm: ""
}

export const todoReducer = (state=initialState, action) => {

    switch(action.type) {
        case ADD_TODO:
            return {
                ...state,
                todoArray: [...state.todoArray, {text: action.payload.todoInputValue, completed: false, id: Date.now()}]
            }
        case DEL_TODO:
            return {
                ...state,
                todoArray: state.todoArray.filter((curTodo) => curTodo.id !== action.payload.id)
            }
        case MARK_TODO:
        return {
            ...state,
            todoArray: state.todoArray.map((curTodo) => curTodo.id == action.payload.id ? {...curTodo, completed: !curTodo.completed} : curTodo)
        }
        case EDIT_TODO:
            return {
                ...state,
                todoArray: state.todoArray.map((curTodo) => curTodo.id == action.payload.id ? {...curTodo, text: action.payload.editInputValue} : curTodo)
            }
        case SEARCH_TODO:
            return {
                ...state,
                searchTerm: action.payload.searchInputValue
            }
        case FILTER_TODO:
            return {
                ...state,
                filter: action.payload.filterValue
            }
        case DELALL_TODO:
        return {
            ...state,
            todoArray: [] 
        }
        default: return state;
    }
}
