const knex = require('../knex');

class Post {

  constructor({ id, user_id, title, description, location, image, start_time, end_time, cords, date_of_event, date_created}) {
    this.id = id;
    this.user_id = user_id;
    this.title = title;
    this.description = description;
    this.location = location;
    this.image = image;
    this.start_time = start_time;
    this.end_time = end_time;
    this.cords = cords;
    this.date_of_event = date_of_event;
    this.date_created = date_created;
  }

  static async listAllPost() {
    const query = 'SELECT * FROM posts';
    const { rows } = await knex.raw(query);
    // use the constructor to hide each user's passwordHash
    return rows.map((post) => new Post(post));
  }

  static async find(id) {
    const query = 'SELECT * FROM posts WHERE id = ?';
    const args = [id];
    const { rows } = await knex.raw(query, args);
    const post = rows[0];
    return post ? new Post(post) : null;
  }

  static async findAllPostByUser(user_id) {
    const query = 'SELECT * FROM posts WHERE user_id = ?';
    const args = [user_id];
    console.log(args)
    const { rows } = await knex.raw(query, args);
    const posts = rows.map(post => new Post(post));
    return posts;
  }

  static async createPost(user_id, titleCap, description, location, image, start_time, end_time, date_of_event, cords) {
    const query = `INSERT INTO posts (user_id, title, description, location, image, end_time, start_time, date_of_event, cords)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ? ) RETURNING *`;
    const args = [user_id, titleCap, description, location, image, start_time, end_time, date_of_event, cords];
    const { rows } = await knex.raw(query, args);
    const post = rows[0];
    return new Post(post);
  }

  static async updatePost(title, description, location, image, id, start_time, end_time, cords, date_of_event) {
    const query = `UPDATE posts
      SET title = ?, description = ?, location = ?, image = ?, start_time = ?, end_time = ?, date_of_event = ?, cords = ?,
      WHERE id = ? RETURNING *`;
    const args = [title, description, location, image, id, start_time, end_time, date_of_event, cords];
    const { rows } = await knex.raw(query, args);
    const post = rows[0];
    return new Post(post);
  }

  static async deletePost(id) {
    const query = `DELETE FROM posts WHERE id = ? RETURNING *`;
    const args = [id];
    const { rows } = await knex.raw(query, args);
    const post = rows[0];
    return new Post(post);
  }
}

module.exports = Post;
