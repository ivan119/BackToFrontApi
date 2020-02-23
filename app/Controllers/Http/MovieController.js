'use strict'
const Movie = use('App/Models/Movie')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with movies
 */
class MovieController {
  /**
   * Show a list of all movies.
   * GET movies
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const allParams = request.get()
   
    const query =  Movie.query()
    if(allParams.search){
        query.where('title','like',`%${allParams.search}%`)
    } 
    if(allParams.orderBy){
          query.orderBy(allParams.orderBy,allParams.order)
    }
    response.ok({
      message: 'List of movies from our database',
      data: await query.fetch()
    })

  }

  /**
   * Render a form to be used for creating a new movie.
   * GET movies/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  /**
   * Create/save a new movie.
   * POST movies
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const { title, vote_average, overview, release_date, cover_image, background_image } = request.post()

    const movie = await Movie.create({ title, vote_average, overview, release_date, cover_image, background_image })

    response.ok({
      message: 'Succesfully create a new movie',
      data: movie
    })
  }

  /**
   * Display a single movie.
   * GET movies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ response, params:{id} }) {
        
    let movie = await Movie.query().where('id',id).first()
    
    if(movie !==null){
      response.ok({
        message: 'Single movie.',
        data: movie
      })
    }else{
      response.status(404).json({
        message:'No movie here',
        id
      })
    }
      
  } 

  /**
   * Render a form to update an existing movie.
   * GET movies/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
 
  /**
   * Update movie details.
   * PUT or PATCH movies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params: { id }, request, response }) {
   // const movie = await Movie.find(id)

    const { title, vote_average, overview, release_date, cover_image, background_image, movie } = request.post()

    movie.title = title
    movie.vote_average = vote_average
    movie.overview = overview
    movie.release_date = release_date
    movie.cover_image = cover_image
    movie.background_image = background_image

    await movie.save()

    response.status(200).json({
      message: 'Successfully update a new movie',
      data: movie
    })

  }

  /**
   * Delete a movie with id.
   * DELETE movies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async delete ({ params: { id }, request, response }) {
    const movie = request.post().movie

    await movie.delete()

    response.status(200).json({
      message: 'Successfully deleted this customer.',
      id
    })
  }
}

module.exports = MovieController
