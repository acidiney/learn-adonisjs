'use strict'
const Song = use('App/Models/Song')

class SongController {
  /**
   * @description Delete a song
   * @param { HTTPParams } params
   */
  async delete ({ params }) {
    const  { id } = params
    const song = await Song.find(id)
    return song.delete()
  }
}

module.exports = SongController
