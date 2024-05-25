import React from "react";

const BlogCard = () => {
  return (
    <div className="col-10 mx-auto my-4">
      <div className="blog-card d-flex gap-3">
        <div className="blog-image">
          <a href="/blog/id">
            <img src="https://cdn2.unrealengine.com/europa-universalis-iv-winds-change-keyart-1920x1080-5d6637c94a86.jpg?h=270&quality=medium&resize=1&w=480" alt="" className="img-fluid" />
          </a>
        </div>
        <div className="blog-detail d-flex flex-column justify-content-around">
          <p className="time-upload mb-0">22 Jam yang lalu</p>
          <a href="/blog/id" className="title">
            Europa Universalis IV: Winds of Change – The best new countries to play
          </a>
          <p className="short-description mb-0">The latest expansion to Europa Universalis IV adds lots of new content and flavor. Our guide can help you plan your next run.</p>
          <a href="/blog/id" className="read-more">
            Baca selengkapnya
          </a>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
