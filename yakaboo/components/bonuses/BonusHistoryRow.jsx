export const BonusHistoryRow = ({ createdDate, comment, countPlus, countMinus=0, expiredIn=null }) => {
    const cells = {
        "Створено": createdDate,
        "Коментар": comment,
        "Нараховано": countPlus || 0,
        "Списано": countMinus || 0,
        "Спливає": expiredIn || "-"
    }
    
    
    return(
        <div className="bonus-history-row">
            { Object.entries(cells).map(([title, value], index) => (
                <div className="bonus-history-row__cell" key={ index }>
                    <p className="bonus-history-row__cell-title">{ title }</p>
                    <p className="bonus-history-row__cell-value">{ value }</p>
                </div>
            )) }
        </div>
    )

}