export const currentChatroomMock = {
  _id: '63624569b610594d455aada2',
  participants: [
    {
      _id: '6346b85c487f713bee4a392f',
      email: 'aleksandrov@gmail.com',
      picture: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
    },
    {
      _id: '6346b6fc037fb36c421c1694',
      email: 'pavlo@gmail.com',
      picture: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
    },
  ],
  createdAt: '2022-11-02T10:24:41.559Z',
  updatedAt: '2022-11-30T14:00:05.745Z',
  isTyping: false,
  latestMessage: {
    _id: '638761e5399dd8d9613f1cb2',
    sender: {
      _id: '6346b6fc037fb36c421c1694',
      email: 'pavlo@gmail.com',
      picture: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
    },
    content: 'wrwr',
    chatroom: '63624569b610594d455aada2',
    isViewed: false,
    createdAt: '2022-11-30T14:00:05.608Z',
    updatedAt: '2022-11-30T14:00:05.781Z',
  },
};

export const currentChatMessagesMock = [
  {
    sender: {
      _id: '6346b85c487f713bee4a392f',
      email: 'aleksandrov@gmail.com',
      picture: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
    },
    content: 'yo',
    chatroom: {
      _id: '63624569b610594d455aada2',
      participants: [
        {
          _id: '6346b85c487f713bee4a392f',
          email: 'aleksandrov@gmail.com',
          picture: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
        },
        {
          _id: '6346b6fc037fb36c421c1694',
          email: 'pavlo@gmail.com',
          picture: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
        },
      ],
      createdAt: '2022-11-02T10:24:41.559Z',
      updatedAt: '2022-12-07T09:03:58.763Z',
      __v: 0,
      latestMessage: '639056fee2372570678adbea',
    },
    isViewed: true,
    _id: '63905ff9e2372570678add33',
    createdAt: '2022-12-07T09:45:17.386Z',
    updatedAt: '2022-12-07T09:45:17.386Z',
    __v: 0,
  },
  {
    sender: {
      _id: '6346b85c487f713bee4a392f',
      email: 'aleksandrov@gmail.com',
      picture: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
    },
    content: 'hello',
    chatroom: {
      _id: '63624569b610594d455aada2',
      participants: [
        {
          _id: '6346b85c487f713bee4a392f',
          email: 'aleksandrov@gmail.com',
          picture: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
        },
        {
          _id: '6346b6fc037fb36c421c1694',
          email: 'pavlo@gmail.com',
          picture: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
        },
      ],
      createdAt: '2022-11-02T10:24:41.559Z',
      updatedAt: '2022-12-07T09:03:58.763Z',
      __v: 0,
      latestMessage: '639056fee2372570678adbea',
    },
    isViewed: true,
    _id: '63905ff9e2372570678add35',
    createdAt: '2022-12-07T09:42:17.386Z',
    updatedAt: '2022-12-07T09:42:17.386Z',
    __v: 0,
  },
];

export const messageMock = {
  sender: {
    _id: '6346b85c487f713bee4a392f',
    email: 'aleksandrov@gmail.com',
    picture: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
  },
  content: 'test',
  chatroom: {
    _id: '63624569b610594d455aada2',
    participants: [
      {
        _id: '6346b85c487f713bee4a392f',
        email: 'aleksandrov@gmail.com',
        picture: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
      },
      {
        _id: '6346b6fc037fb36c421c1694',
        email: 'pavlo@gmail.com',
        picture: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
      },
    ],
    createdAt: '2022-11-02T10:24:41.559Z',
    updatedAt: '2022-12-07T09:03:58.763Z',
    __v: 0,
    latestMessage: '639056fee2372570678adbea',
  },
  isViewed: false,
  _id: '63905ff9e2372570678add33',
  createdAt: '2022-12-07T09:42:17.386Z',
  updatedAt: '2022-12-07T09:42:17.386Z',
  __v: 0,
};

