
import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class news extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 10,
        category: "General",
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalpage: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsArc`;
    }
    spinner = () => {
        <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    }

    async update() {
        this.setState({ loading: true })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4ae770ff03ae4a8a9c757c5594f5e0b2&page=${this.state.page}&pagesize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parserData = await data.json();
        this.setState({
            articles: parserData.articles,
            totalResults: parserData.totalResults,
            loading: false,

        })
    }
    async componentDidMount() {
        this.update()
        this.setState({ page:this.state.page + 1, })
    }
    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1, })
        this.setState({ loading: true })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4ae770ff03ae4a8a9c757c5594f5e0b2&page=${this.state.page}&pagesize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parserData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parserData.articles),
            totalResults: parserData.totalResults,
            loading: false,

        })
        
    };
    render() {

        return (
            <div className='container-fluid'>
                
                <h1 className="text-center my-4">Top Headlines From {this.capitalizeFirstLetter(this.props.category)} </h1>
             
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length!==this.state.totalResults}
                    loader={<Spinner/>}
                >    <div className="container-fluid">
                        <div className='row' >
                            {this.state.articles.map((element) => {
                                return <div className="col-md-3 dx'1" key={element.url}>
                                    <NewsItem title={element.title ? element.title.slice(0, 100) : ""} description={element.description ? element.description.slice(0, 100) : ""} imgUrl={element.urlToImage} newsUrl={element.url} source={element.source.name} dateAndTime={element.publishedAt} author={element.author} />
                                </div>
                                
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </div>
        )
    }
}

export default news