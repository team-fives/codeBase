const { hashPassword } = require('../../utils/auth-utils');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {

  await knex('likes').del();
  await knex('comments').del();
  await knex('posts').del();
  await knex('users').del();

  await knex('users').insert([
    { username: 'cool_cat', password_hash: await hashPassword('1234'), profile_image: 'https://previews.123rf.com/images/lineartestpilot/lineartestpilot1802/lineartestpilot180240995/95238851-cartoon-cool-guy.jpg', bio: 'i am a cool guy' },
    { username: 'l33t-guy', password_hash: await hashPassword('1234'), profile_image: 'https://hips.hearstapps.com/hmg-prod/images/free-guy-ryan-reynolds-1628082188.jpg?crop=0.529xw:0.353xh;0.237xw,0&resize=1200:*', bio: 'leet guy i am' },
    { username: 'wowow', password_hash: await hashPassword('1234'), profile_image: 'https://as1.ftcdn.net/v2/jpg/05/15/68/02/1000_F_515680231_lFQW9jPedHIy9O5E4dX6vRO8ajpTHMdG.jpg', bio: 'WOW!' },
    { username: 'default-user', password_hash: await hashPassword('1234') },
  ]);

  await knex.table('posts').insert([
    {user_id: 1, title: 'Plastic bottle hunt', description: 'Picking up plastic bottles that are laying around and putting them in our trash bags', location: 'Central Park', image: 'https://reinventsouthafrica.files.wordpress.com/2014/12/20141206_083933.jpg?w=640' },
    {user_id: 2, title: 'Community Garden Day', description: 'Helping maintain the community garden and planting new flowers.', location: 'Community Garden', image: 'https://live.staticflickr.com/8636/28251733106_198e86680c.jpg' },
    {user_id: 3, title: 'Beach Cleanup', description: 'Cleaning up litter on the beach for a cleaner environment.', location: 'Ocean Beach', image: 'https://response.restoration.noaa.gov/sites/default/files/images/%5Buid%5D/20160413_NOAA_CREP_003_0.JPG' },
    {user_id: 4, title: 'test 1', description: 'test 1', location: 'test 1'}, 
    {user_id: 4, title: 'test 2', description: 'test 2', location: 'test 2' },
    {user_id: 4, title: 'test 3', description: 'test 3', location: 'test 3' },
    {user_id: 4, title: 'test 4', description: 'test 4', location: 'test 4' },
    {user_id: 4, title: 'test 5', description: 'test 5', location: 'test 5' },
    {user_id: 4, title: 'test 6', description: 'test 6', location: 'test 6' },
    {user_id: 4, title: 'test 7', description: 'test 7', location: 'test 7' },
    {user_id: 4, title: 'test 8', description: 'test 8', location: 'test 8' },
    {user_id: 4, title: 'test 9', description: 'test 9', location: 'test 9' },
    {user_id: 4, title: 'test 10', description: 'test 10', location: 'test 10' },
  ]);

  await knex.table('comments').insert([
    { user_id: 2, post_id: 1, content: 'This is an amazing post!'},
    { user_id: 3, post_id: 1, content: 'I also agree that this is amazing!'},
    { user_id: 1, post_id: 1, content: 'This is my post!'},
    { user_id: 4, post_id: 2, content: 'test 1'},
    { user_id: 4, post_id: 2, content: 'test 2' },
    { user_id: 4, post_id: 2, content: 'test 3' },
    { user_id: 4, post_id: 2, content: 'test 4' },
    { user_id: 4, post_id: 2, content: 'test 5' },
  ]);

  await knex.table('likes').insert([
    {user_id: 2, post_id: 1, likes_amount: 1 },
    {user_id: 3, post_id: 1, likes_amount: 1 },
    {user_id: 4, post_id: 1, likes_amount: 1 },
    {user_id: 1, post_id: 2, likes_amount: 1 },
    {user_id: 3, post_id: 2, likes_amount: 1 },
  ]);

};
