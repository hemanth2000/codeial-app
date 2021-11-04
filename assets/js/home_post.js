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

          createComment($(" .comment-form", newPost));

          showNotiMsg("success", data.message);

          $("#new-post-form>textarea").val("");
        },
        error: (error) => {
          console.log(error.responseText);
        },
      });
    });
  };

  let createComment = (commentLink) => {
    let newCommentForm = $(commentLink);

    newCommentForm.submit((event) => {
      event.preventDefault();

      $.ajax({
        method: "POST",
        url: "/comment/create",
        data: newCommentForm.serialize(),
        success: (data) => {
          console.log(data);
          let postid = data.data.post;
          let newComment = newCommentDOM(data.data);
          $(`#post-comments-${postid}`).prepend(newComment);

          deleteComment($(" .delete-comment", newComment));

          $(" #comment-textarea", newCommentForm).val("");

          showNotiMsg("success", data.message);
        },
        error: (err) => {
          console.log(err.responseText);
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
    
      <form action="/comment/create" method="post" class="comment-form">
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
        </form>

        <div class="comments-container">
        <ul class="comments-list" id="post-comments-${post.id}">
        </ul>
        </div>
    
      </li>`);
  };

  let newCommentDOM = (comment) => {
    return $(`<li class="comment" id="comment-${comment._id}">
    <div>
      <div>
        <span>${comment.user.name}</span>
        <p class="comment-content">${comment.content}</p>
      </div>
      <a class="delete-comment" href="/comment/destroy/${comment._id}"
        ><i class="fas fa-ellipsis-h"></i
      ></a>
    </div>
    <p class="display-5">
      <span>Like</span><span>Comment</span><span>${comment.posted_time}</span>
    </p>
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

  let deleteComment = (deleteLink) => {
    $(deleteLink).click((event) => {
      event.preventDefault();
      $.ajax({
        type: "GET",
        url: $(deleteLink).prop("href"),
        dataType: "json",
        success: (data) => {
          $(`#comment-${data.comment._id}`).remove();
          showNotiMsg("success", data.message);
        },
        error: (err) => {
          console.log(err.responseText);
        },
      });
    });
  };

  let addBtns = () => {
    let delPostLinks = $(".delete-post");
    for (let i = 0; i < delPostLinks.length; i++) {
      deletePost(delPostLinks[i]);
    }

    let createCommentLink = $(".comment-form");
    for (let i = 0; i < createCommentLink.length; i++) {
      createComment(createCommentLink[i]);
    }

    let delCommentLinks = $(".delete-comment");
    for (let i = 0; i < delCommentLinks.length; i++) {
      deleteComment(delCommentLinks[i]);
    }
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
  addBtns();
}
