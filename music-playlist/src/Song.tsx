import { SongType } from "./types"

/*

Created a type to type check the parameters.
Will display the props of the song received in the parameter, along with the button functionality to delete that specific song.
This ends the PlaylistDetails branch.

*/

type SongProps = {
    song: SongType
    deleteSong: (id: string) => void
}
export default function Song({deleteSong, song}: SongProps) {
    return (
        <div className="border-bottom d-flex justify-content-between">
            <div style={{maxWidth:'50%'}}>
                <div className="fs-4">{song.title}</div>
                <div className="fs-6">{song.album} - {song.artist}</div>
            </div>
            <div className="align-self-center">
                <span style={{paddingRight:10}}>{song.length}</span><button className="btn btn-dark" type="button" onClick={() => deleteSong(song.id)}>Remove</button>
            </div>
        </div>
    )
}