export const chatsMock = [
  {
    _id: '63624569b610594d455aada2',
    participants: [
      {
        _id: '6346b85c487f713bee4a392f',
        email: 'aleksandrov@gmail.com',
        picture: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
      },
      {
        _id: '6346b6fc037fb36c421c1694',
        email: 'pavlo@gmail.com',
        picture: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
      },
    ],
    isTyping: false,
    createdAt: '2022-11-02T10:24:41.559Z',
    updatedAt: '2022-12-02T11:00:39.547Z',
    latestMessage: {
      _id: '6389dad710f13cccd8c01b1a',
      sender: {
        _id: '6346b6fc037fb36c421c1694',
        email: 'pavlo@gmail.com',
        picture: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
      },
      content: 'wer',
      chatroom: '63624569b610594d455aada2',
      isViewed: true,
      createdAt: '2022-12-02T11:00:39.379Z',
      updatedAt: '2022-12-02T11:00:39.601Z',
    },
  },
  {
    _id: '637c92d6b62a5be3173e82bb',
    participants: [
      {
        _id: '6346b85c487f713bee4a392f',
        email: 'aleksandrov@gmail.com',
        picture: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
      },
      {
        _id: '6346d39c4a8a0d337a45c998',
        email: 'chel2@gmail.com',
        picture: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
      },
    ],
    isTyping: false,
    createdAt: '2022-11-22T09:13:58.284Z',
    updatedAt: '2022-11-28T18:48:40.551Z',
    latestMessage: {
      _id: '638502889d2727fff49a2cd7',
      sender: {
        _id: '6346b6fc037fb36c421c1694',
        email: 'pavlo@gmail.com',
        picture: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
      },
      content: 'фів',
      chatroom: '637c92d6b62a5be3173e82bb',
      isViewed: true,
      createdAt: '2022-11-28T18:48:40.389Z',
      updatedAt: '2022-11-28T18:49:39.350Z',
    },
  },
];

export const userSearchResultsMock = [
  {
    email: 'chel2@gmail.com',
    _id: '6346d39c4a8a0d337a45c998',
    picture: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
  },
  {
    email: 'chel@gmail.com',
    _id: '6346b84f487f713bee4a3929',
    picture: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
  },
  {
    email: 'chuvak@gmail.com',
    _id: '6352baeeaa7a8891188ce227',
    picture: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
  },
];

export const chatWithoutLatestMessageMock = {
  _id: '63624569b610594d455aada2',
  participants: [
    {
      _id: '6346b85c487f713bee4a392f',
      email: 'aleksandrov@gmail.com',
      picture: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
    },
    {
      _id: '6346b6fc037fb36c421c1694',
      email: 'pavlo@gmail.com',
      picture: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
    },
  ],
  isTyping: false,
  createdAt: '2022-11-02T10:24:41.559Z',
  updatedAt: '2022-12-02T11:00:39.547Z',
};

export const unviewedMessagesMock = [
  {
    _id: '638501459d2727fff49a2b19',
    sender: {
      _id: '6346d39c4a8a0d337a45c998',
      email: 'chel2@gmail.com',
      picture: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
    },
    content: 'hello world!',
    chatroom: {
      _id: '637c92d6b62a5be3173e82bb',
      participants: [
        {
          _id: '6346b85c487f713bee4a392f',
          email: 'aleksandrov@gmail.com',
          picture: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
        },
        {
          _id: '6346d39c4a8a0d337a45c998',
          email: 'chel2@gmail.com',
          picture: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
        },
      ],
      createdAt: '2022-11-22T09:13:58.284Z',
      updatedAt: '2022-11-28T18:48:40.551Z',
      latestMessage: '638502889d2727fff49a2cd7',
    },
    isViewed: false,
    createdAt: '2022-11-28T18:43:17.085Z',
    updatedAt: '2022-11-28T18:43:17.342Z',
  },
  {
    sender: {
      _id: '6346b85c487f713bee4a392f',
      email: 'aleksandrov@gmail.com',
      picture: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
    },
    content: 'yo',
    chatroom: {
      _id: '63624569b610594d455aada2',
      participants: [
        {
          _id: '6346b85c487f713bee4a392f',
          email: 'aleksandrov@gmail.com',
          picture: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
        },
        {
          _id: '6346b6fc037fb36c421c1694',
          email: 'pavlo@gmail.com',
          picture: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
        },
      ],
      createdAt: '2022-11-02T10:24:41.559Z',
      updatedAt: '2022-12-07T09:03:58.763Z',
      __v: 0,
      latestMessage: '639056fee2372570678adbea',
    },
    isViewed: false,
    _id: '63905ff9e2372570678add34',
    createdAt: '2022-12-07T09:42:17.386Z',
    updatedAt: '2022-12-07T09:42:17.386Z',
    __v: 0,
  },
  {
    sender: {
      _id: '6346b85c487f713bee4a392f',
      email: 'aleksandrov@gmail.com',
      picture: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
    },
    content: 'hello!',
    chatroom: {
      _id: '63624569b610594d455aada2',
      participants: [
        {
          _id: '6346b85c487f713bee4a392f',
          email: 'aleksandrov@gmail.com',
          picture: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
        },
        {
          _id: '6346b6fc037fb36c421c1694',
          email: 'pavlo@gmail.com',
          picture: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
        },
      ],
      createdAt: '2022-11-02T10:24:41.559Z',
      updatedAt: '2022-12-07T09:03:58.763Z',
      __v: 0,
      latestMessage: '639056fee2372570678adbea',
    },
    isViewed: false,
    _id: '63905ff9e2372570678add43',
    createdAt: '2022-12-07T09:42:17.386Z',
    updatedAt: '2022-12-07T09:42:17.386Z',
    __v: 0,
  },
];

