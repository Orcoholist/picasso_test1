import React from "react";
import Button from "./UI/button/Button";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const maxPostLength = 149;

const PostItem = ({ post }) => {
  const router = useHistory();

  const handleItemClick = () => router.push(`/posts/${post.id}`);

  const doesExceedLimit = post.body.length > maxPostLength;
  const preview = doesExceedLimit
    ? post.body.substring(0, maxPostLength) + "..."
    : post.body;
  const className = `post ${doesExceedLimit ? "__full" : "__content"}`;

  return (
    <div className="post">      <h2>
        
        {post.id} <strong> {post.title} </strong>
      </h2>
      <div>{preview}</div>
      {doesExceedLimit && (
        <div className="post_btns">
          <Button onClick={handleItemClick}>Открыть</Button>
        </div>
      )}
    </div>
  );
};

export default PostItem;
