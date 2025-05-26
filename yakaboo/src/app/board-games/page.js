import { BoardGamesFilters, BoardGamesHeader } from "../../../components/board_games";

export default function BoardGamesPage() {
    return (
        <div className="board-games">
            <BoardGamesHeader />
            <div className="board-games__container">
                <BoardGamesFilters />
            </div>
        </div>
    )
}