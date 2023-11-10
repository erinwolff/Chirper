import { useSelector } from "react-redux";
import { selectToken } from "../auth/authSlice";
import { useGetPostsQuery } from "./postSlice";
import PostForm from "./PostForm";

export const PostCard = ({ post }) => {
  return (
    <>
      <ul className="post-card">
        <section className="post-info">
          <li className="post">
            <p className="post-text">
              {post.post}
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
    return <p>You must be logged in to see your tasks.</p>;
  }

  return (
    <div className="posts">
      <h2 className="welcome">Welcome Home ~</h2>
      <div className="new-post">
      <h3>Create a new post:</h3>
      <PostForm/>
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