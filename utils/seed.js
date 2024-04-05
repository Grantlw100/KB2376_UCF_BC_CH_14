const connection = require('../config/connection');
const { usersData, thoughtsData } = require('./data');
const { User, Thought } = require('../models');



connection.once('open', async () => {
  try {
    await Thought.deleteMany({});
    await User.deleteMany({});

    const createdThoughts = await Thought.create(thoughtsData);
    
    const usersWithThoughts = usersData.map((user, index) => ({
      ...user,
      thoughts: [createdThoughts[index]._id],
    }));

    await User.create(usersWithThoughts);

    console.log('All done!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});
