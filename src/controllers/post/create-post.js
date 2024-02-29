const createPost = async (req, res) => {
    const {
        db: { Post },
        params: { user_id }, 
        body: { titleCap, description, location, image, start_time, end_time, date_of_event, cords}, 
    } = req;

    const post = await Post.createPost(user_id, titleCap, description, location, image, start_time, end_time, date_of_event, cords);

    post ? res.status(201).send(post) : res.status(500).send('Internal Server Error');
  
};

module.exports = createPost;
