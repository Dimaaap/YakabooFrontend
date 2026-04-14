import { create } from "zustand"
import { filtersMapping, initialState } from "../site.config"

export const useFilterStore = create(() => ({
    ...initialState,
    selectedFilters: []
}))

export const setArrayFilters = (key, values) => {
    const state = useFilterStore.getState();

    const selected = values.map(v => ({ key, value: v }));
    const current = state.selectedFilters.filter(f => f.key !== key);

    useFilterStore.setState({
        [key]: values,
        selectedFilters: [...current, ...selected]
    });
}

export const setValueFilter = (key, value) => {
    const state = useFilterStore.getState();

    const current = state.selectedFilters.filter(f => f.key !== key)

    let newSelected;

    if(!value){
        newSelected = current;
    } else {
        newSelected = [...current, { key, value }]
    }

    useFilterStore.setState({
        [key]: value,
        selectedFilters: newSelected
    })
}

export const resetFilters = () => {
    useFilterStore.setState(initialState)
    useFilterStore.setState({ selectedFilters: [] })
}

export const fromSearchParams = params => {
    const newState = {}

    for(const [stateKey, queryKey] of Object.entries(filtersMapping)){
        const value = params.get(queryKey);

        if(Array.isArray(initialState[stateKey])){
            newState[stateKey] = value ? value.split(",") : []
        } else if(typeof initialState[stateKey] === "boolean"){
            newState[stateKey] = value === "true"
        } else {
            newState[stateKey] = value ?? ""
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

export const removeFilter = ({ key, value }) => {
    const state = useFilterStore.getState();

    if(Array.isArray(state[key])){
        useFilterStore.setState({
            [key]: state[key].filter(v => v !== value)
        })
    } else if(typeof state[key] === "boolean"){
        useFilterStore.setState({
            [key]: false
        })
    } else {
        useFilterStore.setState({
            [key]: initialState[key]
        })
    }

    useFilterStore.setState({
        selectedFilters: state.selectedFilters.filter(f => !(f.key === key && f.value === value))
    })  
}
