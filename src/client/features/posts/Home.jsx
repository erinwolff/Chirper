import { useGetAllPostsQuery } from "./postSlice";

export const HomeCard = ({ post }) => {
  return (
    <>
      <ul className="post-card">
        <section className="post-info">
          <li className="post">
            <p className="post-text">
              {post.post}
              <br />
            </p>

          </li>
        </section>

      </ul>
    </>
  )
}

export default function Home() {
  const { data: posts, isLoading } = useGetAllPostsQuery();

  return (
    <div className="posts">
      <h2 className="welcome">see what the birds are chirping about: </h2>
      {isLoading && <p>Loading posts...</p>}
      {posts && (
        <ul>
          {posts.map((post) => (
            <HomeCard key={post.id} post={post} />
          ))}
        </ul>
      )}
    </div>
  );
}

