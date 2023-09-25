import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Loader from "../components/UI/Loader/Loader";
import { useFetching } from "../components/hooks/useFetching";
import PostService from "../API/PostService";
import Button from "../components/UI/button/Button";
import { Link } from "react-router-dom";

const PostIdPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id);
    setPost(response.data);
  });

  const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
    const response = await PostService.getCommentsByPostId(id);
    setComments(response.data);
  });

  useEffect(() => {
    fetchPostById(params.id)
    fetchComments(params.id)}, []);
  console.log(params);
  return (
    <div>
      <div className="post__item">
      Вы открыли страницу поста c ID = {params.id}
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {post.id} {post.title}{" "} <Button><Link to="/posts">Назад</Link></Button>  
        </div>
      )}
      <h3>Комментарии</h3>
      {isComLoading ? (
        <Loader />
      ) : (
        <div>
          {comments.map((comm) => (
            <div key = {comm.id} style={{ marginTop: 15 }}>
              <h5>{comm.email}</h5>
              <div>{comm.body}</div>
            </div>
          ))}
        </div>
      )}</div>
    </div>
  );
};

export default PostIdPage;
