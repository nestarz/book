import React, { useEffect, useState } from 'react';
import { useKeyPress } from "react-use";

const nextPage = (curr, max) => {
  return curr < max ? curr + 1 : 1
}
const prevPage = (curr, max) => {
  const min = 1;
  return curr == min ? max : curr - 1
}

const Pagination = ({ children,
  amountPerPage, defaultCurrentPage = 1,
  className, pageNumbersClassName,
  keysGoPrevious,
  keysGoNext }) => {
  const [todos, setTodos] = useState(children);
  const [currentPage, setCurrentPage] = useState(defaultCurrentPage);

  // Controls Events
  const hasPressedPrevious = useKeyPress(keysGoPrevious);
  const hasPressedNext = useKeyPress(keysGoNext);
  const handleClick = (e) => setCurrentPage(Number(e.target.id));
  useEffect(() => {
    const maxPage = Math.ceil(todos.length / amountPerPage);
    const prevIndex = prevPage(currentPage, maxPage);
    setCurrentPage(prevIndex);
  }, [hasPressedPrevious])
  useEffect(() => {
    const maxPage = Math.ceil(todos.length / amountPerPage);
    const nextIndex = nextPage(currentPage, maxPage);
    setCurrentPage(nextIndex);
  }, [hasPressedNext]);

  // Logic for displaying todos
  const indexOfLastTodo = currentPage * amountPerPage;
  const indexOfFirstTodo = indexOfLastTodo - amountPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  const renderTodos = currentTodos.map((todo, index) => (
    <li key={index} >{todo}</li>)
  );

  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(todos.length / amountPerPage); i++) {
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
      <ul className={`pagination-content ${className}`} style={{ width: "100%" }}>
        {renderTodos}
      </ul>
      <ul className={"page-numbers"}>
        {renderPageNumbers}
      </ul>
    </>
  );
}

export default Pagination;
