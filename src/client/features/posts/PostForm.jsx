import { useCreatePostMutation } from "./postSlice";
import { useState } from "react";

function PostForm() {
  const [newPost, setNewPost] = useState("");
  const [createPost] = useCreatePostMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPost({
      post: newPost,
    });
    setNewPost("");
  };

  return (
    <>
      <form className="new-post-form" onSubmit={handleSubmit}>
        <label>
          <h3>What's going on?</h3>
          <br/>
          <textarea className="new-post-field" required
            type="text"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
        </label>
        <br/>
        <button>Submit</button>
      </form>
    </>
  );
}

export default PostForm;
