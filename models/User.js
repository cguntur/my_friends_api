const {Schema, Types} = require('mongoose');

const userSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function (value) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                },
                message: 'Invalid email address format',
            },
        },
        thoughts: {
            type: Schema.Types.ObjectId,
            ref: 'thought',
        },
        friends: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        }
    },
    {
        toJSON: {
          virtuals: true,
        },
    }
);

//Virtual to return the number of friends for this user
userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;