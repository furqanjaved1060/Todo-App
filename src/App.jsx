import { useState } from 'react';
import './App.css'
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, delAllTodo, delTodo, editTodo, filterTodo, markTodo, searchTodo } from './redux/actions';
import { MdDelete, MdEdit } from 'react-icons/md';

function App() {

  // General
  const dispatch = useDispatch();
  const todoArray = useSelector((state) => {
    if (state.filter==="ALL") {
      return state.todoArray.filter((curTodo) => curTodo.text.toLowerCase().includes(state.searchTerm.toLowerCase()));
    }
    if (state.filter==="COMPLETED") {
      return state.todoArray.filter((curTodo) => curTodo.completed && curTodo.text.toLowerCase().includes(state.searchTerm.toLowerCase()));
    }
    if (state.filter==="INCOMPLETE") {
      return state.todoArray.filter((curTodo) => !curTodo.completed && curTodo.text.toLowerCase().includes(state.searchTerm.toLowerCase()));
    }
  })
  // General

  // ADD_TODO
  const [todoInputValue, setTodoInputValue] = useState("");
  
  const handleTodoInputSubmit = (e) => {
    e.preventDefault();
    todoInputValue.trim() ? dispatch(addTodo(todoInputValue.trim().split(" ").filter((curWord) => curWord !== "").join(" "))) : alert("Add a Todo")
    setTodoInputValue("");
  }
  // ADD_TODO

  // DEL_TODO
  const handleDelBtn = (id) => {
    dispatch(delTodo(id));
  }
  // DEL_TODO

  // MARK_TODO
  const handleMarkBtn = (id) => {
    dispatch(markTodo(id));
  }
  // MARK_TODO

  // EDIT_TODO
  const [todoBeingEditedIndex, setTodoBeingEditedIndex] = useState(null);
  const [editInputValue, setEditInputValue] = useState("");

  const handleEditBtn = (curTodo) => {
    setTodoBeingEditedIndex(curTodo.id);
    setEditInputValue(curTodo.text);
  }

  const handleCancelEditBtn = () => setTodoBeingEditedIndex(null);

  const handleEditInputSubmit = (e, id) => {
    e.preventDefault();
    editInputValue.trim() ? dispatch(editTodo(editInputValue.trim().split(" ").filter((curWord) => curWord !== "").join(" "), id)) : alert("Please add a Value");
    setEditInputValue("");
    setTodoBeingEditedIndex(null);
  }
  // EDIT_TODO

  // SEARCH
  const [searchInputValue, setSearchInputValue] = useState("");

  const handleSearchInputSubmit = (e) => {
    e.preventDefault();
  }

  const handleSearchInputChange = (e) => {
    setSearchInputValue(e.target.value);
    dispatch(searchTodo(e.target.value.trim()));

  }
  // SEARCH

  // FILTER
  const handleFilterChange = (e) => {
    dispatch(filterTodo(e.target.value));
  }
  // FILTER

  // DELALL_TODO
  const handleDelAllBtn = () => {
    dispatch(delAllTodo());
  }
  // DELALL_TODO

  return (
    <>
    <main className="main-container">
      <h1 className='h1'>ToDo APP</h1>
      {/* ADD_TODO */}
      <form onSubmit={(e) => handleTodoInputSubmit(e)} className='todo-input-form'>
        <input 
        type="text"
        name='todoInput'
        id='todoInput'
        className='todo-input'
        placeholder='Add Todo'
        autoComplete='off'
        value={todoInputValue}
        onChange={(e) => setTodoInputValue(e.target.value)}/>
        <button type='submit' className='todo-input-btn'>Add</button>
      </form>
      {/* ADD_TODO */}
      <div className="filter-search-container">
        {/* FILTER */}
        <select name="selectFilter" id="select-filter" onChange={(e) => handleFilterChange(e)} className='select-filter'>
          <option value="ALL">Default</option>
          <option value="COMPLETED">Completed</option>
          <option value="INCOMPLETE">Incomplete</option>
        </select>
        {/* FILTER */}
        {/* SEARCH */}
        <form onSubmit={(e) => handleSearchInputSubmit(e)} className='search-input-form'>
          <input 
          type='text'
          name='searchInput'
          id='searchInput'
          className='search-input'
          placeholder='Search'
          autoComplete='off'
          value={searchInputValue}
          onChange={(e) => handleSearchInputChange(e)}/>
        </form>
        {/* SEARCH */}
      </div>
      <ul className='todo-list-ul'>
        {todoArray.map((curTodo, curTodoIndex) => {
          return (
            <li key={curTodo.id} className='todo-list-li' style={todoBeingEditedIndex===curTodo.id ? {alignItems: 'flex-start'} : {alignItems: 'center'}}>
              {!(todoBeingEditedIndex===curTodo.id) ? 
                !curTodo.completed ? <p>{curTodoIndex+1}. {curTodo.text}</p> : <p>{curTodoIndex+1}. <s>{curTodo.text}</s></p>
                :
                <>
                {/* EDIT_TODO */}
                <form onSubmit={(e) => handleEditInputSubmit(e, curTodo.id)} className='edit-input-form'>
                  <input 
                  type='text'
                  name='editInput'
                  id='editInput'
                  className='edit-input'
                  autoComplete='off'
                  value={editInputValue}
                  onChange={(e) => setEditInputValue(e.target.value)}/>
                  <div className="edit-buttons">
                    <button type='submit' className='li-btns'>Confirm</button>
                    <button type='button' className='li-btns' onClick={() => handleCancelEditBtn()}>Cancel</button>
                  </div>
                </form>
                {/* EDIT_TODO */}
                </>              
              }          
              <div className="list-buttons">
                {/* DEL_TODO */}
                <MdDelete onClick={() => handleDelBtn(curTodo.id)} className='li-icons'/>
                {/* DEL_TODO */}
                {/* MARK_TODO */}
                <button onClick={() => handleMarkBtn(curTodo.id)} className='li-btns'>{!curTodo.completed ? "Mark" : "Unmark"}</button>
                {/* MARK_TODO */}
                {/* EDIT_TODO */}
                <MdEdit onClick={() => handleEditBtn(curTodo)} className='li-icons'/>
                {/* EDIT_TODO */}
              </div>
            </li>
          )
        })}
      </ul>
      {/* DELALL_TODO */}
      {todoArray.length !== 0 ?
      <button onClick={() => handleDelAllBtn()} className='del-all-btn'>Delete All</button>
      :
      null}
      {/* DELALL_TODO */}
    </main>
    </>
  )
}
export default App;