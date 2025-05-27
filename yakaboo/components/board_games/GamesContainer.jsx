import React from 'react'
import { ProductCard } from '../shared'
import Image from 'next/image'

export const GamesContainer = () => {
  return (
    <div className="games-container">
        <div className="games-container__header">
            <h3 className="games-container__count">
                4161 товар
            </h3>
            <div className="games-container__sorted-by">
                <span>За популярністю</span>
                <Image src="/icons/chevron-down.svg" alt="" width="16" height="16" />
            </div>
        </div>
        <div className="games-container__body">
            <ProductCard brand="" bonusesCount={66} oldPrice={156} newPrice={131} />
            <ProductCard title="Український Їдломарафон" 
            imageSrc='https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/i/m/img342_cr_5.jpg' 
            oldPrice={ 1500 } bonusesCount={ 750 } />
            <ProductCard title="Настільна економічна гра Ranok Creative Монополія (10120186)" 
            brand="Ranok-Creative" oldPrice={ 675 } bonusesCount={ 338 }
            imageSrc='https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/1/_/1_2563.jpg' />
            <ProductCard imageSrc='https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/1/_/1_1511_1.jpg' 
            oldPrice={ 475 } title="Навчальна гра Дорожні знаки" brand="Ranok-Creative"
            bonusesCount={ 225 }
            />
            <ProductCard imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/1/0/10100642_-943-650.jpg" 
            title="Настільна гра. Прокачай свої мізки" oldPrice={ 285 } brand="Ranok-Creative" 
            bonusesCount={ 143 }/>
            <ProductCard imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/1/_/1_result_9_2.jpg" 
            title="Настільна гра Ranok-Creative Тварини на фермі 4 в 1. Методика Монтессорі" 
            brand="Ranok-Creative" oldPrice={ 690 } bonusesCount={ 345 } />
            <ProductCard imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/1/0/10100643_-943-650.jpg" />
        </div>
    </div>
  )
}
