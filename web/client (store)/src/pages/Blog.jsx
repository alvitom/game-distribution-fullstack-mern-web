import React from "react";
import Meta from "../components/Meta";
import BlogCard from "../components/BlogCard";

const Blog = () => {
  return (
    <>
      <Meta title="Blog Terbaru" />
      <div className="blog-wrapper">
        <div className="container">
          <div className="row">
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
