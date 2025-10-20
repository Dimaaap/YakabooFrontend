import Link from "next/link";
import React from "react";

export const baseFields = [
    {
        key: "author",
        title: "Автор",
        show: (book, isGift) => !isGift && (book.authors[0]?.first_name || book.authors[0]?.last_name),
        render: (book) => (
            <Link className="book-container__link author-link"
            href={`/author/view/${book.authors[0]?.slug}`}>
                { book.authors[0]?.first_name } { book.authors[0]?.last_name }
            </Link>
        )
    },
    {
        key: "publishing",
        title: "Видавництво",
        show: (book, isGift) => !isGift && book.publising,
        render: (book) => (
            <Link href={`/book-publisher/view/${book.publising.slug}`} className="book-container__link author-link">
                { book.publishing.title }
            </Link>
        )
    },
    {
        key: "brand",
        title: "Бренд",
        show: (book, isGift) => isGift && book.brand,
        render: (book) => (
            <Link
             href={`/gifts/brands/view/${book.brand.slug}`}
            className="book-container__link publishing-link"
            >
                { book.brand.title }
            </Link>
        )
    },
    {
        key: "packing_size",
        title: "Розмір упаковки",
        show: (book, isGift) => isGift && book.gift_info?.packing_size,
        render: (book) => <p>{ book.gift_info.packing_size }</p>
    },
    {
        key: "packing_type",
        title: "Тип упаковки",
        show: (book, isGift) => isGift && book.gift_info?.packing_type,
        render: (book) => <p>{ book.gift_info.packing_type }</p>
    },
    {
        key: "pages_count",
        title: "Кількість сторінок",
        show: (book, isGift) => (isGift ? book.gift_info?.pages_count : book.book_info?.pages_count) > 0,
        render: (book, isGift) => (
            <p>{isGift ? book.gift_info.pages_count : book.book_info.pages_count}</p>
        )
    },
    {
        key: "pages_format",
        title: "Формат сторінок",
        show: (book, isGift) => !isGift && book.book_info?.pages_format,
        render: (book) => <p>{book.book_info.pages_format}</p>,
    }
]


