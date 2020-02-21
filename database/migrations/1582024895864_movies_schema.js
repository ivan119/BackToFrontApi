'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MoviesSchema extends Schema {
  up () {
    this.create('movies', (table) => {
      table.increments()
      table.timestamps()
      table.string('title')
      table.decimal('vote_average')
      table.text('overview')
      table.date('release_date')
      table.string('cover_image')
      table.string('background_image')
    })
  }

  down () {
    this.drop('movies')
  }
}

module.exports = MoviesSchema