export const currentChatMessagesWithUnviewedMock = [
  {
    sender: {
      _id: '6346b85c487f713bee4a392f',
      email: 'aleksandrov@gmail.com',
      picture: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
    },
    content: 'yo',
    chatroom: {
      _id: '63624569b610594d455aada2',
      participants: [
        {
          _id: '6346b85c487f713bee4a392f',
          email: 'aleksandrov@gmail.com',
          picture: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
        },
        {
          _id: '6346b6fc037fb36c421c1694',
          email: 'pavlo@gmail.com',
          picture: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
        },
      ],
      createdAt: '2022-11-02T10:24:41.559Z',
      updatedAt: '2022-12-07T09:03:58.763Z',
      __v: 0,
      latestMessage: '639056fee2372570678adbea',
    },
    isViewed: true,
    _id: '63905ff9e2372570678add33',
    createdAt: '2022-12-07T09:42:17.386Z',
    updatedAt: '2022-12-07T09:42:17.386Z',
    __v: 0,
  },
  {
    sender: {
      _id: '6346b85c487f713bee4a392f',
      email: 'aleksandrov@gmail.com',
      picture: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
    },
    content: 'hello',
    chatroom: {
      _id: '63624569b610594d455aada2',
      participants: [
        {
          _id: '6346b85c487f713bee4a392f',
          email: 'aleksandrov@gmail.com',
          picture: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
        },
        {
          _id: '6346b6fc037fb36c421c1694',
          email: 'pavlo@gmail.com',
          picture: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
        },
      ],
      createdAt: '2022-11-02T10:24:41.559Z',
      updatedAt: '2022-12-07T09:03:58.763Z',
      __v: 0,
      latestMessage: '639056fee2372570678adbea',
    },
    isViewed: true,
    _id: '63905ff9e2372570678add35',
    createdAt: '2022-12-07T09:42:17.386Z',
    updatedAt: '2022-12-07T09:42:17.386Z',
    __v: 0,
  },
  {
    sender: {
      _id: '6346b85c487f713bee4a392f',
      email: 'aleksandrov@gmail.com',
      picture: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
    },
    content: 'test',
    chatroom: {
      _id: '63624569b610594d455aada2',
      participants: [
        {
          _id: '6346b85c487f713bee4a392f',
          email: 'aleksandrov@gmail.com',
          picture: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
        },
        {
          _id: '6346b6fc037fb36c421c1694',
          email: 'pavlo@gmail.com',
          picture: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
        },
      ],
      createdAt: '2022-11-02T10:24:41.559Z',
      updatedAt: '2022-12-07T09:03:58.763Z',
      __v: 0,
      latestMessage: '639056fee2372570678adbea',
    },
    isViewed: false,
    _id: '63905ff9e2372570678addy4',
    createdAt: '2022-12-07T09:42:17.386Z',
    updatedAt: '2022-12-07T09:42:17.386Z',
    __v: 0,
  },
  {
    sender: {
      _id: '6346b85c487f713bee4a392f',
      email: 'aleksandrov@gmail.com',
      picture: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
    },
    content: 'hi there!',
    chatroom: {
      _id: '63624569b610594d455aada2',
      participants: [
        {
          _id: '6346b85c487f713bee4a392f',
          email: 'aleksandrov@gmail.com',
          picture: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
        },
        {
          _id: '6346b6fc037fb36c421c1694',
          email: 'pavlo@gmail.com',
          picture: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
        },
      ],
      createdAt: '2022-11-02T10:24:41.559Z',
      updatedAt: '2022-12-07T09:03:58.763Z',
      __v: 0,
      latestMessage: '639056fee2372570678adbea',
    },
    isViewed: false,
    _id: '63905ff9e2372170678add43',
    createdAt: '2022-12-07T09:42:17.386Z',
    updatedAt: '2022-12-07T09:42:17.386Z',
    __v: 0,
  },
];
