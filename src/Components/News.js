import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps={
    category : 'general',
    country : 'in'

  }
  static propsTypes={
    country : PropTypes.string,
    pageSize : PropTypes.number,
    category : PropTypes.string,
  }
  Changetotitle=(string)=>{
    return string.charAt(0).toUpperCase()+ string.slice(1)
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
    document.title=`${this.Changetotitle(this.props.category)} - NewsMonkey `;

  }
  async UpdatePage() {
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=4d50a7857b5840efa5450cdd863d4f61&page=${this.props.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading : true})
    let data = await fetch(url)
    let FetchedData = await data.json()
    // this.state.articles
    this.setState({ articles: FetchedData.articles ,totalResults: FetchedData.totalResults, loading:false })
    console.log(FetchedData);
  }
  async componentDidMount() {
    this.UpdatePage()
  }
  handlePrevClick = async () => {

    this.setState({
      page: this.state.page - 1,
    })
    this.UpdatePage()
  }

  handleNextClick = async () => {
        this.setState({
          page: this.state.page + 1,
        })
        this.UpdatePage()
    
}
  render() {
    return (
      <div className='container'>
        <h2 className='text-center'>Top Headlines of {this.props.category}</h2>
        {this.state.loading && <Spinner/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((e) => {
            return <div className="col-lg-4" key={e.url}>
              <NewsItem title={e.title !== null ? e.title.slice(0, 30) : ""} description={e.description !== null ? e.description.slice(0, 60) : ""} urlToImage={e.urlToImage} url={e.url} author={e.author}  publishedAt={(new Date(e.publishedAt)).toLocaleString()} />
            </div>
          })}
        </div>  
        <div className="container my-2 d-flex justify-content-between">
          <button type='button' disabled={this.state.page <= 1} className='btn btn-dark' onClick={this.handlePrevClick}> &larr; Previous</button>
          <button type='button' disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className='btn btn-dark' onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
