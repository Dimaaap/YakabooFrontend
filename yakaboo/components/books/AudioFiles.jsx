import React from 'react'

export const AudioFiles = () => {
  return (
    <div className="download-file">
        <div className="download-file__header">
            <div className="download-file__separator"></div>
            <div className="download-file__sep-text">або завантажте</div>
            <div className="download-file__separator"></div>
        </div>
        <div className="download-file__file-option">
            <div className="download-file__format">
                <p className="download-file__format-title">
                    MP3
                </p>
                <span className="download-file__format-info">
                    Універсальний аудіоформат
                </span>
            </div>
            <div className="download-file__format">
                <p className="download-file__format-title">
                    ZIP
                </p>
            </div>
        </div>
    </div>
  )
}
