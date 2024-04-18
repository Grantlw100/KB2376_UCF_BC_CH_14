const {Schema, model} = require('mongoose');

const ReactionSchema = new Schema({
    reactionType: {
        type: String,
        required: true,
        enum: [
            'Liked', 'Loved', 'Laughed', 'Disliked', 'Sad', 'Angry'
        ],
        default: 'Liked'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    thought: {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
        required: true
    }
}, {
    versionKey: false,
    id: false,
    timestamps: true
});

const Reaction = model('Reaction', ReactionSchema);

module.exports = Reaction;