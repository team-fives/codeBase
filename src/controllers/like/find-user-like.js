const findUserLikeController = async (req, res) => {
    const { 
      db: { Like },
      params: { post_id, user_id }
    } = req; 
  
      const like = await Like.findUserLike(post_id, user_id);

      like ? res.send(like) : res.status(500).send('Could not find like');

  };
  
  module.exports = findUserLikeController;
  