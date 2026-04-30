"use client"

import { useQuery } from '@tanstack/react-query'
import React from 'react'
import Endpoints from '../../endpoints'
import { STALE_TIME } from '../../site.config'
import { fetcher } from '../../services/fetch.service'

const AdditionalInfo = () => {

  const { data: text, error } = useQuery({
    queryKey: ["additionalText"],
    queryFn: () => fetcher(Endpoints.ADDITIONAL_TEXT),
    keepPreviousData: true,
    staleTime: STALE_TIME,
    gcTime: STALE_TIME,
    refetchOnWindowFocus: false
  })

  if(error) {
    return null;
  }

  return (
    <div className="add-info">
        <h5 className="add-info__title">
            Інтернет-магазин книг YAKABOO
        </h5>
        <div dangerouslySetInnerHTML={{__html: text?.text }}></div>
    </div>
  )
}

export default AdditionalInfo

