"use client"

import { BoardGamesFilters, BoardGamesHeader, GamesContainer } from "../board_games"
import { DescriptionText } from "../dynamic"


export function BoardGamesClient() {
    return(
        <div className="board-games">
            <BoardGamesHeader />
            <div className="board-games__container">
                <BoardGamesFilters />
                <GamesContainer />
            </div>
            <DescriptionText />
        </div>
    )
}