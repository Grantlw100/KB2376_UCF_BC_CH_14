require("dotenv").config();
const mongoose = require("mongoose");
const { User, Thought, Reaction } = require("../models");
const { reactionSeed, thoughtSeed, userSeed } = require("./data");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function seedDatabase() {
  try {
    await mongoose.connection.once("open", () => {
      console.log("MongoDB connected.");
    });

    await Thought.deleteMany({});
    await User.deleteMany({});
    await Reaction.deleteMany({});

    const users = await User.insertMany(userSeed);

    const thoughts = await Promise.all(
      thoughtSeed.map(async (thought, index) => {
        const newThought = await Thought.create({
          ...thought,
          user: users[index % users.length]._id,
        });
        await User.findByIdAndUpdate(users[index % users.length]._id, {
          $push: { thoughts: newThought._id },
        });
        return newThought;
      })
    );

    await Promise.all(
      reactionSeed.map(async (reaction, index) => {
        const newReaction = await Reaction.create({
          ...reaction,
          user: users[index % users.length]._id,
          thought: thoughts[index % thoughts.length]._id,
        });
        await Thought.findByIdAndUpdate(thoughts[index % thoughts.length]._id, {
          $push: { reactions: newReaction._id },
        });
        return newReaction;
      })
    );

    console.log("Data seeded successfully!");
  } catch (err) {
    console.error("Error seeding data: ", err.message);
  } finally {
    mongoose.disconnect();
    console.log("MongoDB disconnected.");
  }
}

seedDatabase();
