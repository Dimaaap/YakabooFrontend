import React from 'react'
import { Banner, BooksContainer, MainHeader, MainSidebar } from '.'

export const MainContainer = () => {
  return (
    <div className="container main-container">
      <MainSidebar />
      <div className="main-container__right">
        <MainHeader />
        <Banner />
        <BooksContainer />
      </div>
    </div>
  )
}
