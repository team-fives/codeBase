const updatePost = async (req, res) => {
  const {
    db: { Post }, 
    body: { title, description, location, image, start_time, end_time, date_of_event }, 
    params: { id }, 
  } = req;

  const post = await Post.find(id);
  if (!post) return res.sendStatus(404);

  const updatedPost = await Post.updatePost(title, description, location, image, id, start_time, end_time, date_of_event); // hasn't been tested 
  res.send(updatedPost);
};

module.exports = updatePost;