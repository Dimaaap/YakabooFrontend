import { CardsContainer } from '.'

export const HobbiesContainer = ({ hobbiesList }) => {
    return (
        <div className="author__books">
            { hobbiesList.length > 0 && (
                <CardsContainer booksList={ hobbiesList } isHobbies={ true } />
            ) }    
        </div>
    )
}