const DownloadFile = () => {
    return(
        <div className="download-file">
            <div className="download-file__header">
                <div className="download-file__separator" />
                <div className="download-file__sep-text">або</div>
                <div className="download-file__separator" />
            </div>
            <div className="download-file__file-option">
                <div className="download-file__format">
                    <p className="download-file__format-title">
                        EPUB
                    </p>
                    <span className="download-file__format-info">
                        Підходить для iBooks (iPhone, iPad, iMac)
                    </span>
                </div>
                <div className="download-file__format">
                    <p className="download-file__format-title">
                        MOBI
                    </p>
                    <span className="download-file__format-info">
                        Підходить для електронних книг Amazon Kindle
                    </span>
                </div>
            </div>
        </div>
    )
}

export default DownloadFile