'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Endpoints from '../../endpoints';
import { useBookCategoriesModalStore } from '../../states';
import { setActiveButtonStore } from '../../states/BookCategoryActiveButtonStore';

const MainSidebar = () => {
  const { setIsCategoriesModalOpen } = useBookCategoriesModalStore();
  const [sidebars, setSidebars] = useState([]);

  const sidebarItemToActiveButtonIndexMap = {
    "books": 1,
    "ebooks": 2,
    "audiobooks": 3
  }

  const openCategoriesSidebar = (sidebarSlug) => {
    if(sidebarSlug in sidebarItemToActiveButtonIndexMap){
      setActiveButtonStore(sidebarItemToActiveButtonIndexMap[sidebarSlug])
    } else {
      setActiveButtonStore(sidebarItemToActiveButtonIndexMap[0])
    }
    setIsCategoriesModalOpen(true)
  }

  const fetchSidebars = async () => {
    try {
      const cached = localStorage.getItem('sidebars');
      const cachedTime = localStorage.getItem('sidebars_time');

      const now = Date.now();
      const sixHours = 6 * 60 * 60 * 1000;

      if (cached && cachedTime && now - parseInt(cachedTime) < sixHours) {
        const parsedSidebars = JSON.parse(cached);
        setSidebars(parsedSidebars);
        return;
      }

      const res = await fetch(Endpoints.VISIBLE_SIDEBARS);
      const data = await res.json();
      setSidebars(data);

      localStorage.setItem('sidebars', JSON.stringify(data));
      localStorage.setItem('sidebars_time', now.toString());
    } catch (error) {
      console.error('Помилка при отриманні sidebars', error);
    }
  };

  useEffect(() => {
    fetchSidebars();
  }, []);

  return (
    <div className="sidebar">
      <ul className="sidebar__list">
        {sidebars.length > 0 ? (
          sidebars.map((sidebar, i) => (
            !sidebar.is_clickable ? (
              <Link
              key={i}
              className="sidebar__item"
              href={sidebar.link || sidebar.slug}
            >
              <li className="sidebar__point-flex">
                {sidebar.icon && (
                  <Image src={sidebar.icon} alt="" width="18" height="22" />
                )}
                {sidebar.title}
              </li>
            </Link>
            ) : (
              <div className="sidebar__item" key={i}>
                <li className="sidebar__point-flex" onClick={ () => openCategoriesSidebar(sidebar.slug) }>
                  { sidebar.icon && (
                    <Image src={ sidebar.icon } alt="" width="18" height="22" />
                  ) }
                  { sidebar.title }
                </li>
              </div>
            )
          )
        )
        ) : (
          <>
            {[
              ...Array(5).map((_, i) => (
                <li className="loading__text" key={i}></li>
              )),
            ]}
          </>
        )}
      </ul>
    </div>
  );
};

export default MainSidebar  