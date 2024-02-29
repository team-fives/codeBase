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
    { username: 'david', password_hash: await hashPassword('1234'), profile_image: '../../../frontend/src/imgs/david.jpg', bio: "Passionate about preserving our planet | Advocate for sustainable living | Let's work together to create a greener future! | Lover of nature, protector of wildlife | Join me in making a difference! #Sustainability #ClimateAction"},
    { username: 'gonzalo', password_hash: await hashPassword('1234'), profile_image: 'https://hips.hearstapps.com/hmg-prod/images/free-guy-ryan-reynolds-1628082188.jpg?crop=0.529xw:0.353xh;0.237xw,0&resize=1200:*', bio: "Passionate about conservation and sustainable living. Let's work together to protect our planet for future generations. #Environmentalism #Sustainability" },
    { username: 'jason', password_hash: await hashPassword('1234'), profile_image: 'https://as1.ftcdn.net/v2/jpg/05/15/68/02/1000_F_515680231_lFQW9jPedHIy9O5E4dX6vRO8ajpTHMdG.jpg', bio: 'Passionate environmentalist dedicated to protecting ecosystems and promoting sustainable living practices. Committed to raising awareness and taking action for a healthier planet.' },
    { username: 'joseph', password_hash: await hashPassword('1234'), profile_image: 'https://previews.123rf.com/images/lineartestpilot/lineartestpilot1802/lineartestpilot180240995/95238851-cartoon-cool-guy.jpg', bio: ''},
  ]);

  await knex.table('posts').insert([
  { user_id: 1, title: 'Eco-Friendly DIY Workshop', description: 'Hosting a workshop on creating eco-friendly crafts from recycled materials.', location: 'Bryant Park', image: 'https://lollibox.sg/wp-content/uploads/2021/02/Completed-DIY-Soccer-Table.jpg', start_time: '1:00', end_time: '2:00', date_of_event: '2024-05-01', cords: { lat: 40.7535, lng: 73.9830 }},
  { user_id: 2, title: 'Upcycled Fashion Show', description: 'Showcasing fashionable outfits made entirely from upcycled materials.', location: 'Downtown Theater', image: 'https://www.ls3p.com/wp-content/uploads/2019/06/MicrosoftTeams-image-7.jpg', start_time: '3:30', end_time: '5:30', date_of_event: '2024-05-15', cords: { lat: 40.7163, lng: 74.0168 }},
  { user_id: 3, title: 'Recycling Drive Success!', description: 'Celebrating the results of our recent recycling drive, where we collected tons of recyclables from the community.', location: 'City Hall Plaza', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBWpbWGI3MLACGr8WhP_CSnsOZEfVUATW80g&usqp=CAU', start_time: '10:00', end_time: '12:00', date_of_event: '2024-05-10', cords: {"lat": 40.7439905, "lng": -74.0323626} },
  { user_id: 4, title: 'Community Compost Project Kickoff', description: 'Launching a community composting initiative to reduce organic waste.', location: 'Local Park', image: 'https://www.biocycle.net/wp-content/uploads/2013/11/22a.jpg', start_time: '09:00', end_time: '11:00', date_of_event: '2024-05-20', cords: {"lat": 40.7647238, "lng": -73.8306716} },
  { user_id: 4, title: 'Zero Waste Picnic', description: 'Organizing a picnic where all utensils and packaging are reusable or compostable.', location: 'Sunny Meadows Park', image: 'https://pbs.twimg.com/media/FVmCBW4WAAIV_vR.jpg', start_time: '8:00', end_time: '12:00', date_of_event: '2024-06-01', cords: {"lat": 40.6564675, "lng": -74.00676059999999} },
  {user_id: 1, title: 'Plastic bottle hunt', description: 'Picking up plastic bottles that are laying around and putting them in our trash bags', location: 'Central Park', image: 'https://reinventsouthafrica.files.wordpress.com/2014/12/20141206_083933.jpg?w=640', start_time: '7:00', end_time: '9:00', date_of_event: '2024-07-01', cords: {"lat": 40.6895314, "lng": -74.1744624} },
  {user_id: 2, title: 'Community Garden Day', description: 'Helping maintain the community garden and planting new flowers.', location: 'Community Garden', image: 'https://live.staticflickr.com/8636/28251733106_198e86680c.jpg', start_time: '5:00', end_time: '6:00', date_of_event: '2024-08-01', cords: {"lat": 40.5767499, "lng": -73.9837187}  },
  {user_id: 3, title: 'Beach Cleanup', description: 'Cleaning up litter on the beach for a cleaner environment.', location: 'Ocean Beach', image: 'https://response.restoration.noaa.gov/sites/default/files/images/%5Buid%5D/20160413_NOAA_CREP_003_0.JPG', start_time: '8:00', end_time: '8:45', date_of_event: '2024-08-01', cords: { lat: 33.7701, lng: 118.1937 }  },
  ]);

  await knex.table('comments').insert([
  { user_id: 2, post_id: 1, content: 'I would love to attend this workshop!'},
  { user_id: 3, post_id: 1, content: 'Count me in! Sounds like a fantastic event.'},
  { user_id: 4, post_id: 2, content: 'Wow, these outfits are incredible! Such creativity!'},
  { user_id: 4, post_id: 3, content: `Great job, everyone! Let's keep up the momentum!`},
  { user_id: 1, post_id: 4, content: 'Excited to see our community come together for this important project.'},
  ]);

  await knex.table('likes').insert([
  {user_id: 2, post_id: 1, likes_amount: 1 },
  {user_id: 3, post_id: 1, likes_amount: 1 },
  {user_id: 4, post_id: 1, likes_amount: 1 },
  {user_id: 1, post_id: 2, likes_amount: 1 },
  {user_id: 3, post_id: 2, likes_amount: 1 },
  ]);

};
