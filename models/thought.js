const {Schema, model} = require('mongoose');

const ReactionSchema = new Schema({
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: { createdAt: true, updatedAt: false } });

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: 'You need to provide a thought!',
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        required: 'You need to provide a username!'
    },
    reactions: [ReactionSchema]
},
{
    toJSON: {
        virtuals: true
    },
    id: false
});

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;