import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spiner from "./Spiner";

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults : 0
    };
  }
  capitializer = (str)=>{
    return str.charAt(0).toUpperCase() + str.slice(1);
   }
  async componentDidMount() {
    this.props.setProgress(10);
    document.title=`${this.capitializer(this.props.category)}- News App`;
    let url =
      `https://newsapi.org/v2/top-headlines?category=${this.props.category}&
country=${this.props.country}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true 
    })
    this.props.setProgress(30);
    let data = await fetch(url);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({ articles: parsedData.articles , totalResults : parsedData.totalResults , loading: false} );
    this.props.setProgress(100);
  }

  handleNext = async () => {
    this.props.setProgress(10);
    document.title=`${this.capitializer(this.props.category)}- News App`;
    let url =
      `https://newsapi.org/v2/top-headlines?category=${this.props.category}&
country=${this.props.country}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({
        loading: true 
      })
      this.props.setProgress(30);
    let data = await fetch(url);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({ 
        articles: parsedData.articles,
        page : this.state.page+1,
        loading: false
     });
     this.props.setProgress(100);
  };
  handlePrev =async () => {
    this.props.setProgress(10);
    document.title=`${this.capitializer(this.props.category)}- News App`;
    let url =
      `https://newsapi.org/v2/top-headlines?category=${this.props.category}&
country=${this.props.country}&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
      this.setState({
        loading: true 
      })
      this.props.setProgress(30);
    let data = await fetch(url);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({ 
        articles: parsedData.articles,
        page : this.state.page - 1 ,
        loading: false
     });
     this.props.setProgress(100);
  };


  render() {
    return (
      <div>
        <div className="container my-3" >
          <h2 style={{marginTop: "5rem"}}>Top Headlines - {this.capitializer(this.props.category)}</h2>

         {this.state.loading && <Spiner/>}
          <div className="row my-4">
            {!(this.state.loading) && this.state.articles.map((element) => {
              if (
                element.urlToImage!== null &&
                element.title !== null &&
                element.description !== null
              ) {
                return (
                  <div className="col-md-4 my-2" key={element.url}>
                    <NewsItem
                      title={element.title.slice(0, 40)}
                      description={element.description.slice(0, 80)}
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author= {element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              }
            })}
          </div>
          {!(this.state.loading) && <div className="container d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-dark"
              onClick={this.handlePrev}
              disabled={this.state.page <= 1}
            >
              &larr; Prev
            </button>
            <button
              type="button"
              className="btn btn-dark"
              onClick={this.handleNext}
              disabled={this.state.page >= Math.ceil(this.state.totalResults/this.props.pageSize)}
            >
              Next &rarr;
            </button>
          </div>}
        </div>
      </div>
    );
  }
}

export default News;
