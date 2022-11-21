import React, { Component } from 'react'

export class NewsItem extends Component {

    // props are read only we cannot change props.
    render() {
        let { title, description, imgUrl, newsUrl, source, dateAndTime ,author } = this.props;
        return (
            <div>
                <div className="card">
                <span className="position-absolute top-0translate-middle badge rounded-pill bg-danger" style={{left :'70% ', zIndex :'1'}}> {source} </span>  
                    <img src={!imgUrl ? "https://thumbs.dreamstime.com/z/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg" : imgUrl} className="card-img-top" alt={imgUrl} />
                    <div className="card-body">
                    
                        <h5 className="card-title">{title} </h5>
                        <p className="card-text">{description}</p> 
                        <p className="card-text"><small className="text-muted">by {!author ? "Unknown" : author} on {new Date(dateAndTime).toLocaleString()}</small></p>
                        <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
