import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { usePosts } from "../components/hooks/usePost";
import { useFetching } from "../components/hooks/useFetching";
import PostService from "../API/PostService";
import { getPageCount } from "../utils/pages";
import Loader from "../components/UI/Loader/Loader";
import PostList from "../components/PostList";
import Pagination from "../components/UI/pagination/Pagination";
import { useObserver } from "../components/hooks/useObserver";

function Posts() {
  const [posts, setPosts] = React.useState([
    // { id: 1, title: "Post1", body: "one" },
    // { id: 2, title: "Post2", body: "two" },
    // { id: 3, title: "Post3", body: "three" },
  ]);

  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef();

  console.log(lastElement);

  const [fetchPosts, isPostsLoading, postError] = useFetching(
    async (limit, page) => {
      const response = await PostService.getAll(limit, page);
      setPosts([...posts, ...response.data]);
      const totalCount = response.headers["x-total-count"];
      setTotalPages(getPageCount(totalCount, limit));
    }
  );
  console.log(totalPages);

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1);
  });

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit]);

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const changePage = (page) => {
    setPage(page);
  };

  return (
    <div className="App">  
      <div className="post__list" style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
        <PostList
          remove={removePost}
          posts={sortedAndSearchedPosts}
          title="Посты с jsonplaceholder.com"
        />
      </div>
      <div ref={lastElement} style={{ height: 20, background: "red" }}></div>
      {isPostsLoading && (
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
        >
          <Loader />
        </div>
      )}
      <Pagination page={page} changePage={changePage} totalPages={totalPages} />
    </div>
  );
}

export default Posts;
