import React from 'react'
import { AdditionalInfo, Banner, BooksContainer, MainHeader, MainSidebar } from '.'
import { Footer } from '../shared'

export const MainContainer = () => {
  return (
    <div className="main-container">
      <div className="main-container__top">
        <MainSidebar />
        <div className="main-container__right">
          <MainHeader />
          <Banner />
          <BooksContainer />
          <AdditionalInfo />
        </div>  
      </div>
      <Footer />
    </div>
  )
}
