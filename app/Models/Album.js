'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Album extends Model {
  songs () {
    return this.hasMany('App/Models/Song')
  }
}

module.exports = Album
