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

Route.group(() => {
  Route.get("/", 'AlbumController.index')
  Route.post('/', 'AlbumController.create')
  Route.delete(":id", 'AlbumController.delete')
  Route.get(":id", 'AlbumController.singleAlbum')
  Route.put(':id/photo', 'AlbumController.uploadPhoto')
  Route.post(':id/song/add', 'AlbumController.addSongToAlbum')
}).prefix('/albums')

Route.delete("/songs/:id", 'SongController.delete')
