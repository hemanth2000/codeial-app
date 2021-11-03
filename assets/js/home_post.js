{
  // Method to submit new post form using ajax.
  let createPost = () => {
    let newPostForm = $("#new-post-form");

    newPostForm.submit((event) => {
      event.preventDefault();

      $.ajax({
        method: "POST",
        url: "/posts/create",
        data: newPostForm.serialize(),
        success: (data) => {
          let newPost = newPostDOM(data.data.post);
          $("#posts-list-container").prepend(newPost);

          deletePost($(" .delete-post", newPost));

          showNotiMsg("success", data.message);
        },
        error: (error) => {
          console.log(error.responseText);
        },
      });
    });
  };

  // Add post to DOM

  let newPostDOM = (post) => {
    return $(`<li class="post-card" id="post-${post.id}">
      <div class="post-header">
        <div class="display-3">${post.user.name}</div>
        <a href="/posts/destroy/${post.id}" class="delete-post"
          ><i class="fa fa-trash" aria-hidden="true"></i
        ></a>
      </div>
    
      <div class="display-5 timestamp">${post.posted_time}</div>
      <p class="post-content">${post.content}</p>
    
      <form action="/comment/create %>" method="post">
        <div>
          <textarea
            name="content"
            placeholder="Write a comment..."
            cols="30"
            rows="1"
            id="comment-textarea"
            required
          ></textarea>
          <input type="hidden" name="post" value="${post.id}" />
          <div class="button-space">
            <button type="submit">
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>

        <div class="comments-container">
        <ul class="comments-list" id="post-comments-${post.id}">
        </ul>
        </div>
    
      </form>
      </li>`);
  };

  let deletePost = (deleteLink) => {
    $(deleteLink).click((event) => {
      event.preventDefault();
      $.ajax({
        type: "GET",
        url: $(deleteLink).prop("href"),
        dataType: "json",
        success: (data) => {
          $(`#post-${data.data.post_id}`).remove();
          showNotiMsg("success", data.message);
        },
        error: (err) => {
          console.log(err.responseText);
        },
      });
    });
  };

  let showNotiMsg = (status, message) => {
    new Noty({
      theme: "metroui",
      text: message,
      type: status,
      layout: "topRight",
      timeout: 2000,
    }).show();
  };

  createPost();
}
