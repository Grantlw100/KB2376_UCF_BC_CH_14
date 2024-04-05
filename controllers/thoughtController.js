const {Thought, User} = require('../models');

module.exports = {
    async getAllThoughts(req, res) {
        try {
            const dbThoughtData = await Thought.find({})
                .populate({
                    path: 'reactions',
                    select: '-__v'
                })
                .select('-__v')
                .sort({_id: -1});
            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    async getThoughtById({params}, res) {
        try {
        const dbThoughtData = await Thought.findOne(
            {_id: params.id}
            )
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v');
        if (!dbThoughtData) {
            res.status(404).json({message: 'No thought found with this id!'});
            return;
        }
        res.json(dbThoughtData);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
    },
    async createThought({body}, res) {
        try {
            const dbThoughtData = await Thought.create(body);
            res.json(dbThoughtData);
        } catch (err) {
            res.status(400).json(err);
        }
    },
    async updateThought({params, body}, res) {
        try {
        const dbThoughtData = await Thought.findOneAndUpdate(
            {_id: params.id},
            body,
            {new: true, runValidators: true}
        );
        if (!dbThoughtData) {
            res.status(404).json({message: 'No thought found with this id!'});
            return;
        }
        res.json(dbThoughtData);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
    },
    async deleteThought({params}, res) {
        try {
        const dbThoughtData = await Thought.findOneAndDelete({_id: params.id});
        if (!dbThoughtData) {
            res.status(404).json({message: 'No thought found with this id!'});
            return;
        }
        res.json(dbThoughtData);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
    },
    async addReaction({params, body}, res) {
        try {
        const dbReactionData = await Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$push: {reactions: body}},
            {new: true, runValidators: true}
        );
        if (!dbReactionData) {
            res.status(404).json({message: 'No thought found with this id!'});
            return;
        }
        res.json(dbReactionData);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
    },
async removeReaction({ params }, res) {
    try {
        const dbReactionData = await Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { _id: params.reactionId } } },
            { new: true }
        );
        if (!dbReactionData) {
            return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json(dbReactionData);
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
}

};


