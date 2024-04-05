const { Thought, User } = require('../models');

module.exports = {
    async getAllUsers(req, res) {
        try {
            const dbUserData = await User.find({})
                .populate({ path: 'thoughts', select: '-__v' })
                .populate({ path: 'friends', select: '-__v' })
                .select('-__v')
                .sort({ _id: -1 });
            res.json(dbUserData);
        } catch (err) {
            console.error(err);
            res.status(400).json(err);
        }
    },

    async getUserById({ params }, res) {
        try {
            const dbUserData = await User.findOne({ _id: params.id })
                .populate({ path: 'thoughts', select: '-__v' })
                .populate({ path: 'friends', select: '-__v' })
                .select('-__v');
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(dbUserData);
        } catch (err) {
            console.error(err);
            res.status(400).json(err);
        }
    },

    async createUser({ body }, res) {
        try {
            const dbUserData = await User.create(body);
            res.json(dbUserData);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    async updateUser({ params, body }, res) {
        try {
            const dbUserData = await User.findOneAndUpdate(
                { _id: params.id },
                body,
                { new: true, runValidators: true }
            );
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(dbUserData);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    async deleteUser({ params }, res) {
        try {
            const dbUserData = await User.findOneAndDelete({ _id: params.id });
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            await Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
            await User.updateMany(
                { friends: { $in: params.id } },
                { $pull: { friends: params.id } }
            );
            res.json({ message: 'User and associated thoughts deleted!' });
        } catch (err) {
            res.status(400).json(err);
        }
    },

    async addFriend({ params }, res) {
        try {
            const dbUserData = await User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { friends: params.friendId } },
                { new: true, runValidators: true }
            ).populate({ path: 'friends', select: '-__v' });
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(dbUserData);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    async removeFriend({ params }, res) {
        try {
            const dbUserData = await User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { friends: params.friendId } },
                { new: true, runValidators: true }
            ).populate({ path: 'friends', select: '-__v' });
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(dbUserData);
        } catch (err) {
            res.status(400).json(err);
        }
    }
};
