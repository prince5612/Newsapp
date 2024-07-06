import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } =
      this.props;
    return (
      <div>
        <div className="card" style={{ height: "458px" }}>
          <div style={{ display: "flex", right: "0", position: "absolute" }}>
            <span class=" badge rounded-pill bg-danger">{source}</span>
          </div>
          <img
            src={imageUrl}
            className="card-img-top"
            alt="..."
            style={{ height: "233.09px", width: "414.39px" }}
          />
          <div className="card-body">
            <h5 className="card-title"> {title}...</h5>
            <p className="card-text">{description}...</p>

            <p class="card-text">
              <small class="text-body-secondary">
                by {author ? author : "Unknown"} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              rel="noreferrer"
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-dark"
            >
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
