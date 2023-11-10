import { useSelector } from "react-redux";
import { selectToken } from "../auth/authSlice";
import { useGetPostsQuery } from "./postSlice";

export const PostCard = ({post}) => {
  return (
    <>
    <ul className="post-card">
      <section className="post-info">
        <li className="post">
          <p>
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
      <h1>Posts</h1>      
      <h2>Your Posts</h2>
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