"use client"

import { BoardGamesFilters, BoardGamesHeader, GamesContainer } from "../board_games"
import { DescriptionText } from "../dynamic"
import { CardsContainer } from "../shared"


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