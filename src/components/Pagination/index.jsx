import React, { useState } from 'react';

const Pagination = ({ children,
                   amountPerPage, defaultCurrentPage = 1,
                   className, pageNumbersClassName }) => {
  const [todos, setTodos] = useState(children);
  const [currentPage, setCurrentPage] = useState(defaultCurrentPage);
  const [todosPerPage, setTodosPerPage] = useState(amountPerPage);
  const handleClick = (e) => setCurrentPage(Number(e.target.id));

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
      >
        {number}
      </li>
    ));

  return (
    <>
      <ul className={className} style={{width: "100%"}}>
        {renderTodos}
      </ul>
      <ul id="page-numbers" className={pageNumbersClassName}>
        {renderPageNumbers}
      </ul>
    </>
  );
}

export default Pagination;
