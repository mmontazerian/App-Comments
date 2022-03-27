// Displaying header section in UI
const headerSection = (count, comments) => `<section class="header-container">
<i class="glyphicon glyphicon-comment"></i>
<h2 class="title"> ${count} Comments</h2>
<div class="sort-container">
    <h4>Sort</h4>
    <ul>
        <li class="countLikes" role="button">Likes</li>
    </ul>
</div>
</section>
${comments}`;

// Displaying comment section in UI
const commentSection = ({ name, body, likes }) => `<section class="comment-container">
<div>
<h3 class="user-name">${name}</h3>
<p class="description">${body}</p>
</div>
<p class="count">${likes} Likes</p>
</section>`;


class CommentsScreen {

constructor(container) {
    this.container = container;
    this.comments = [];
}

listComments() {
    const comments = this.comments;
    const count = comments.length;
    const commentsDescr = comments.map(decription => commentSection(decription)).join(' ');
    const headerSections = headerSection(count, commentsDescr);
    this.container.innerHTML = headerSections;
}

// sort the comments by date has priority to likes
sortByDate() {
    this.sort = this.sort === "date" ? "likes" : "date";
    this.comments = this.comments.sort((a, b) => {
        if (this.sort === "date") {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        }
        return b.likes - a.likes;
    });
}

// enabling sort button 
// if is cliked sort by most liked
sortByLikes() {
    const sortLikes = this.container.querySelector(".countLikes");
    sortLikes.addEventListener("click", this.render.bind(this));
    if (this.sort === 'likes') {
        sortLikes.classList.add('selected');
    }
    else {
        sortLikes.classList.remove('selected');
    }
}

render() {
    this.sortByDate();
    this.listComments();
    this.sortByLikes();
}

setComments(comments) {
    this.comments = comments;
}

// loading the data from database (URL PROVIDED)
loadData() {
    return fetch('https://my-json-server.typicode.com/telegraph/frontend-exercise/comments')
        .then(response => response.json())
        .then(data => data)
        .catch(err => {
            console.log("Please try again, there is some issue!", err);
        });
}

initialise() {
    this.loadData()
        .then(comments => {
            this.setComments(comments);
            this.render();
        });
}

}

module.exports = CommentsScreen;