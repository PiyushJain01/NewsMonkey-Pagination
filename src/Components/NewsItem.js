import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
  
    let {title,description,urlToImage,url,author,publishedAt}=this.props
    
    return (
      <div>
        <div className="card" style={{width: "18rem"}}>
          <img src={urlToImage} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{ title}...</h5>
            <p className="card-text">{description}...</p>
            <p class="card-text"><small class="text-body-secondary">By {!author ?"Unknown" :author} at {publishedAt}</small></p>
            <a href={url} rel="noreferrer" target='_blank' className="btn btn-primary">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
