
import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
export class news extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 6,
        category: "General"
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
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
    }
    spinner = () => {
        <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    }

    async update() {
        this.setState({ loading: true })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a7d60178251040f39cebcd57507e4af8&page=${this.state.page}&pagesize=${this.props.pageSize}`;
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
        this.setState({ page: this.state.page + 1, })
    }
    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1, })
        this.setState({ loading: true })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a7d60178251040f39cebcd57507e4af8&page=${this.state.page}&pagesize=${this.props.pageSize}`;
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
            <div className='container my-3'>
                <h1 className="text-center">Top Headlines From {this.capitalizeFirstLetter(this.props.category)} </h1>
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={true}
                    loader={<Spinner />}
                >    <div className="con">
                        <div className='row' >
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4 dx'1" key={element.url}>
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