import React, { useState, useRef, useCallback } from 'react'

import useBookSearch from './useBookSearch'
const TitleList = () => {
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)

  const { books, loading, error, hasMore } = useBookSearch(query, pageNumber)

  const observer = useRef()

  const lastBookElement = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPage => prevPage + 1)
      }
    })
    if (node) observer.current.observe(node)
    console.log(node)
  }, [loading, hasMore])

  const handleSearch = (event) => {
    setQuery(event.target.value)
    setPageNumber(1)
  }


  const bookArray = books.map((book, index) => {
    if (books.length === index + 1) {
      return <div ref={lastBookElement} className='block' key={book}>{book}</div>
    }
    else {
      return <div className='block' key={book}>{book}</div>
    }
  })

  console.log(books.length)

  return (
    <div className='container'>
      <input type='text' value={query} onChange={handleSearch} />
      {bookArray}
      <div>{loading && 'Loading...'}</div>
      <div>{error && 'Error...'}</div>

    </div>
  );
}


export default TitleList