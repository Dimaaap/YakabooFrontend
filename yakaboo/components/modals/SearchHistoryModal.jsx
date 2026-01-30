import React from 'react'
import Image from "next/image"
import { useBlockBodyScroll } from '../../hooks'
import { useHistoryStore, useSearchHistoryOpenStore } from '../../states'
import { CookiesWorker } from '../../services'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Endpoints from '../../endpoints'
import { fetcher } from '../../services/fetch.service'

const SearchHistoryModal = () => {

    const { isSearchHistoryModalOpen } = useSearchHistoryOpenStore();
    const { history, setHistory } = useHistoryStore();

    const USER_EMAIL = CookiesWorker.get("email") || null;
    const TWO_MINUTES = 2 * 60 * 1000;

    useBlockBodyScroll(isSearchHistoryModalOpen)

    const queryClient = useQueryClient();

    const { data = [], isLoading } = useQuery({
        queryKey: ["search-history", USER_EMAIL],
        queryFn: () => fetcher(Endpoints.USER_SEARCH_STORY(USER_EMAIL)),
        enabled: !!USER_EMAIL && isSearchHistoryModalOpen,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        staleTime: TWO_MINUTES,
        gcTime: TWO_MINUTES,
        onSuccess: (data) => {
            setHistory(data);
        }

    })

    const clearSearchHistory = () => {
        return fetcher(Endpoints.CLEAR_USER_SEARCH_STORY(USER_EMAIL), {
            method: "PATCH"
        })
    }

    const { mutate: clearHistory, isPending } = useMutation({
        mutationFn: () => clearSearchHistory(),
        onSuccess: () => {
            queryClient.setQueryData(
                ["search-history", USER_EMAIL],
                []
            )
            setHistory([])
        }

    })
  
    return (
    <div className="menu history-modal">
        <div className="menu__content history-modal__content">
            <div className="history-modal__row">
                <p className="history-modal__text">
                    Історія пошуку
                </p>
                <button className="history-modal__btn clear-all-btn"
                type="button" onClick={() => clearHistory()}
                disabled={ isPending }>
                    Очистити
                </button>
            </div>
            { history && history.length > 0 && history.map((item, index) => (
                <div className="history-modal__row search-row" key={ index }>
                    <Image src="/icons/search.svg" alt="" width="18" height="18" />
                    <div className="history-modal__text">
                        { item.term }
                    </div>
                </div>
            )) }
        </div>
    </div>
  )
}

export default SearchHistoryModal