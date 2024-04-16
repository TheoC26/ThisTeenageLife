import React from "react";

const SearchBar = ({ type, search, setSearch, submit, setIsSearching }) => {
  return (
    <form
      className={type == "episode" ? "episodessearchbar" : "searchbar"}
      onSubmit={submit}
    >
      {console.log(type == "episode")}
      <div className="search">
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
      {type === "blog" && (
        <>
          <select name="sort-by" className="sort-by">
            <option value="newest-oldest">newest to oldest</option>
            <option value="oldest-newest">oldest to newest</option>
          </select>
          <select name="type" className="type">
            <option value="type" selected>
              type
            </option>
            <option value="poem">poem</option>
            <option value="story">story</option>
            <option value="article">article</option>
            <option value="drawing">drawing</option>
            <option value="photo">photo</option>
            <option value="episode-reflection">episode reflection</option>
          </select>
        </>
      )}
    </form>
  );
};

export default SearchBar;
