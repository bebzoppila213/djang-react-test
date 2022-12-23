import axios from "axios";
import { useEffect, useState } from "react";


const generateheaders = (token: string = '') => {
    if(token.length > 0){
        return {'Authorization': `token ${token}`,}
    }
    return {}
}

type AxiosConfig = {
    method: string,
    url: string,
    headers: {
        Authorization: string;
    },
    data?: any
}

const getnerateAxiosConfig = (url: string, method: "get" | "post",  token = '', data: any, params = {}) => {
    let config = {method: method, url: url, headers: generateheaders(token), params: params} as AxiosConfig
    if(method=== 'post'){
        config.data = data
    }
    return config
}

type UseFetchReturn<T> = [data: T, errors: boolean, isLoading: boolean]

export default function useFetch<T> (defaultState:T, url: string, method: "get" | "post", token = '', bodyRequest?: any, params = {}): UseFetchReturn<T>{
    const [data, setData] = useState<T>(defaultState)
    const [errors, setErrors] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const loadData = async () => {
        setIsLoading(false)
        const response = await axios(getnerateAxiosConfig(url, method, token, bodyRequest, params))
        setData(response.data)
        setIsLoading(true)
        
    }

    useEffect(() => {
        loadData()
    },[])

    return [data, errors, isLoading]
}