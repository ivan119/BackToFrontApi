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
   */

  /**
   * Create/save a new movie.
   * POST movies

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
   * GET movies/:id  */
  async show ({ response, params:{id} }) {
        
    const movie = await Movie.findOrFail(id)

    response.ok({
      message:'Single Movie',
      data: movie
    })
      
  } 

  /* Puts or deletes User id and Movie id in pivot table */

  async favourite ({ params:{id}, response, user }){
    const movie = await Movie.findOrFail(id)

    const isFavorite = await user.movies().where('id', movie.id).first()
    // console.log(isFavorite)
    if(isFavorite){
        await user.movies().detach(movie.id)
    } else {
      await user.movies().attach(movie.id)
    }

    response.ok({
    })
  }


  /**
   * Update movie details.
   * PUT or PATCH movies/:id
   */
  async update ({ params: { id }, request, response }) {

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

   */
  async delete ({ params: { id }, request, response }) {

    //todo: popraviti
    const movie = request.post().movie

    await movie.delete()

    response.status(200).json({
      message: 'Successfully deleted this movie.',
      id
    })
  }


}

module.exports = MovieController