export const extraFields = [
    {
        key: "publishing_year",
        title: "Рік видання",
        show: (book, isGift) => isGift && book.book_info?.publishing_year > 0,
        render: (book) => <p>{book.book_info.publishing_year}</p>,
    },
    {
        key: "language",
        title: "Мова",
        show: (book, isGift) => !!(isGift ? book.gift_info?.language : book.book_info?.language),
        render: (book, isGift) => <p>{isGift ? book.gift_info.language : book.book_info.language}</p>,
    },
    { 
        key: "seria",
        title: "Серія",
        show: (book) => !!book?.seria,
        render: (book) => (
            <Link
                href={`/book/seria/${book.seria.slug}`}
                className="book-container__link publishing-link">
                { book.seria.title }
            </Link>
        )
    },
    {
      key: "edition",
      title: "Тираж",
      show: (book) => !!book?.book_info?.edition,
      render: (book) => (
        <p>{ book.book_info.edition }</p>
      )
    },
    {
        key: "literature_period",
        title: "Література за періодами",
        show: (book) => !!book.literature_period,
        render: (book) => (
        <Link
            href={`/literatiure-periods/view/${book.literature_period.slug}`}
            className="book-container__link publishing-link"
        >
            {book.literature_period.title}
        </Link>
        ),
    },
    {
        key: "papers",
        title: "Листи",
        show: (book, isGift) => !isGift && book.book_info?.papers,
        render: (book) => <p>{book.book_info.papers}</p>,
    },
    {
        key: "size",
        title: "Розмір",
        show: (book, isGift) => book.book_info?.size || book.gift_info?.item_size,
        render: (book, isGift) => <p>{book.book_info?.size || book.gift_info?.item_size}</p>,
    },
    {
        key: "event",
        title: "Подія",
        show: (book, isGift) => isGift && book.gift_info?.event,
        render: (book) => <p>{book.gift_info.event}</p>,
    },
    {
        key: "gift_type",
        title: "Тип",
        show: (book, isGift) => isGift && book.gift_info?.gift_type,
        render: (book) => <p>{book.gift_info.gift_type}</p>,
    },
    {
        key: "color",
        title: "Колір",
        show: (book, isGift) => !!(isGift ? book.gift_info?.color : book.book_info?.color),
        render: (book, isGift) => <p>{isGift ? book.gift_info.color : book.book_info.color}</p>,
    },
    {
        key: "type",
        title: "Тип",
        show: (book, isGift) => !!(isGift ? book.gift_info?.type : book.book_info?.type),
        render: (book, isGift) => <p>{isGift ? book.gift_info.type : book.book_info.type}</p>,
    },
    {
        key: "pages_color",
        title: "Колір сторінок",
        show: (book, isGift) => !isGift && book.book_info?.pages_color,
        render: (book) => <p>{book.book_info.pages_color}</p>,
    },
    {
        key: "illustrations",
        title: "Ілюстрації",
        show: (book) => true,
        render: (book) => (
        <p>
            {book.book_info?.illustrations ||
            book.gift_info?.illustrations ||
            "Немає ілюстрацій"}
        </p>
        ),
    },
    {
        key: "translators",
        title: "Перекладачі",
        show: (book, isGift) => !isGift && book.translators?.length > 0,
        render: (book) => (
        <>
            {book.translators.map((translator, index) => (
            <React.Fragment key={translator.slug}>
                <Link
                href={`/book-translator/view/${translator.slug}`}
                className="book-container__link publishing-link"
                >
                    {`${translator.first_name} ${translator.last_name}`}
                </Link>
                {index < book.translators.length - 1 && ", "}
            </React.Fragment>
            ))}
        </>
        ),
    },
    {
        key: "illustrators",
        title: "Ілюстратор",
        show: (book, isGift) => !isGift && book.illustrators?.length > 0,
        render: (book) => (
            <>
                { book.illustrators.map((illustrator, index) => (
                    <React.Fragment key={ index }>
                        <Link href={`/book-illustrators/view/${illustrator.slug}`}
                        className="book-container__link publishing-ling">
                            {`${illustrator.first_name} ${illustrator.last_name}`}
                        </Link>
                    </React.Fragment>
                )) }
            </>
        )
    },
    {
        key: "format",
        title: "Паперова / аудіо / електронна",
        show: (book, isGift) => !isGift && book.book_info?.format,
        render: (book) => <p>{book.book_info.format}</p>,
    },
    {
        key: "colors",
        title: "Кольори",
        show: (book, isGift) => isGift && book.gift_info?.colors,
        render: (book) => <p>{book.gift_info.colors}</p>,
    },
    {
        key: "cover_type",
        title: "Тип обкладинки",
        show: (book, isGift) => !!(isGift ? book.gift_info?.cover_type : book.book_info?.cover_type) && book?.book_info?.format === "Паперова",
        render: (book, isGift) => <p>{isGift ? book.gift_info.cover_type : book.book_info.cover_type}</p>,
    },
    {
        key: "weight",
        title: "Вага",
        show: (book, isGift) => !!(isGift ? book.gift_info?.weight : book.book_info?.weight),
        render: (book, isGift) => <p>{isGift ? book.gift_info.weight : book.book_info.weight}</p>,
    },
    {
        key: "original_name",
        title: "Оригінальна назва",
        show: (book, isGift) => !isGift && book.book_info?.original_name,
        render: (book) => <p>{book.book_info.original_name}</p>,
    },
    {
        key: "ISBN",
        title: "ISBN",
        show: (book, isGift) => !!(isGift ? book.gift_info?.ISBN : book.book_info?.ISBN),
        render: (book, isGift) => <p>{isGift ? book.gift_info.ISBN : book.book_info.ISBN}</p>,
    },
    {
        key: "code",
        title: "Код",
        show: (book, isGift) => !!(isGift ? book.gift_info?.code : book.book_info?.code),
        render: (book, isGift) => <p>{isGift ? book.gift_info.code : book.book_info.code}</p>,
    },
]