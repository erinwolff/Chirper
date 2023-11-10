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
          What's going on?:
          <input required
            type="text"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
        </label>
        <button>Submit</button>
      </form>
    </>
  );
}

export default PostForm;
