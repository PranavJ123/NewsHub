import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {

    capitalizeFirstLetter = (string) =>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props){
        super(props);
        this.state = {
            articles:[],
            loading: false,
            page:1,
            totalResults:0
        }
        document.title = `NewsHub - ${this.capitalizeFirstLetter(this.props.category)}`;
    }

    async componentDidMount(){
                this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=18e745eb42c246bda68794e7abd404cf&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({
            articles:parsedData.articles,
            totalResults :parsedData.totalResults,
            loading:false
        })
        this.props.setProgress(100);
    }

    // handlePrev = async()=>{
    //         this.props.setProgress(10);
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=18e745eb42c246bda68794e7abd404cf&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    //     // this.setState({loading:true})
    //     let data = await fetch(url);
    //     let parsedData = await data.json();
    //     console.log(parsedData);

    //     this.setState({
    //         page:this.state.page-1,
    //         articles:parsedData.articles,
    //         loading:false
    //     })
    //     this.props.setProgress(100);
    // }
    // handleNext = async()=>{
    //     this.props.setProgress(10);
    //     if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)))
    //     {
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=18e745eb42c246bda68794e7abd404cf&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    //     // this.setState({loading:true})
    //     let data = await fetch(url);
    //     let parsedData = await data.json();

    //     this.setState({
    //         page:this.state.page+1,
    //         articles:parsedData.articles,
    //         loading:false
    //     })
    //     this.props.setProgress(100);
    // }
// }

fetchMoreData = async() => {
    this.setState({page:this.state.page+1});
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=18e745eb42c246bda68794e7abd404cf&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
        articles:this.state.articles.concat(parsedData.articles),
        totalResults :parsedData.totalResults,
        loading:false
    })

  };

    render() {
        return (
            <>
                <h2 className="text-center" style={{margin: '35px 0px', marginTop:'90px'}}>NewsHub - Top Headlines from {this.capitalizeFirstLetter(this.props.category)}</h2>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >

            <div className="container">
                <div className="row">
                { this.state.articles.map((element)=>{
                    return <div className="col-md-4" key = {element.url}>
                    <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author?element.author:"Unknown"} date={element.publishedAt} source={element.source.name}/>
                    </div>
                })}
                </div>
             </div>
             </InfiniteScroll>
                
            </>
        )
    }
}

