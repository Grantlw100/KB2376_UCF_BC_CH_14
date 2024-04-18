const {Schema, model } = require('mongoose');

const ThoughtSchema = new Schema({
    thought: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reactions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Reaction'
        }
    ], 
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
    versionKey: false,
    timestamps: true
});

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;