import { create } from "zustand"
import { filtersMapping, initialState } from "../site.config"

export const useFilterStore = create(() => ({
    ...initialState
}))

export const setArrayFilters = (key, values) => {
    useFilterStore.setState({ [key]: values })
}

export const setValueFilter = (key, value) => {
    useFilterStore.setState({ [key]: value })
}

export const resetFilters = () => {
    useFilterStore.setState(initialState)
}

export const fromSearchParams = params => {
    const newState = {}

    for(const [stateKey, queryKey] of Object.entries(filtersMapping)){
        if(Array.isArray(initialState[stateKey])){
            newState[stateKey] = params.get(queryKey)?.split(",") ?? []
        } else if(typeof initialState[stateKey] === "boolean"){
            newState[stateKey] = params.get(queryKey) === "true"
        } else {
            newState[stateKey] = params.get(queryKey) ?? ""
        }
    }

    useFilterStore.setState(newState)
}

export const toQueryString = () => {
    const state = useFilterStore.getState()
    const queryParams = new URLSearchParams()
    
    for(const [stateKey, queryKey] of Object.entries(filtersMapping)){
        const value = state[stateKey]

        if(Array.isArray(value) && value.length){
            queryParams.append(queryKey, value.join(","))
        } else if(typeof value === "boolean" && value){
            queryParams.append(queryKey, "true")
        } else if(typeof value === "string" && value){
            queryParams.append(queryKey, value)
        }
    }

    return queryParams.toString();
}