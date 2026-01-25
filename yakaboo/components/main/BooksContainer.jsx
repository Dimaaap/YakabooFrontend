import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Badge, BookInfoBadge, CommentsCount, ProductCard, Stars, TopBadge } from '../shared'

const BooksContainer = () => {
  return (
    <div className="categories">
        <div className="books-container">
            <div className="books-container__section">
                <div className="books-container__header">
                    <h3 className="books-container__title">
                        Новинки книг
                    </h3>
                    <Link className="books-container__title-link" href="#">
                        <span>
                            Показати все 
                            <Image src="icons/chevron-down.svg" width="15" height="15" alt="" />
                        </span>
                    </Link>    
                </div>
                <div className="books-container__slider">
                    <button className="books-container__btn prev-btn visually-hidden" type="btn">
                        <Image src="/icons/arrow-left.svg" width="30" height="30" alt="" />
                    </button>
                    <div className="books-container__slider book-slider">
                        <ProductCard title="Чорти" brand="Джо Аберкромбі" 
                        imageSrc='https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/9/7/978-617-8383-94-7_cr.jpg'
                        badges={[<Stars count={0} isSmaller={true} />, <CommentsCount />,  <Badge text="Новинка" backgroundColor="#00945F" />]}
                        productCode='1231' productLink='#' oldPrice={890} bonusesCount={445}
                        inStock={ true } withAddToWishlist={ true } />

                        <ProductCard title="Джерело Вознесіння" brand="Брендон Сандерсон" 
                        imageSrc='https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/a/a/aa4239e8744c44faa913b754d8e3fc41.webp'
                        badges={[<Stars count={0} isSmaller={true} />,  <Badge text="Новинка" backgroundColor="#00945F" />]}
                        productCode='1231' productLink='#' oldPrice={930} bonusesCount={250}
                        inStock={ true } withAddToWishlist={ true } />

                        <ProductCard title="Нічний трунок" brand="Алекс Астер" 
                        imageSrc='https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/6/3/635ef7c2_nichnyi-trunok.webp'
                        badges={[<Stars count={0} isSmaller={true} />,  <Badge text="Новинка" backgroundColor="#00945F" />]}
                        productCode='1231' productLink='#' oldPrice={500} bonusesCount={250}
                        inStock={ true } withAddToWishlist={ true } />
                        
                        <ProductCard title="Нічний трунок" brand="Алекс Астер" 
                        imageSrc='https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/6/3/635ef7c2_nichnyi-trunok.webp'
                        badges={[<Stars count={0} isSmaller={true} />,  <Badge text="Новинка" backgroundColor="#00945F" />]}
                        productCode='1231' productLink='#' oldPrice={500} bonusesCount={250}
                        inStock={ true } withAddToWishlist={ true } />
                    </div>  
                    <button className="books-container__btn next-btn" type="btn">
                        <Image src="/icons/arrow-left.svg" width="30" height="30" alt="" />
                    </button>
                </div>    
            </div>

            <div className="books-container__section">
                <div className="books-container__header">
                    <h3 className="books-container__title">Yakaboo Publishing</h3>
                    <Link className="books-container__title-link" href="#">
                        <span>
                            Показати все
                        </span>
                        <Image src="icons/chevron-down.svg" width="15" height="15" alt="" />
                    </Link>
                </div>
                <div className="books-container__slider">
                    <button className="books-container__btn prev-btn visually-hidden" type="btn">
                        <Image src="/icons/arrow-left.svg" width="30" height="30" alt="" />
                    </button>
                    <div className="books-container__slider book-slider">
                        <ProductCard title="Княгиня пітьми (ілюстрований зріз)" brand="Мар'яна Копачинська" 
                        imageSrc='https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/f/i/file_330_3.jpg'
                        badges={[<Stars count={0} isSmaller={true} />, <CommentsCount />,  <TopBadge />]}
                        productCode='1231' productLink='#' oldPrice={500} bonusesCount={250}
                        inStock={ true } withAddToWishlist={ true } hasCashback={ true } hasWinterSupport={ true } />

                        <ProductCard title="Княгиня пітьми (ілюстрований зріз)" brand="Мар'яна Копачинська" 
                        imageSrc='https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/f/i/file_330_3.jpg'
                        badges={[<Stars count={0} isSmaller={true} />, <CommentsCount />,  <TopBadge />]}
                        productCode='1231' productLink='#' oldPrice={500} bonusesCount={250}
                        inStock={ true } withAddToWishlist={ true } />

                        <ProductCard title="Княгиня пітьми (ілюстрований зріз)" brand="Мар'яна Копачинська" 
                        imageSrc='https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/f/i/file_330_3.jpg'
                        badges={[<Stars count={0} isSmaller={true} />, <CommentsCount />,  <TopBadge />]}
                        productCode='1231' productLink='#' oldPrice={500} bonusesCount={250}
                        inStock={ true } withAddToWishlist={ true } />

                        <ProductCard title="Таке й різне" brand="Світлана Левченко" 
                        imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/t/a/take_i_rizne_29.10.jpg"
                        badges={[<Stars count={0} isSmaller={ true } />, <CommentsCount/>, <TopBadge />]}
                        productCode="1231" productLink="#" oldPrice={ 550 } bonusesCount={ 275 } 
                        inStock={ true } withAddToWishlist={ true } hasCashback={ true } hasWinterSupport={ true }/>

                    </div>  
                    <button className="books-container__btn next-btn" type="btn">
                        <Image src="/icons/arrow-left.svg" width="30" height="30" alt="" />
                    </button>
                </div>
            </div>

            <div className="books-container__section">
                <div className="books-container__header">
                    <h3 className="books-container__title">
                        Вас може зацікавити
                    </h3>
                </div>
                <div className="books-container__slider">
                    <button className="books-container__btn prev-btn visually-hidden" type="btn">
                        <Image src="/icons/arrow-left.svg" width="30" height="30" alt="" />
                    </button>
                    <div className="books-container__slider book-slider">
                        <ProductCard title="Стіни в моїй голові. Жити з тривожністю і депресією"
                        brand="Володимир Станчишин" 
                        imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/s/t/stanchyshyn_-_1500__1.png" 
                        badges={[<Stars count={ 5 } isSmaller={ true } />, <CommentsCount count={ 2 } />, <TopBadge />]}
                        productCode="1231" productLink="#" oldPrice={ 295 } bonusesCount={ 148 } inStock={ true } isAudio={ true }/>

                        <ProductCard title="Танець недоумка" brand="Ілларіон Павлюк" 
                        imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/c/o/cover_178_73.jpg"
                        badges={[<Stars count={ 5 } isSmaller={ true } />, <CommentsCount count={ 32 } />, <TopBadge />]}
                        productCode="1231" productLink="#" oldPrice={ 270 } bonusesCount={ 135 } inStock={ true } isEbook={ true } />

                        <ProductCard title="Я бачу, вас цікавить пітьма" brand="Ілларіон Павлюк" 
                        imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/i/m/img_67890_1.jpg"
                        badges={[<Stars count={ 4 } isSmaller={ true } />, <CommentsCount count={ 116 } />, <TopBadge />]}
                        productCode="1241" productLink="#" oldPrice={ 600 } bonusesCount={ 300 } inStock={ false } 
                        waitSince={"31.12.25"} hasCashback={ true } hasWinterSupport={ true } />

                        <ProductCard title="За маму, за тата" brand="Каріна Саварина"
                        imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/z/a/za_mamy_za_tata_new_copy.png"
                        badges={[<Stars count={4} isSmaller={ true } />, <CommentsCount count={ 8 } />, <TopBadge />]}
                        productCode="121" productLink='#' oldPrice={ 350 } newPrice={ 323 } bonusesCount={ 162 } inStock={ true } />
                    </div>  
                    <button className="books-container__btn next-btn" type="btn">
                        <Image src="/icons/arrow-left.svg" width="30" height="30" alt="" />
                    </button>
                </div>
            </div>  

            <div className="books-container__section">
                <div className="books-container__header">
                    <h3 className="books-container__title">Читаємо англійською взимку</h3>

                    <Link className="books-container__title-link" href="#">
                        <span>
                            Показати все 
                            <Image src="icons/chevron-down.svg" width="15" height="15" alt="" />
                        </span>
                    </Link>  
                </div>
                <div className="books-container__slider">
                    <button className="books-container__btn prev-btn visually-hidden" type="btn">
                        <Image src="/icons/arrow-left.svg" width="30" height="30" alt="" />
                    </button>
                    <div className="books-container__slider book-slider">
                        <ProductCard title="The Let Them Theory: A Life-Changing Tool That Millions of People Can`t Stop Talking About"
                        brand="Мел Роббінс" imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/9/7/9781788176187_0.jpg"
                        badges={[<Stars count={ 0 } isSmaller={ true } />, <CommentsCount count={ 0 } />, <TopBadge />]}
                        productCode="2131" productLink="#" oldPrice={ 1495 } bonusesCount={ 748 } inStock={ true } />

                        <ProductCard title="The Land in Winter: Longlisted for the Booker Prize 2025" 
                        brand="Ендрю Міллер" imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/9/7/9781529354300_0.jpg"
                        badges={[<Stars count={ 0 } isSmaller={ true } />, <CommentsCount />]}
                        productCode="121231" productLink="#" oldPrice={ 833 } bonusesCount={ 417 } inStock={ true } />

                        <ProductCard title="Atmosphere" brand="Тейлор Дженкінс Рід" 
                        imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/8/1/81ujtds1b5l._sl1500_.jpg"
                        badges={[ <Stars count={ 0 } isSmaller={ true } />, <CommentsCount /> ]} 
                        productCode="231" productLink="#" oldPrice={ 1148 } bonusesCount={ 574 } inStock={ true } />

                        <ProductCard title="The Housemaid" brand="Фріда Макфадден"
                        imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/9/7/9780349132884_0.jpg"
                        badges={[<Stars count={ 0 } isSmaller={ true } />, <CommentsCount />]} 
                        productCard="212312" productLink="#" oldPrice={ 796 } bonusesCount={ 398 } inStock={ true } />
                    </div>  
                    <button className="books-container__btn next-btn" type="btn">
                        <Image src="/icons/arrow-left.svg" width="30" height="30" alt="" />
                    </button>
                </div>
            </div>  

            <div className="books-container__section">
                <div className="books-container__header">
                    <h3 className="books-container__title">Новорічні хіти для дітей</h3>

                    <Link className="books-container__title-link" href="#">

                        <span>
                            Показати все 
                            <Image src="icons/chevron-down.svg" width="15" height="15" alt="" />
                        </span>
                    
                    </Link>  
                </div>
                <div className="books-container__slider">
                    <button className="books-container__btn prev-btn visually-hidden" type="btn">
                        <Image src="/icons/arrow-left.svg" width="30" height="30" alt="" />
                    </button>
                    <div className="books-container__slider book-slider">
                        <ProductCard title="Пан Сирник і різдвяний пампушок"
                        brand="Світлана Лінинська" 
                        imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/9/7/978-966-10-8816-9_pan_sirnik_obkl.jpg"
                        badges={[<Stars count={ 0 } isSmaller={ true } />, <CommentsCount count={ 0 } />]}
                        productCode="2131" productLink="#" oldPrice={ 129 } bonusesCount={ 65 } inStock={ true } isEbook={ true } />

                        <ProductCard title="Павлусь і Сантові олені" 
                        brand="Галина Манів" 
                        imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/9/7/978-966-10-8815-2_obkl.jpg"
                        badges={[<Stars count={ 0 } isSmaller={ true } />, <CommentsCount />]}
                        productCode="121231" productLink="#" oldPrice={ 229 } bonusesCount={ 115 } inStock={ true } isEbook={ true } />

                        <ProductCard title="Різдвяні казки" brand="Ніна Воскрсесенська" 
                        imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/9/7/978-966-10-8821-3.jpg"
                        badges={[ <Stars count={ 0 } isSmaller={ true } />, <CommentsCount /> ]} 
                        productCode="231" productLink="#" oldPrice={ 329 } bonusesCount={ 165 } inStock={ true } isEbook={ true } />

                        <ProductCard title="Хто зробить сніг" brand="Тарас Прохасько"
                        imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/f/i/file_215_2.jpg"
                        badges={[<Stars count={ 0 } isSmaller={ true } />, <CommentsCount />]} 
                        productCard="212312" productLink="#" oldPrice={ 79 } bonusesCount={ 40 } inStock={ true } isAudio={ true }/>
                    </div>  
                    <button className="books-container__btn next-btn" type="btn">
                        <Image src="/icons/arrow-left.svg" width="30" height="30" alt="" />
                    </button>
                </div>
            </div>  

             <div className="books-container__section">
                <div className="books-container__header">
                    <h3 className="books-container__title">Наближаємо Різдво</h3>

                    <Link className="books-container__title-link" href="#">
                        <span>
                            Показати все 
                            <Image src="icons/chevron-down.svg" width="15" height="15" alt="" />
                        </span>
                    </Link>  
                </div>
                <div className="books-container__slider">
                    <button className="books-container__btn prev-btn visually-hidden" type="btn">
                        <Image src="/icons/arrow-left.svg" width="30" height="30" alt="" />
                    </button>
                    <div className="books-container__slider book-slider">
                        <ProductCard title="Midnight at the Christmas Bookshop"
                        brand="Дженні Колган" 
                        imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/6/1/61obfwdxzwl._sl1000_.jpg"
                        badges={[<Stars count={ 0 } isSmaller={ true } />, <CommentsCount count={ 0 } />]}
                        productCode="2131" productLink="#" oldPrice={ 937 } newPrice={ 655 }
                         bonusesCount={ 65 } inStock={ true } />

                        <ProductCard title="The Christmas Fix: the sizzling new festive romance from the TikTok sensation and million-copy bestseller" 
                        brand="Люсі Скор" 
                        imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/9/7/9781399735537_0.jpg"
                        badges={[<Stars count={ 0 } isSmaller={ true } />, <CommentsCount />]}
                        productCode="121231" productLink="#" oldPrice={ 614 } newPrice={ 539 } bonusesCount={ 270 } 
                        inStock={ true } />

                        <ProductCard title="I Heart Christmas" brand="Ліндсі Келк" 
                        imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/2/4/24_4.jpg"
                        badges={[ <Stars count={ 0 } isSmaller={ true } />, <CommentsCount /> ]} 
                        productCode="231" productLink="#" oldPrice={ 680 } bonusesCount={ 340 } inStock={ false } />

                        <ProductCard title="Різдво з червоним кардиналом" brand="Фенні Флегг"
                        imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/c/o/cover_14_74.jpg"
                        badges={[<Stars count={ 0 } isSmaller={ true } />, <CommentsCount />, <TopBadge />]} 
                        productCard="212312" productLink="#" oldPrice={ 120 } bonusesCount={ 60 } inStock={ true } isEbook={ true }/>
                    </div>  
                    <button className="books-container__btn next-btn" type="btn">
                        <Image src="/icons/arrow-left.svg" width="30" height="30" alt="" />
                    </button>
                </div>
            </div>    

            <div className="books-container__section">
                <div className="books-container__header">
                    <h3 className="books-container__title">Затишне зимове читання</h3>

                    <Link className="books-container__title-link" href="#">
                        <span>
                            Показати все 
                            <Image src="icons/chevron-down.svg" width="15" height="15" alt="" />
                        </span>
                    </Link>  
                </div>
                <div className="books-container__slider">
                    <button className="books-container__btn prev-btn visually-hidden" type="btn">
                        <Image src="/icons/arrow-left.svg" width="30" height="30" alt="" />
                    </button>
                    <div className="books-container__slider book-slider">
                        <ProductCard title="Привиди Дому із зеленого скла. Книга 2"
                        brand="Кейт Мілфорд" 
                        imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/i/m/img144_11.jpg"
                        badges={[<Stars count={ 0 } isSmaller={ true } />, <CommentsCount count={ 0 } />]}
                        productCode="2131" productLink="#" oldPrice={ 690 } bonusesCount={ 345 } inStock={ true } />

                        <ProductCard title="Puss in Books. Our Best-Loved Writers on Their Best-Loved Cats" 
                        brand="Поп Магрс" 
                        imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/8/1/81vzh5iytel._sl1500_.jpg"
                        badges={[<Stars count={ 0 } isSmaller={ true } />, <CommentsCount />]}
                        productCode="121231" productLink="#" oldPrice={ 736 } newPrice={ 515 } bonusesCount={ 258 } 
                        inStock={ true } />

                        <ProductCard title="Зла Зима" brand="Андерс Бйоркелід" 
                        imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/i/m/img_13941.jpg"
                        badges={[ <Stars count={ 4 } isSmaller={ true } />, <CommentsCount count={ 2 } /> ]} 
                        productCode="231" productLink="#" oldPrice={ 200 } newPrice={ 180 }  bonusesCount={ 90 } inStock={ true } />

                        <ProductCard title="Мандрівний цирк сріблястої пані" brand="Наталія Довголоп"
                        imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/c/o/cover_456_100.jpg"
                        badges={[<Stars count={ 0 } isSmaller={ true } />, <CommentsCount />]} 
                        productCard="212312" productLink="#" oldPrice={ 170 } bonusesCount={ 85 } inStock={ true } 
                        isEbook={ true }/>
                    </div>  
                    <button className="books-container__btn next-btn" type="btn">
                        <Image src="/icons/arrow-left.svg" width="30" height="30" alt="" />
                    </button>
                </div>
            </div>

            <div className="books-container__section">
                <div className="books-container__header">
                    <h3 className="books-container__title">Вибір читачів листопада</h3>

                    <Link className="books-container__title-link" href="#">
                        <span>
                            Показати все 
                            <Image src="icons/chevron-down.svg" width="15" height="15" alt="" />
                        </span>
                    </Link>  
                </div>
                <div className="books-container__slider">
                    <button className="books-container__btn prev-btn visually-hidden" type="btn">
                        <Image src="/icons/arrow-left.svg" width="30" height="30" alt="" />
                    </button>
                    <div className="books-container__slider book-slider">
                        <ProductCard title="Дерева"
                        brand="Персіваль Еверетт" 
                        imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/f/b/fb1332182u_dereva.jpg"
                        badges={[<Stars count={ 3 } isSmaller={ true } />, <CommentsCount count={ 1 } />, <TopBadge />]}
                        productCode="2131" productLink="#" oldPrice={ 290 } bonusesCount={ 145 } inStock={ true } isEbook={ true } />

                        <ProductCard title="Калеб Траскман. Книга 1. Незавершений рукопис" 
                        brand="Франк Тільє" 
                        imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/f/b/fb1332124u_nezaversheniy_rukopys.jpg"
                        badges={[<Stars count={ 4 } isSmaller={ true } />, <CommentsCount count={ 2 } />, <TopBadge />]}
                        productCode="121231" productLink="#" oldPrice={ 320 } bonusesCount={ 160 } inStock={ true } isEbook={ true } />

                        <ProductCard title="Так тобі й треба, або Чому в стосунках варто обирати себе" brand="Катя Бльостка" 
                        imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/1/_/1_1978_1.jpg"
                        badges={[ <Stars count={ 5 } isSmaller={ true } />, <CommentsCount count={ 8 } />, <TopBadge /> ]} 
                        productCode="231" productLink="#" oldPrice={ 210 }   bonusesCount={ 105 } inStock={ true } isEbook={ true } />

                        <ProductCard title="Емпіреї. Книга 1. Четверте крило" brand="Ребекка Яррос"
                        imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/c/o/cover_2634.jpg"
                        badges={[<Stars count={ 0 } isSmaller={ true } />, <CommentsCount />, <TopBadge />]} 
                        productCard="212312" productLink="#" oldPrice={ 245 } bonusesCount={ 123 } inStock={ true } 
                        isEbook={ true }/>
                    </div>  
                    <button className="books-container__btn next-btn" type="btn">
                        <Image src="/icons/arrow-left.svg" width="30" height="30" alt="" />
                    </button>
                </div>
            </div>

            <div className="books-container__section">
                <div className="books-container__header">
                    <h3 className="books-container__title">Найбільші знижки</h3>
                </div>
                <div className="books-container__slider">
                    <button className="books-container__btn prev-btn visually-hidden" type="btn">
                        <Image src="/icons/arrow-left.svg" width="30" height="30" alt="" />
                    </button>
                    <div className="books-container__slider book-slider">
                        <ProductCard title="1937"
                        brand="Максим Савчук" 
                        imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/1/9/1937-cover.jpg"
                        badges={[<Stars count={ 4 } isSmaller={ true } />, <CommentsCount count={ 9 } />, <TopBadge />]}
                        productCode="2131" productLink="#" oldPrice={ 340 } newPrice={ 119 } bonusesCount={ 60 } 
                        inStock={ true } hasCashback={ true } hasWinterSupport={ true } />

                        <ProductCard title="Гра в індіанців, або Ніколи не смійся з крокодила" 
                        brand="Леся Воронина" 
                        imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/6/a/6ad869e97a18310d9c468e649b8449ac.png"
                        badges={[<Stars count={ 0 } isSmaller={ true } />, <CommentsCount />]}
                        productCode="121231" productLink="#" oldPrice={ 215 } newPrice={ 107 } 
                        bonusesCount={ 54 } inStock={ true } hasCashback={ true } hasWinterSupport={ true } />

                        <ProductCard title="Земля обітована" brand="Барак Обама" 
                        imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/8/1/81aj7hz4ybl._sl1500_68.jpg"
                        badges={[ <Stars count={ 0 } isSmaller={ true } />, <CommentsCount />, <TopBadge /> ]} 
                        productCode="231" productLink="#" oldPrice={ 450 } newPrice={ 225 } bonusesCount={ 105 }
                        inStock={ true } hasCashback={ true } hasWinterSupport={ true } />

                        <ProductCard title="Друковані літери" brand="Ольга Ісаєнко"
                        imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/1/9/19_4_74.jpg"
                        badges={[<Stars count={ 0 } isSmaller={ true } />, <CommentsCount />, <TopBadge />]} 
                        productCard="212312" productLink="#" oldPrice={ 20 } newPrice={ 11 } bonusesCount={ 6 } inStock={ true } 
                        hasWinterSupport={ true } hasCashback={ true }/>
                    </div>  
                    <button className="books-container__btn next-btn" type="btn">
                        <Image src="/icons/arrow-left.svg" width="30" height="30" alt="" />
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}


export default BooksContainer