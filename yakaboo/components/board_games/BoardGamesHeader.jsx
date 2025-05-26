import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const BoardGamesHeader = () => {
  return (
    <div className="board-games__header">
        <h3 className="board-games__header-title">
            Настільні ігри
        </h3>  
        <div className="board-games__header-categories">
            <Link className="board-games__header-category game-category" href="#">
                <div className="game-category__image-container">
                    <Image src="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/s/c/screenshot_at_mar_30_16-34-00.png" 
                    alt="" className="game-category__image" width="70" height="50" />
                    <Image src="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/5/3/53370_box1_2_1.jpg" 
                    alt="" className="game-category__image" width="70" height="100" />
                    <Image src="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/1/8/18_90.jpg" 
                    alt="" className="game-category__image" width="70" height="50" />  
                </div>
                <p className="game-category__title">
                    Настільні ігри
                </p>
            </Link>

            <Link className="board-games__header-category game-category" href="#">
                <div className="game-category__image-container">
                    <Image src="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/2/5/25_5_608.jpg" 
                    alt="" className="game-category__image" width="70" height="50" />
                    <Image src="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/5/_/5_95_123.jpg" 
                    alt="" className="game-category__image" width="70" height="100" />
                    <Image src="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/1/0/10_57_49.jpg" 
                    alt="" className="game-category__image" width="70" height="50" />
                </div>
                <p className="game-category__title">
                    Пазли
                </p>
            </Link>

            <Link className="board-games__header-category game-category" href="#">
                <div className="game-category__image-container">
                    <Image src="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/7/_/7_79_63.jpg" 
                    alt="" className="game-category__image" width="70" height="50" />
                    <Image src="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/2/2/22233191_images_218798126.jpg" 
                    alt="" className="game-category__image" width="70" height="100" />
                    <Image src="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/2/2/22233443_images_218798797.jpg" 
                    alt="" className="game-category__image" width="70" height="50" />
                </div>
                <p className="game-category__title">
                    Головоломки
                </p>
            </Link>
        </div>
    </div>
  )
}

