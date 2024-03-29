const createComment = async (req, res) => {
    const {
        db: { Comment },
        params: { post_id, user_id }, // in the URL params
        body: { content}
    } = req;

    const comment = await Comment.create(post_id, user_id, content);

    res.send(comment);
    
}

module.exports = createComment;