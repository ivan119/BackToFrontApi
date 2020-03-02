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
    Route.delete('logout','UserController.logout') // Do i even need this? //
    Route.get('getuser','UserController.show').middleware(["getUser"]) //Get one user//
    Route.get('index','UserController.index') //Get all users by id and username //
    Route.get('getFavourite/:id','UserController.getFavourite') //Get all favouirte movies by User id //
}).prefix('users')

Route.get('movies', 'MovieController.index') // Get all movies from database //
Route.get('movies/:id', 'MovieController.show') // Show singe movie by id //
Route.post('movies', 'MovieController.store') 
Route.post('movies/:id', 'MovieController.favourite').middleware(["getUser"]) // Post favourite movie id and user id to pivot table //
Route.patch('movies/:id', 'MovieController.update').middleware(['findMovie']) // Update movie //
Route.delete('movies/:id', 'MovieController.delete') //.middleware(['findMovie']) // Delete movie by id//