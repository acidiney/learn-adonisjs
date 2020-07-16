'use strict'

const Helpers = use('Helpers')

const Song = use('App/Models/Song')
const Album = use('App/Models/Album');

class AlbumController {
  /**
   * @description Returns all albuns
   */
  async index () {
    const albums = await Album.query().orderBy('id', 'desc').fetch()
    return albums
  }

  /**
   * @description Get a single album with yours musics
   * @param { HTTPParams} params
   */
  async singleAlbum ({ params }) {
    const  { id } = params
    const album = await Album.query()
      .with('songs')
      .where('id', id)
      .first()

    return album
  }

  /**
   * create a new Album
   * @param { HTTPRequest } request
   */
  async create ({ request }) {
    const { artist, album } = request.all()

    const newAlbum = new Album()
    newAlbum.name = album
    newAlbum.artist = artist

    await newAlbum.save()

    return newAlbum
  }

  /**
   * @description Delete a album
   * @param { HTTPRequest } params
   */
  async delete ({ params }) {
    const  { id } = params
    const album = await Album.find(id)
    return album.delete()
  }

  /**
   * @description Upload or update image of album
   * @param { HTTPRequest } request
   * @param { HTTPParams } params
   */
  async uploadPhoto ({ params, request }) {
    const image = request.file('album_image', {
      types: ['image'],
      size: '2mb'
    })

    await image.move(Helpers.publicPath('uploads'), {
      name: `${ new Date().getTime()}.jpg`
    })

    const pathName = `http://localhost:3333/uploads/${image.fileName}`;

    const album = await Album.find(params.id);
    album.image = pathName;

    await album.save()

    return album
  }

  /**
   * @description Add Song to album
   * @param { HTTPRequest } request
   * @param { HTTPParams } params
   */
  async addSongToAlbum ({ params, request }) {
    const { id } = params

    const song = new Song()
    song.album_id = id
    song.name = request.input('song')

    await song.save()

    return song
  }
}

module.exports = AlbumController
