'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FavouritesSchema extends Schema {
  up () {
    this.create('favourites', (table) => {
      table.increments()
      table.string('title')
      table.decimal('vote_average')
      table.text('overview')
      table.date('release_date')
      table.string('cover_image')
      table.string('background_image')
     // table.integer('user_id').unsigned()
    //  table.foreign('user_id').references('users.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('favourites')
  }
}

module.exports = FavouritesSchema
