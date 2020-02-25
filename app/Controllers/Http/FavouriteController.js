'use strict'
const Favourite = use('App/Models/Favourite')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with favourites
 */
class FavouriteController {
  /**
   * Show a list of all favourites.
   * GET favourites
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    
    const favourites = await Favourite.all()
    
    response.ok({
      message:'Favourite movies',
      data: favourites
    })
  }
  
  /**
   * Create/save a new favourite.
   * POST favourites
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const { title, vote_average, overview, release_date, cover_image, background_image } = request.post()

    const favMovie = await Favourite.create({ title, vote_average, overview, release_date, cover_image, background_image, user_id })

    response.ok({
      message: 'Added to favourites',
      data: favMovie
    })
  }

  /**
   * Display a single favourite.
   * GET favourites/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params:{id}, request, response, view }) {

      const favMovie = await Favourite.find(id)

      response.ok({
        message:'Favourtie Movie',
        data: favMovie
      })

  }

  /**
   * Delete a favourite with id.
   * DELETE favourites/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async delete ({ params:{id}, request, response }) {
      const favourite = await Favourite.find(id)

      await favourite.delete()

      response.ok({
        message:'Favourte movie deleted.',
        id
      })
  }
}

module.exports = FavouriteController
