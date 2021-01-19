const { authenticate } = require('@feathersjs/authentication').hooks;
const { setField } = require('feathers-authentication-hooks');

const setUserId = setField({
  from: 'params.user._id',
  as: 'data.userId'
});

const limitToUser = setField({
  from: 'params.user._id',
  as: 'params.query.userId'
});
module.exports = {
  before: {
    all: [ authenticate('jwt'),
    
    ],
    find: [
      setField({
        from: 'params.user._id',
        as: 'params.query.ownerId'
      })
    ],
    get: [],
    create: [
      setField({
        from: 'params.user._id',
        as: 'data.ownerId'
      })
    ],
    update: [
      limitToUser
    ],
    patch: [
      limitToUser
    ],
    remove: [
      
    ]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
