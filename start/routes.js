'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})
Route.group(()=>{
    Route.post('login','UserController.login')
    Route.post('register','UserController.register')
    Route.delete('logout','UserController.logout')
    Route.get('getuser','UserController.show').middleware(["getUser"]) //Get one user//
    Route.get('index','UserController.index') //Get all users//
    Route.get('getFavourite/:id','UserController.getFavourite')
}).prefix('users')

Route.get('movies', 'MovieController.index')
//Route.get('movies', 'MoviesController.getFavourite').middleware(["getUser"])
Route.get('movies/:id', 'MovieController.show')
Route.post('movies', 'MovieController.store')
//Route.post('movies/:id', 'MovieController.favourite').middleware(["getUser"])
Route.patch('movies/:id', 'MovieController.update').middleware(['findMovie'])
Route.delete('movies/:id', 'MovieController.delete').middleware(['findMovie'])