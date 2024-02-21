const createLike = async (req, res) => {
    const {
    db: { Like },
    params: { post_id, user_id },
    } = req;
    
    const existingLike = await Like.findUserLike( post_id, user_id );
    if (existingLike) return res.status(400).send({error: "User has already liked this post."})

    const likes_amount = 1;

    const like = await Like.addLike(post_id, user_id, likes_amount);
  
    res.send(like);

  };
  
  module.exports = createLike;