import axios from 'axios'
import { useEffect, useState } from 'react'

const useAxiosFetch = (dataUrl) => {
  const [data, setData] = useState([])
  const [fetchError, setFetchError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
}

export default useAxiosFetch
