import React, {useEffect, useState} from 'react';

import axios from 'axios';
import {v4 as uuidv4} from 'uuid';
import {BiSearch} from 'react-icons/bi';
import Header from './Header';
import Pagination from './Pagination';

const TrendingGiphy = () => {
  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [search, setSearch] = useState('');
  const [datas, setDatas] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = datas.slice(indexOfFirstItem, indexOfLastItem);

 useEffect(() => {
    const fetchGiphy = async () => {
      setIsLoading(true);
      const results = await axios("https://api.giphy.com/v1/gifs/trending", {
        params: {
          
   api_key: "r4dAgR1xaCizzOLRhF8JHJwjbk6WrWhw",       limit: 50,
        },
      });
      setDatas(results.data.data);
      setIsLoading(false);
    };
    fetchGiphy();
  }, []);

  const renderedGiphys = () => {
    if(isloading) {
      return(
        <div>
        <p>loading..</p>
        </div>
      );
    }
    return currentItems.map((el) => {
      return(
        <div key={uuidv4()} className='giphy__container-el'>
        <img
         src={el.images.fixed_height.url}         
          alt={el.images.fixed_height.url}

          />
        </div>
      )
    })
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };


   const handleSubmit = async (e) => {
      e.preventDefault();
      setIsError(false);
      setIsLoading(true);

      try {
        const results = await axios("https://api.giphy.com/v1/gifs/search", {
          params: {
            api_key: "r4dAgR1xaCizzOLRhF8JHJwjbk6WrWhw",
            q: search,
            limit: 50,
          },
        });
        setSearch('');
        if(results.data.data.length !== 0) {
          setDatas(results.data.data);
          setIsLoading(false);
        } else {
          setIsLoading(false)
          setIsError(true)
        }

      } catch (err) {
        setIsError(true);
        console.log('error')
      }
    };

  const pageSelectionHandler = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  
  return(
    <div className='giphy container-1200'>
    <Header />
      <form className='giphy__form' onSubmit={handleSubmit}>
        <input 
          type='text'
           placeholder='search giphy'
          className='giphy__form--input'
          onChange={handleSearch}
          value={search}

          />
        <button className='giphy__form--submit'>
        <BiSearch />
        </button>
      </form>
      <div className='giphy__pagination'>
      <Pagination
        pageSelectionHandler={pageSelectionHandler}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={datas.length}
        />
      </div>
      <div className='giphy__container'>
        {isError ? (
      <div>
      <p>err</p>
      </div>
        ): (
      renderedGiphys()
        ) }
      </div>
    </div>
  )
}

export default TrendingGiphy;