const create = require('./create-like');
const remove = require('./delete-like');
const listLikes = require('./list-likes');
const totalPostLikes = require('./group-post-likes');
const listUserPostLikes = require('./group-user-likes');
const findUserLike = require('./find-user-like')

module.exports = {
    create,
    remove,
    listLikes,
    totalPostLikes,
    listUserPostLikes,
    findUserLike,
};
