const {Thought, User, Reaction} = require('../models');

module.exports = {
    async GetUsers(req, res) {
        try {
            const users = await User.find({})
            .populate({
                path: 'thoughts',
                populate: {
                    path: 'reactions'
                }
            })
            .populate({
                path: 'friends',
            })
            .sort({ _id: -1 });
            res.json({
                message: "Retrieved all Users",
                users: users
            });
        } catch (err) {
            console.error("Error retrieving users: ", err.message);
            res.status(500).json({
                message: "Error retrieving users",
                error: err.message
            });
            }
    },
    async GetUser(req, res) {
        try {
            const user = await User.findById(req.params.id)
            .populate({
                path: 'thoughts',
                populate: {
                    path: 'reactions'
                }
            })
            .populate({
                path: 'friends',
            });
            if (!user) {
                res.status(404).json({ message: "No user found with this id!" });
                return;
            }
            res.json({
                message: "Here is the IDed User",
                user: user
            });
        } catch (err) {
            console.error("Error retrieving user: ", err.message);
            res.status(500).json({
                message: "Error retrieving user",
                error: err.message
            });
        }
    },
    async CreateUser(req, res) {
        try {
            const user = await User.create(req.body);
            await user.save();
            res.json({
                message: "This User has been created", 
                user: user
            });
        } catch (err) {
            console.error("Error creating user: ", err.message);
            res.status(500).json({
                message: "Error creating user",
                error: err.message
            });
        }
    },
    async PutUser(req, res) {
        try {
            const user = await User.findByIdAndUpdate(
                req.params.id, 
                req.body, 
                { new: true, runValidators: true}
            );
            if (!user) {
                res.status(404).json({ message: "No user found with this id!" });
                return;
            }
            res.json({
                message:"This user has been updated",
                user: user
            });
        } catch (err) {
            console.error("Error updating user: ", err.message);
            res.status(500).json({
                message: "Error updating user",
                error: err.message
            });
        }
    },
    async DeleteUser(req, res) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            if (!user) {
                res.status(404).json({ message: "No user found with this id!" });
                return;
            }
            await Thought.deleteMany({ user: req.params.id });
            await User.updateMany(
                { friends: req.params.id },
                { $pull: { friends: req.params.id } }
            );
            await Reaction.deleteMany({ user: req.params.id });
            res.json({
                message: "This User has been Deleted",
                user: user
                });
        } catch (err) {
            console.error("Error deleting user: ", err.message);
            res.status(500).json({
                message: "Error deleting user",
                error: err.message
            });
        }
    },
    async newFriend(req, res) {
        try {
            const user = await User.findById(req.params.userId);
                if (!user) {
                    res.status(404).json({ message: "No user found with this id!" });
                    return;
                }
            if (user.friends.includes(req.params.friendId)) {
                res.status(400).json({ message: "This user is already a friend!" });
                return;
            }
            user.friends.push(req.params.friendId);
                await user.save();
            res.json(user);
        } catch (err) {
            console.error("Error adding friend: ", err.message);
            res.status(500).json({
                message: "Error adding friend",
                error: err.message
            });
        }
    },
    async deleteFriend(req, res) {
        try {
            const user = await User.findById(req.params.userId);
            if (!user) {
                res.status(404).json({ message: "No user found with this id!" });
                return;
            }
            if (!user.friends.includes(req.params.friendId)) {
                res.status(400).json({ message: "This user is not a friend!" });
                return;
            }
            user.friends.pull(req.params.friendId);
            await user.save();
            res.json({user: user,
                message: "Friend has been deleted"
            });
        } catch (err) {
            console.error("Error deleting friend: ", err.message);
            res.status(500).json({
                message: "Error deleting friend",
                error: err.message
            });
        }
    },
};
