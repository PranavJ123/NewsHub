import React from 'react'

export default function NewsItem({ title, description, imageUrl, newsUrl, author, date, source }) {
    return (
        <div className="my-3">
            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>

                    <span className="badge rounded-pill bg-danger" >{source}</span>
                </div>
                <img src={imageUrl ? imageUrl : "https://images.firstpost.com/wp-content/uploads/2021/08/screencapture-pbs-twimg-media-E-Cf8xtXoAMAxLq-2021-08-31-14_55_09-1.jpg"} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-text">{title}...</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-danger">By {author} on {new Date(date).toDateString()}</small></p>
                    <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
                </div>
            </div>
        </div>
    )
}
