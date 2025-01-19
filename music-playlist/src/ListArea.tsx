import Song from './Song'
import { SongType } from './types'

/*

Created a type to type check the parameters.
Will map through the array of songs.
Passed down the props of the song to the child component and the function to remove the song from the API.

*/

type ListAreaProps = {
    songs: Array<SongType>
    addSong: () => void
    deleteSong: (id:string) => void
}

export default function ListArea({songs, deleteSong}: ListAreaProps) {
    return (
        <div className='pt-3'>
            { songs.map( song => <Song key={song.id} song={song} deleteSong= {deleteSong}/>)}
        </div>
    )
}