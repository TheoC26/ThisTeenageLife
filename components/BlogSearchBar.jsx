import Link from "next/link";
import React from "react";

const BlogSearchBar = ({
  type,
  search,
  setSearch,
  submit,
  setIsSearching,
  showSearches,
  posts,
  isSearching,
}) => {
  return (
    <form className="searchbar" onSubmit={submit}>
      <div className="search">
        <div className="bar">
          <input
            type="text"
            placeholder="Search"
            className="searchinput"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setIsSearching(true)}
            onBlur={() => {
              setTimeout(() => setIsSearching(false), 150);
              console.log("clicked 2");
            }}
          />
          <input type="submit" value="search" className="submit" />
        </div>
        {isSearching && (
          <div className="searched-posts">
            {showSearches &&
              posts &&
              posts.map((post, i) => (
                <Link
                  href={`/blog/${post.id}`}
                  className="searched-blog"
                  key={i}
                >
                  <div>{post.title}</div>
                  <div>{post.formattedDate}</div>
                </Link>
              ))}
            {!showSearches && <div>Search for something</div>}
            {console.log(showSearches && !posts)}
            {showSearches && !posts && <div>No results</div>}
          </div>
        )}
      </div>
    </form>
  );
};

export default BlogSearchBar;
