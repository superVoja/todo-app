const { authenticate } = require('@feathersjs/authentication');
const { setField } = require('feathers-authentication-hooks');

module.exports = {
  before: {
    all: [ authenticate('jwt'),
    setField({
      from: 'params.user._id',
      as: 'params.query.id'
    }) 
    ],
    find: [
      setField({
        from: 'params.user._id',
      as: 'params.query.id'
      })
    ],
    get: [
      setField({
        from: 'params.user._id',
      as: 'params.query.id'
      })
    ],
    create: [
      setField({
        from: 'params.user._id',
        as: 'data.sentBy'
      })
    ],
    update: [
      setField({
        from: 'params.user._id',
      as: 'params.query.id'
      })
    ],
    patch: [
      setField({
        from: 'params.user._id',
      as: 'params.query.id'
      })
    ],
    remove: [
      setField({
        from: 'params.user._id',
      as: 'params.query.id'
      })
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
