const {Thought, User, Reaction } = require('../models');

module.exports = {
    async GetThoughts(req, res) {
        try {
            const thoughts = await Thought.find({})
            .populate({
                path: 'user',
            })
            .populate({
                path: 'reactions',
            })
            .sort({ _id: -1 });
            res.json({
                message: "Retrieved all Thoughts",
                thoughts: thoughts
            });
        } catch (err) {
            console.error("Error retrieving thoughts: ", err.message);
            res.status(500).json({
                message: "Error retrieving thoughts",
                error: err.message
            });
        }
    },
    async GetThought(req, res) {
        try {
            const thought = await Thought.findById(req.params.id)
            .populate({
                path: 'user',
            })
            .populate({
                path: 'reactions',
            });
            if (!thought) {
                res.status(404).json({ message: "No thought found with this id!" });
                return;
            }
            res.json({
                message: "Here is the IDed Thought",
                thought: thought
            });
        } catch (err) {
            console.error("Error retrieving thought: ", err.message);
            res.status(500).json({
                message: "Error retrieving thought",
                error: err.message
            });
        }
    },
    async CreateThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            await thought.save();
            res.json({
                message: "Thought created",
                thought: thought
            });
        } catch (err) {
            console.error("Error creating thought: ", err.message);
            res.status(500).json({
                message: "Error creating thought",
                error: err.message
            });
        }
    },
    async PutThought(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.id, 
                req.body,
                { new: true }
            );
            if (!thought) {
                res.status(404).json({ message: "No thought found with this id!" });
                return;
            }
            res.json({
                message: "Thought updated",
                thought: thought
            });
        } catch (err) {
            console.error("Error updating thought: ", err.message);
            res.status(500).json({
                message: "Error updating thought",
                error: err.message
            });
        }
    },
    async DeleteThought(req, res) {
        try {
            const thought = await Thought.findByIdAndDelete(req.params.id);
            if (!thought) {
                res.status(404).json({ message: "No thought found with this id!" });
                return;
            }
            await Reaction.deleteMany({ thought: req.params.id });
            res.json({
                message: "Thought deleted",
                thought: thought
            });
        } catch (err) {
            console.error("Error deleting thought: ", err.message);
            res.status(500).json({
                message: "Error deleting thought",
                error: err.message
            });
        }
    },
    async CreateReaction(req, res) {
        try {
            const reaction = await Reaction.create(req.body);
            await reaction.save();
            const updatedThought = await Thought.findByIdAndUpdate(
                req.params.thoughtId, 
                { $push: { reactions: reaction._id } },
                { new: true, runValidators: true } 
            );
            if (!updatedThought) {
                res.status(404).json({ message: "No thought found with this id!" });
                return;
            }
            res.json({
                message: "Reaction created",
                reaction: reaction
            });
        } catch (err) {
            console.error("Error creating reaction: ", err.message);
            res.status(500).json({
                message: "Error creating reaction",
                error: err.message
            });
        }
    },
    async DeleteReaction(req, res) {
        try {
            const reaction = await Reaction.findByIdAndDelete(req.params.reactionId);
            if (!reaction) {
                res.status(404).json({ message: "No reaction found with this id!" });
                return;
            }
            await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $pull: { reactions: req.params.reactionId } },
                { new: true }
            );
            res.json({
                message: "Reaction deleted",
                reaction: reaction
            });
        } catch (err) {
            console.error("Error deleting reaction: ", err.message);
            res.status(500).json({
                message: "Error deleting reaction",
                error: err.message
            });
        }
    }
};