import { useMemo, useState } from "react";
import { useNavigate, useSearchParams as useReactSearchParams } from "react-router-dom";


const useSearchParams = () => {
    const [searchParams, setSearchParams] = useReactSearchParams();
    const [queryString, setQueryString] = useState("")

    const params = useMemo(() => {
        const paramsObject = {};
        searchParams.forEach((value, key) => {
            paramsObject[key] = value;
        });
        return paramsObject;
    }, [searchParams]);

    const setParams = (newParams) => {
      
        // const updatedParams = new URLSearchParams(searchParams); 
        const updatedParams = new URLSearchParams(); 
        Object.keys(newParams).forEach((key) => {
            if(newParams[key] !== undefined && newParams[key] !== null && newParams[key] !== '') {               
                updatedParams.set(key, newParams[key])
            }else {
                updatedParams.delete(key);
            }
        });
    
        setQueryString(updatedParams.toString());
        setSearchParams(updatedParams);
    }

    return [params, setParams, queryString];
}

export default useSearchParams;