import React from "react";

const SearchedPosts = ({ posts, showSearches }) => {
  return (
    <div className="searched-posts">
      {(showSearches && posts) && posts.map((post, i) => <div key={i}>{post.title}</div>)}
    {!showSearches && <div>Search for something</div>}
    </div>
  );
};

export default SearchedPosts;
