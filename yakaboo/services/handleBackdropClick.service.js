export const handleBackdropClick = (e, setterMethod) => {
        if (e.target === e.currentTarget){
            setterMethod(false);
        }
    }