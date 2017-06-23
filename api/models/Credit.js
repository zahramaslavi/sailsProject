/**
 * Credit.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    initial: {
        type: 'integer',
        min: 0
    },
    available: {
        type: 'integer',
        min: 0
    },
    spent: {
        type: 'integer',
        defaultsTo: 0,
        min: 0
    },
    user: {
        model:'user',
        unique: true
    }
  }
};

