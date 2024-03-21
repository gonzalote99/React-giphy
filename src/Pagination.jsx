import React from 'react';
import {v4 as uuidv4} from 'uuid';


const Pagination = ({
  currentPage,
  itemsPerPage,
  totalItems,
  pageSelectionHandler,
}) => {
  console.log(itemsPerPage, totalItems);
  const pageNumbers = [];
  for(let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return(
    <div className='pagination__container'>
    <ul className='pagination__container--lists'>
      {pageNumbers.map((singlePage) => {
      return(
        <li key={uuidv4()} className='pagination__container--lists-item' >
      <a href='#' onClick={() => { pageSelectionHandler(singlePage);} }>{singlePage}</a>
        </li>
      )
      })}
    </ul>
    </div>
  )
}

export default Pagination;