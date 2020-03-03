'use strict'
const Movie = use('App/Models/Movie')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with movies
 */
class MovieController {

  //Search,sort and paginte methods for movies
  async index ({ request, response, view }) {

    const allParams = request.get()
    let page = allParams.page;
    const perPage = allParams.perPage
    const query =  Movie.query()

    if(allParams.search){
        query.where('title','like',`%${allParams.search}%`)
    } 
    if(allParams.orderBy){
          query.orderBy(allParams.orderBy,allParams.order)
    }
    response.ok({
      message: 'List of movies from our database',
      pagaination: await query.paginate(page, perPage)
    })

  }

  //Admin can store new movie
  async store ({ request, response }) {

    const { title, vote_average, overview, release_date, cover_image, background_image } = request.post()
    const movie = await Movie.create({ title, vote_average, overview, release_date, cover_image, background_image })

    response.ok({
      message: 'Succesfully create a new movie',
      data: movie
    })
  }

  //Get single movie by id
  async show ({ response, params:{id} }) {
        
    const movie = await Movie.findOrFail(id)

    response.ok({
      message:'Single Movie',
      data: movie
    })
      
  } 

  //Puts favourite movie or deletes it by id
  async favourite ({ params:{id}, response, user }){

    const movie = await Movie.findOrFail(id)
    const isFavorite = await user.movies().where('id', movie.id).first()

    if(isFavorite){
        await user.movies().detach(movie.id)
        response.ok({
          message:'Movie removed from Favourites'
        })
    } else {
      await user.movies().attach(movie.id)
      response.ok({
        message:'Movie added to Favourites'
      })
    }    
  }

  //Admin can update movie by id
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

  //Admin can delete movie by id
  async delete ({ params: { id }, request, response }) {

    const movie = await Movie.findOrFail(id)

    await movie.delete()

    response.status(200).json({
      message: 'Successfully deleted this movie.',
      id
    })
  }


}

module.exports = MovieController
