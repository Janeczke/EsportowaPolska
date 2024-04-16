document.addEventListener("DOMContentLoaded", () => {
  const postForm = document.getElementById("post-form");
  const postsContainer = document.getElementById("posts");

  postForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const postContent = document.getElementById("post-content").value;

    if (postContent.trim() !== "") {
      const post = document.createElement("div");
      post.classList.add("post");
      post.textContent = postContent;

      postsContainer.appendChild(post);

      document.getElementById("post-content").value = "";
    }
  });
});
