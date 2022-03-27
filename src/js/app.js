const Utils = require('./utils');
const CommentsScreen = require('./cmmentsScreen');

new Utils();

const container = document.querySelector("#comments");
const comments = new CommentsScreen(container);
comments.initialise();