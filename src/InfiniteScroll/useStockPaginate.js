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

    const makeAPICall = async () => {
      await axios.get(`http://localhost:4001/stocks/list/page/${pageNumber}`)
        .then(response => {
          setStocks(prevStocks => {
            if (prevStocks.length && response.data.stocks.length && prevStocks[0].id === response.data.stocks[0].id) {
              return prevStocks
            }
            else {
              return [...new Set([...prevStocks, ...response.data.stocks])]
            }
          })
          setHasMore(response.data.stocks.length > 0)
          setLoading(false)

        }).catch(error => {
          console.log(error)
          if (axios.isCancel(error)) return
          setError(error)
        })
    }
    makeAPICall()
  }, [pageNumber])

  return { stocks, loading, error, hasMore }
}

export default useStockPaginate