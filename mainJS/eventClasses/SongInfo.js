class SongInfo {

	/*
	songName            (string)    = name of the song
	artistName          (string)    = name of the artist
	albumName           (string)    = name of the album
	year                (int)       = year when the album was released
	genre               (string)    = genre for the music
	charter             (string)    = charter name
	otherParts			(string)	= all of the other parts which have not been taken into consideration
	*/

	constructor (songName, artistName, albumName, year, genre, charter, other) {
		this.songName = songName;
		this.artistName = artistName;
		this.albumName = albumName;
		this.year = year;
		this.genre = genre;
		this.charter = charter;
		this.otherParts = other;
	}
}

module.exports = {SongInfo}
