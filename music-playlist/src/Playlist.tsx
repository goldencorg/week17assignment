import SelectedPlaylist from './SelectedPlaylist'
import ListArea from './ListArea'
import { PlaylistType, SongType } from './types'
import { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalHeader, ModalTitle } from 'react-bootstrap'

/*

Parent props are received and type checked.
Created a conditional rendering in case something is undefined.
Fetched the songList from the API.
Created a state to store the data.
Created a state and functions to handle the Modal functionality, in order to add songs.
Created a function to add songs, which will POST it to the API, render out the addition, and blank out the inputs.
Created a function to delete songs, targeting the specific playlist by its id.
Passed down all the states and functions that each respective child component would need (Selected Playlist, ListArea).

*/

export default function Playlist({playlist, updatedSpecificPlaylist} : {

    playlist ?: {id:string, title:string}
    updatedSpecificPlaylist: (updatedPlaylist: PlaylistType) => void;
}){
    if (!playlist) {
        return <div className='self-align-center'>
            <h5 className='text-center'>Playlist loading... </h5><br></br>
            If not results are presented, please choose/create another playlist.
        </div>;
    }
    useEffect(() => {
        const asyncFunction = async () => {
            const response = await fetch(`https://67873157c4a42c916105d016.mockapi.io/music_app_contents_api/songList`)
            const data = await response.json()
            setSongList(data)
        }
        asyncFunction()
    }, []);
    const [Songs, setSongList] = useState<SongType[]>([])
    const [isSonglistModalOpen, setIsSonglistModalOpen] = useState(false);
    const [songTitle, setSongTitle] = useState('');
    const [albumTitle, setAlbumTitle] = useState('');
    const [artistName, setArtistName] = useState('');
    const [songLength, setSongLength] = useState('');

    const handleSonglistModalClose = () => setIsSonglistModalOpen(false);

    const openSonglistModal = () => setIsSonglistModalOpen(true);

    const handleSongInput = (newSong:string) => {
        setSongTitle(newSong);
    };
    const handleAlbumInput = (newAlbum:string) => {
        setAlbumTitle(newAlbum);
    };
    const handleArtistInput = (newArtist:string) => {
        setArtistName(newArtist);
    };
    const handleLengthInput = (newLength:string) => {
        setSongLength(newLength);
    };

    const addSong = async (event: React.FormEvent) => {
    event.preventDefault();
    const newSong = {
        id: Songs.length ? Songs[Songs.length - 1].id+ 1 : 0,
        title: songTitle,
        album: albumTitle,
        artist: artistName,
        length: songLength
    };
    const response = await fetch(`https://67873157c4a42c916105d016.mockapi.io/music_app_contents_api/songList`, {
        method: "POST",
        body: JSON.stringify(newSong),
        headers: { "Content-Type": "application/json" }
    }).then(response => response.json());
    setSongList([...Songs, response]);
    setSongTitle('');
    setAlbumTitle('');
    setArtistName('');
    setSongLength('');
}   
    const deleteSong = async ( idToDelete: string) => {
        const response = await fetch(`https://67873157c4a42c916105d016.mockapi.io/music_app_contents_api/songList/${idToDelete}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        }).then(response => response.json());
            setSongList(Songs.filter(song => song.id !== response.id))
    }

    return (
        <div className='d-flex flex-column p-5 container-fluid col-xl-8' style={{height: '100vh', overflowY: 'auto'}}>
            <div style={{paddingBottom: 10}}><SelectedPlaylist updatedSpecificPlaylist={updatedSpecificPlaylist} playlist={playlist}/></div>
            <button type='button' className='btn' style={{width: '100%'}} onClick={openSonglistModal}>+</button>
            <div><ListArea songs={Songs} addSong={() => addSong} deleteSong={deleteSong}/></div>
            <Modal show={isSonglistModalOpen} onHide={handleSonglistModalClose}>
                <ModalHeader closeButton>
                    <ModalTitle>Song Information</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <form onSubmit= {addSong}>
                        <div className='form-group'>
                            <label>Song Title</label>
                            <input style={{width:'100%'}} className='form-control' type='text' value={songTitle} onChange={(e) => handleSongInput(e.target.value)} ></input>
                        </div>
                        <div className='form-group'>
                            <label>Album Title</label>
                            <input style={{width:'100%'}} className='form-control' type='text' value={albumTitle} onChange={(e) => handleAlbumInput(e.target.value)} ></input>
                        </div>
                        <div className='form-group'>
                            <label>Artist</label>
                            <input style={{width:'100%'}} className='form-control' type='text' value={artistName} onChange={(e) => handleArtistInput(e.target.value)} ></input>
                        </div>
                        <div className='form-group'>
                            <label>Song Length</label>
                            <input style={{width:'100%'}} className='form-control' type='text' value={songLength} onChange={(e) => handleLengthInput(e.target.value)} ></input>
                        </div>
                        <div style={{paddingTop:5}} className='form-group'>
                            <button style={{float:'right'}} className='btn btn-lg btn-dark'>Add</button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
        </div>
    )
}
