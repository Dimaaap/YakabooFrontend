'use client';

import React, { useState, useEffect } from 'react';
import { fetchData } from '../../services';
import Link from 'next/link';

export const DataContainer = ({ letter }) => {
  const [publishings, setPublishings] = useState([]);

  useEffect(() => {
    fetchData(
      `http://localhost:8003/publishing/first-letter/${letter}`,
      setPublishings
    );
  }, [letter]);

  return (
    <div className="data">
      <div className="data__container">
        {publishings &&
          publishings.map((pub) => (
            <Link href={`book_publisher/view/${pub.slug}`} key={pub.id}>
              {pub.title}
            </Link>
          ))}
      </div>
    </div>
  );
};
