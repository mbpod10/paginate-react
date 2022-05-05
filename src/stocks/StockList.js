import React, { useState, useRef, useCallback } from 'react'

import useStockPaginate from './useStockPaginate'

const StockList = () => {

  const [pageNumber, setPageNumber] = useState(1)
  const { stocks, loading, error, hasMore } = useStockPaginate(pageNumber)

  const observer = useRef()

  const lastStockElement = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPage => prevPage + 1)
      }
    })
    if (node) observer.current.observe(node)
    // console.log(node)
  }, [loading, hasMore])

  const stockList = stocks.map((stock, index) => {
    if (stocks.length === index + 1) {
      return (
        <div ref={lastStockElement} key={index}>
          <h1>{stock.id}{stock.name} </h1>
        </div>
      )
    }
    else {
      return <div className='block' key={index}> <h1>{stock.id}{stock.name}</h1></div>
    }
  })

  return (
    <>
      <div className='container'>
        <h1>Stocks</h1>
        {stockList}
      </div>
      <div>{error && "Error..."}</div>
      <div>{loading && "Loading..."}</div>
    </>
  )
}

export default StockList