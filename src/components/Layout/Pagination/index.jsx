import React, { useEffect, useState } from "react";
import useKey from "hooks/use-key-hook";

const nextPage = (curr, max) => {
  return curr < max ? curr + 1 : 1;
};
const prevPage = (curr, max) => {
  const min = 1;
  return curr == min ? max : curr - 1;
};

const Pagination = ({
  children,
  amountPerPage,
  defaultCurrentPage = 1,
  className,
  pageNumbersClassName,
  keysGoPrevious,
  keysGoNext
}) => {
  const [todos, setTodos] = useState(children);
  const [currentPage, setCurrentPage] = useState(defaultCurrentPage);

  // Controls Events
  useKey(
    pressedKey => {
      const maxPage = Math.ceil(todos.length / amountPerPage);
      const prevIndex = prevPage(currentPage, maxPage);
      setCurrentPage(prevIndex);
    },
    { detectKeys: Array.isArray(keysGoPrevious) ? keysGoPrevious : [keysGoPrevious] },
    { dependencies: [currentPage] }
  );
  useKey(
    pressedKey => {
      const maxPage = Math.ceil(todos.length / amountPerPage);
      const nextIndex = nextPage(currentPage, maxPage);
      setCurrentPage(nextIndex);
    },
    { detectKeys: Array.isArray(keysGoNext) ? keysGoNext : [keysGoNext] },
    { dependencies: [currentPage] }
  );
  const handleClick = e => setCurrentPage(Number(e.target.id));

  // Logic for displaying todos
  const indexOfLastTodo = currentPage * amountPerPage;
  const indexOfFirstTodo = indexOfLastTodo - amountPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  const renderTodos = currentTodos.map((todo, index) => (
    <li key={index}>{todo}</li>
  ));

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
      <ul
        className={`pagination-content ${className}`}
        style={{ width: "100%" }}
      >
        {renderTodos}
      </ul>
      <ul className={"page-numbers"}>{renderPageNumbers}</ul>
    </>
  );
};

export default Pagination;
