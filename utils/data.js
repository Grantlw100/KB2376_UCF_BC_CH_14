const usersData = [
    {
        username: 'test1',
        email: '1@mail.com',
    },
    {
        username: 'test2',
        email: '2@mail.com',
    },
    {
        username: 'test3',
        email: '3@mail.com',
    },
    {
        username: 'test4',
        email: '4@mail.com',
    }
];

const thoughtsData = [
    {
        thoughtText: 'test1',
        createdAt: new Date('2021-01-01'),
        username: 'test1',
        reactions: []
    },
    {
        thoughtText: 'test2',
        createdAt: new Date('2021-02-02'),
        username: 'test2',
        reactions: []
    },
    {
        thoughtText: 'test3',
        createdAt: new Date('2021-03-03'),
        username: 'test3',
        reactions: []
    },
    {
        thoughtText: 'test4',
        createdAt: new Date('2021-04-04'),
        username: 'test4',
        reactions: []
    },
    {
        thoughtText: 'test5',
        createdAt: new Date('2021-05-05'),
        username: 'test5',
        reactions: []
    }
];


module.exports = { usersData, thoughtsData };