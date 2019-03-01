class SongInfo {

	/*
	songName            (string)    = name of the song
	artistName          (string)    = name of the artist
	albumName           (string)    = name of the album
	year                (int)       = year when the album was released
	genre               (string)    = genre for the music
	charter             (string)    = charter name
	*/

	constructor (songName, artistName, albumName, year, genre, charter) {
		this.songName = songName;
		this.artistName = artistName;
		this.albumName = albumName;
		this.year = year;
		this.genre = genre;
		this.charter = charter;
	}
}

module.exports = {SongInfo}
