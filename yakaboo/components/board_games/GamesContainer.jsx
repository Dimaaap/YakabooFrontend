import React from 'react'
import { Badge, ProductCard, Stars } from '../shared'
import Image from 'next/image'


const colorsWithCodes = {
    pink: "#ff00c5",
    purple: "rgb(175, 57, 231)",
    darkBlue: "rgb(51, 51, 119)"
}

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
            <ProductCard brand="" bonusesCount={66} oldPrice={156} newPrice={131} 
            badges={[<Stars count={4} isSmaller={ true } />, 
            <span className='product-badge-span' style={{backgroundColor: colorsWithCodes.pink}}>-17%</span>,
            <span className="product-badge-span" style={{background: colorsWithCodes.purple}}>Хіт</span>
            ]}
            />
            <ProductCard title="Український Їдломарафон" 
            imageSrc='https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/i/m/img342_cr_5.jpg' 
            oldPrice={ 1500 } bonusesCount={ 750 } productCode='1500083' />
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
            <ProductCard imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/1/_/1_result_9_2.jpg" 
            title="Настільна гра Ranok-Creative Тварини на фермі 4 в 1. Методика Монтессорі" 
            brand="Ranok-Creative" oldPrice={ 690 } bonusesCount={ 345 } />
            <ProductCard imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/1/0/10100643_-943-650.jpg" />
            <ProductCard imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/1/_/1_result_9_2.jpg" 
            title="Настільна гра Ranok-Creative Тварини на фермі 4 в 1. Методика Монтессорі" 
            brand="Ranok-Creative" oldPrice={ 690 } bonusesCount={ 345 } />
            <ProductCard imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/1/0/10100643_-943-650.jpg" />
            <ProductCard imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/1/_/1_result_9_2.jpg" 
            title="Настільна гра Ranok-Creative Тварини на фермі 4 в 1. Методика Монтессорі" 
            brand="Ranok-Creative" oldPrice={ 690 } bonusesCount={ 345 } />
            <ProductCard imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/1/0/10100643_-943-650.jpg" />
            <ProductCard imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/1/_/1_result_9_2.jpg" 
            title="Настільна гра Ranok-Creative Тварини на фермі 4 в 1. Методика Монтессорі" 
            brand="Ranok-Creative" oldPrice={ 690 } bonusesCount={ 345 } />
            <ProductCard imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/1/0/10100643_-943-650.jpg" />
            <ProductCard imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/1/_/1_result_9_2.jpg" 
            title="Настільна гра Ranok-Creative Тварини на фермі 4 в 1. Методика Монтессорі" 
            brand="Ranok-Creative" oldPrice={ 690 } bonusesCount={ 345 } />
            <ProductCard imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/1/0/10100643_-943-650.jpg" />
            <ProductCard imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/1/_/1_result_9_2.jpg" 
            title="Настільна гра Ranok-Creative Тварини на фермі 4 в 1. Методика Монтессорі" 
            brand="Ranok-Creative" oldPrice={ 690 } bonusesCount={ 345 } />
            <ProductCard imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/1/0/10100643_-943-650.jpg" /><ProductCard imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/1/_/1_result_9_2.jpg" 
            title="Настільна гра Ranok-Creative Тварини на фермі 4 в 1. Методика Монтессорі" 
            brand="Ranok-Creative" oldPrice={ 690 } bonusesCount={ 345 } />
            <ProductCard imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/1/0/10100643_-943-650.jpg" />
            <ProductCard imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/1/_/1_result_9_2.jpg" 
            title="Настільна гра Ranok-Creative Тварини на фермі 4 в 1. Методика Монтессорі" 
            brand="Ranok-Creative" oldPrice={ 690 } bonusesCount={ 345 } />
            <ProductCard imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/1/0/10100643_-943-650.jpg" />
            <ProductCard imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/1/_/1_result_9_2.jpg" 
            title="Настільна гра Ranok-Creative Тварини на фермі 4 в 1. Методика Монтессорі" 
            brand="Ranok-Creative" oldPrice={ 690 } bonusesCount={ 345 } />
            <ProductCard imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/1/0/10100643_-943-650.jpg" />
            <ProductCard imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/1/_/1_result_9_2.jpg" 
            title="Настільна гра Ranok-Creative Тварини на фермі 4 в 1. Методика Монтессорі" 
            brand="Ranok-Creative" oldPrice={ 690 } bonusesCount={ 345 } />
            <ProductCard imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/1/0/10100643_-943-650.jpg" />
            <ProductCard imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/1/_/1_result_9_2.jpg" 
            title="Настільна гра Ranok-Creative Тварини на фермі 4 в 1. Методика Монтессорі" 
            brand="Ranok-Creative" oldPrice={ 690 } bonusesCount={ 345 } />
            <ProductCard imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/1/0/10100643_-943-650.jpg" />
            <ProductCard imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/1/_/1_result_9_2.jpg" 
            title="Настільна гра Ranok-Creative Тварини на фермі 4 в 1. Методика Монтессорі" 
            brand="Ranok-Creative" oldPrice={ 690 } bonusesCount={ 345 } />
            <ProductCard imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/1/0/10100643_-943-650.jpg" />
            <ProductCard imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/1/_/1_result_9_2.jpg" 
            title="Настільна гра Ranok-Creative Тварини на фермі 4 в 1. Методика Монтессорі" 
            brand="Ranok-Creative" oldPrice={ 690 } bonusesCount={ 345 }
            badges={[ 
            <span className="product-badge-span" style={{background: colorsWithCodes.darkBlue}}>Кешбек</span>
            ]}
            />
            <ProductCard imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/1/0/10100643_-943-650.jpg" 
            badges={[ 
            <span className="product-badge-span" style={{background: colorsWithCodes.darkBlue}}>Кешбек</span>
            ]}/>
            <ProductCard imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/1/_/1_result_9_2.jpg" 
            title="Настільна гра Ranok-Creative Тварини на фермі 4 в 1. Методика Монтессорі" 
            brand="Ranok-Creative" oldPrice={ 690 } bonusesCount={ 345 } 
            badges={[ 
            <span className="product-badge-span" style={{background: colorsWithCodes.darkBlue}}>Кешбек</span>
            ]}
            />
            <ProductCard imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/1/0/10100643_-943-650.jpg" /><ProductCard imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/1/_/1_result_9_2.jpg" 
            title="Настільна гра Ranok-Creative Тварини на фермі 4 в 1. Методика Монтессорі" 
            brand="Ranok-Creative" oldPrice={ 690 } bonusesCount={ 345 } />
            <ProductCard imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/1/0/10100643_-943-650.jpg" />
        </div>
        <div className="games-container__pagination">
            <button className="games-container__show-more">
                Показати більше товарів
            </button>
            <div className="games-container__pagination-btns">
                <button className="games-container__pagination-btn arrow-pagination disabled">
                    <Image src="/icons/left.svg" alt="" width="18" height="18" />
                </button>

                <div className="games-container__pagination-nums">
                    <button className="games-container__pagination-btn numeric-pagination is-active">
                        1
                    </button>
                    <button className="games-container__pagination-btn numeric-pagination">
                        2
                    </button>
                    <button className="games-container__pagination-btn numeric-pagination">
                        3
                    </button>
                    <button className="games-container__pagination-btn numeric-pagination">
                        4
                    </button>
                    <button className="games-container__pagination-btn numeric-pagination">
                        5
                    </button>
                    <button className="games-container__pagination-btn numeric-pagination">
                        6
                    </button>
                    <button className="games-container__pagination-btn numeric-pagination">
                        7
                    </button>
                    <button className="games-container__pagination-btn numeric-pagination">
                        ...
                    </button>
                    <button className="games-container__pagination-btn numeric-pagination">
                        84
                    </button>
                </div>

                <button className="games-container__pagination-btn arrow-pagination">
                    <Image src="/icons/right.svg" alt="" width="18" height="18" />
                </button>
            </div>
        </div>
    </div>
  )
}
