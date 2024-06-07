const {Schema, model} = require('mongoose');
const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        require: true,
        max: 280
    },
    username: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
  });

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            require: true,
            min: 1,
            max: 280
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        username: {
            type: String,
            require: true,
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
          virtuals: true,
        },
    }
);

//Virtual to return the number of reactions
userSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;