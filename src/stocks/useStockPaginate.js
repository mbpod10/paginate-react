import { useEffect, useState } from 'react'
import axios from 'axios'

const useStockPaginate = (pageNumber) => {
  const [stocks, setStocks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(false)
    axios.get(`http://localhost:4001/stocks/list/page/${pageNumber}`)
      .then(response => {
        setStocks(prevStocks => {
          return [...new Set([...prevStocks, ...response.data])]
        })
        console.log(response.data)
        setHasMore(response.data.length === 10)
        setLoading(false)
      }).catch(error => {
        console.log(error)
        setError(error)
      })
    return () => { }
  }, [pageNumber])
  return { stocks, loading, error, hasMore }
}

export default useStockPaginate