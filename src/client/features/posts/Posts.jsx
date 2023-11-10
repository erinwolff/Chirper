import { useSelector } from "react-redux";
import { selectToken } from "../auth/authSlice";
import { useDeletePostMutation, useGetPostsQuery } from "./postSlice";
import PostForm from "./PostForm";
import { useNavigate } from "react-router-dom";

export const PostCard = ({ post }) => {
  // Handle delete fucntion
  const navigate = useNavigate();
  const [deletePost] = useDeletePostMutation();
  const handleDelete = () => {
    deletePost(post.id);
    navigate("/posts");
  }

  return (
    <>
      <ul className="post-card">
        <section className="post-info">
          <li className="post">
            <p className="post-text">
              {post.post}
              <br />
              <button className="deleteButton" onClick={handleDelete}>DELETE</button>
            </p>

          </li>
        </section>

      </ul>
    </>
  )
}


/** Main interface for user to interact with their posts */
export default function Posts() {
  const token = useSelector(selectToken);
  const { data: posts, isLoading } = useGetPostsQuery();

  if (!token) {
    return <p>You must be logged in to see your posts.</p>;
  }

  return (
    <div className="posts">
      <h2 className="welcome">Welcome Home ~</h2>
      <div className="new-post">
        <h3>Create a new post:</h3>
        <PostForm />
      </div>
      {isLoading && <p>Loading posts...</p>}
      {posts && (
        <ul>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </ul>
      )}
    </div>
  );
}