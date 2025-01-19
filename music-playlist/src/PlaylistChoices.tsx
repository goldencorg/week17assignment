import { NavLink } from 'react-router'
import playlistImage from './assets/playlist.svg'
import type { PlaylistType } from './types'

/*

Created a type for type check of the parameters from parent component (Sidebar)
Dynamic data is shown; displaying the title of the playlist that was mapped through the array of playlists in the parent component.
This ends the Sidebar branch.

*/

type PlaylistChoicesProps = {
    playlist: PlaylistType
    deletePlaylist: (id: string) => void
}

export default function PlaylistChoices({playlist, deletePlaylist} : PlaylistChoicesProps) {
    return (
        <div>
            <div className="fs-4 d-flex justify-content-between">
                <div className='d-flex flex-row' style={{maxWidth: '80%', overflow: 'hidden'}}>
                    <div><img className='align-self-center' src={playlistImage} style={{paddingLeft: 15, height: 17, paddingRight: 5}}></img></div>
                    <div><NavLink style={{color: 'black', textDecoration: 'none'}} to={'/' + playlist.id} >{playlist.title}</NavLink></div>
                </div>
                <div className=''>
                    <button className="btn btn-sm text-muted float-right" type="button" onClick={() => deletePlaylist(playlist.id)}>x</button>
                </div>
            </div>
        </div>
    )
}