import { create } from "zustand"
import { filtersMapping, initialState } from "../site.config"

export const useFilterStore = create(() => ({
    ...initialState,
    selectedFilters: []
}))

export const setArrayFilters = (key, values) => {
    useFilterStore.setState({ [key]: values })

    const selected = values.map(v => ({key, value: v}))
    const current = useFilterStore.getState().selectedFilters.filter(f => f.key !== key)
    useFilterStore.setState({ selectedFilters: [...current, ...selected] })
}

export const setValueFilter = (key, value) => {
    useFilterStore.setState({ [key]: value })

    const current = useFilterStore.getState().selectedFilters.filter(f => f.key !== key)

    if(typeof value === "boolean"){
        if(value){
            useFilterStore.setState({selectedFilters: [...current, { key, value }]})
        } else {
            useFilterStore.setState({ selectedFilters: current })
        }
    } else if(value){
        useFilterStore.setState({ selectedFilters: [...current, { key, value }] })
    } else {
        useFilterStore.setState({ selectedFilters: current })
    }
}

export const resetFilters = () => {
    useFilterStore.setState(initialState)
    useFilterStore.setState({ selectedFilters: [] })
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

    const selected = Object.entries(newState).flatMap(([key, value]) => {
        if(Array.isArray(value)){
            return value.map(v => ({key, value: v}))
        } else if(typeof value === "boolean" && value){
            return [{key, value}]
        } else if(value){
            return [{key, value}]
        } else {
            return []
        }
    })

    useFilterStore.setState({ selectedFilters: selected })
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