import { useState } from "react"


const useFetch = async (url) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    try {
        setIsLoading(true)
        const response = await fetch(url);
        
        if(!response.ok) {
            setError(response?.statusText)
            throw new Error(response?.statusText)
        }
        const result = await response.json();
        setData(result);
    } catch (error) {
        setError(error?.message)
        throw new Error(error?.message)
    } finally {
        setIsLoading(false)
    }

    return { isLoading, error, data, }
}

export default useFetch;