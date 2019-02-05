import React, { useState, useEffect } from 'react';
import { useShortcutEffect } from 'use-shortcut';

const nextPage = (curr, max) => {
  return curr < max ? curr + 1 : 1
}
const prevPage = (curr, min = 1) => {
  return curr == min ? 1 : curr - 1
}

const Pagination = ({ children,
                   amountPerPage, defaultCurrentPage = 1,
                   className, pageNumbersClassName,
                   keysGoPrevious,
                   keysGoNext }) => {
  const [todos, setTodos] = useState(children);
  const [currentPage, setCurrentPage] = useState(defaultCurrentPage);
  const [todosPerPage, setTodosPerPage] = useState(amountPerPage);

  // Controls Events
  const handleClick = (e) => setCurrentPage(Number(e.target.id));
  useShortcutEffect(() => {
    const prevIndex = prevPage(currentPage);
    setCurrentPage(prevIndex);
  }, keysGoPrevious)
  useShortcutEffect(() => {
    const nextIndex = nextPage(currentPage, Math.ceil(todos.length / todosPerPage));
    setCurrentPage(nextIndex);
  }, keysGoNext);

  // Logic for displaying todos
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  const renderTodos = currentTodos.map((todo, index) => (
    <li key={index} >{todo}</li>)
    );

  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map(number => (
      <li
        key={number}
        id={number}
        onClick={handleClick}
        className={number == currentPage ? "active" : ""}
      >
        {number}
      </li>
    ));

  return (
    <>
      <ul className={className} style={{width: "100%"}}>
        {renderTodos}
      </ul>
      <ul className={"page-numbers"}>
        {renderPageNumbers}
      </ul>
    </>
  );
}

export default Pagination;
