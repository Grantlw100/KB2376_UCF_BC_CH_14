
const userSeed = [
    {
    username: 'testUser1',
    email: 'testUser@email.com',
    password: 'password1',
    thoughts: [],
    friends: []
    },
    {
    username: 'Usertest2',
    email: 'testUser2@email.com',
    password: 'password2',
    thoughts: [],
    friends: []
    },
    {
    username: 'tUserest3',
    email: 'TestUser3@email.com',
    password: 'password3',
    thoughts: [],
    friends: []
    },
]

const thoughtSeed = [
    {
        thought: 'This is a test thought',
        reactions: []
    },
    {
        thought: 'This is another test thought',
        reactions: []
    },
    {
        thought: 'This is a third test thought',
        reactions: []
    }
]

const reactionSeed = [
    {
        reactionType: 'Liked', 
    },
    {
        reactionType: 'Loved',
    },
    {
        reactionType: 'Laughed',
    },
    {
        reactionType: 'Disliked',
    },
    {
        reactionType: 'Sad',
    },
    {
        reactionType: 'Angry',
    }
];

module.exports = { userSeed, thoughtSeed, reactionSeed}