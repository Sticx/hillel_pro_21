const FindPost = function ({form, inputID, btnSend, userIdPost, idPost, titlePost, bodyPost, commentsPost, infoPost,})
{
    const myForm = document.querySelector(form);
    const idInput = document.querySelector(inputID);
    const sendBtn = document.querySelector(btnSend);
    const postUserId = document.querySelector(userIdPost);
    const posId = document.querySelector(idPost);
    const postTitle = document.querySelector(titlePost);
    const postBody = document.querySelector(bodyPost);
    const postComments = document.querySelector(commentsPost);
    const postInfo = document.querySelector(infoPost);

    myForm.addEventListener("submit", (event) => {
        event.preventDefault();
        event.target.reset();
        postComments.innerHTML = "";
        this.openCommentsBtn
            ? this.openCommentsBtn.removeAttribute("disabled", "disabled")
            : this.openCommentsBtn;
        this.closeCommentsBtn
            ? this.closeCommentsBtn.remove()
            : this.closeCommentsBtn;
    });

    this.checkID = () => {
        idInput.addEventListener("input", () => {
            this.idValue = idInput.value;
        });
    };

    this.findId = function () {
        this.checkID();
        sendBtn.addEventListener("click", async () => {
            this.openCommentsBtn
                ? this.openCommentsBtn.remove()
                : this.openCommentsBtn;
            let response = await fetch(`https://jsonplaceholder.typicode.com/posts?id=${this.idValue}`)
            let data = await response.json()
            const post = data[0];
            if (!post) {
                return;
            }
            postUserId.innerText = `UserId: ` + post.userId;
            posId.innerText = `Id: ` + post.id;
            postBody.innerText = `Body: ` + post.body;
            postTitle.innerText = `Title: ` + post.title;

            this.openComments();
        });
    };

    this.openComments = () => {
        this.openCommentsBtn = document.createElement("button");
        postInfo.appendChild(this.openCommentsBtn).innerText = "Open Comments";
        this.openCommentsBtn.addEventListener("click", async () => {
            this.closeComment();
            let response = await fetch(`https://jsonplaceholder.typicode.com/post/${this.idValue}/comments`)
            let comment = await response.json()
            const comments = comment.map((comment) => {
                return `
              <div>Name: ${comment.name}</div>
              <div>Email: ${comment.email}</div>
              <div>Comment: ${comment.body}</div>
            `;
            });
            postComments.innerHTML = comments.join("");
        });
    };

    this.closeComment = () => {
        this.openCommentsBtn.setAttribute("disabled", "disabled");
        this.closeCommentsBtn = document.createElement("button");
        postInfo.appendChild(this.closeCommentsBtn).innerText = "Close Comments";
        this.closeCommentsBtn.addEventListener("click", () => {
            this.clearElements();
        });
    };

    this.clearElements = () => {
        this.openCommentsBtn.removeAttribute("disabled", "disabled");
        this.closeCommentsBtn.remove();
        postComments.innerHTML = "";
    };
};

const findPost = new FindPost({
    form: ".js--form",
    inputID: ".js--input-id",
    btnSend: ".js--btn-send",
    userIdPost: ".js--user-id-post",
    idPost: ".js--id-post",
    titlePost: ".js--title-post",
    bodyPost: ".js--body-post",
    commentsPost: ".js--comments-post",
    infoPost: ".js--info-post",
});
findPost.findId();