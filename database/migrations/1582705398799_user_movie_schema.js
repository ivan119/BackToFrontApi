'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserMoviesSchema extends Schema {
  up () {
    this.create('users_movies', (table) => {
      table
        .integer('user_id')
        .unsigned()
        .index('user_id')
      table
        .integer('movie_id')
        .unsigned()
        .index('movie_id')
      table
        .foreign('user_id')
        .references('users.id')
        .onDelete('cascade')
      table
        .foreign('movie_id')
        .references('movies.id')
        .onDelete('cascade')
    })
  }

  down () {
    this.drop('users_movies')
  }
}

module.exports = UserMoviesSchema
