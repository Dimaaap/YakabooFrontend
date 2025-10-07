const statusClassMap = {
    "Читач": "pink-status",
    "Знавець": "blue-status",
    "Ерудит": "green-status",
    "Геній": "purple-status"
}


export const StatusBadge = ({status}) => {
    return(
        <div className={`status ${statusClassMap[status]}`}>
            { status }
        </div>
    ) 
}