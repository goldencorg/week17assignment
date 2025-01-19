import playlistImage from './assets/seoul.png'
import pencil from './assets/pencil.svg'
import { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalHeader, ModalTitle } from 'react-bootstrap'
import { PlaylistType } from './types';

/*

Parent props are received.
Created a conditional rendering in case something is undefined.
Created state and functions to handle functionality of Modal that will handle update of playlist titles.
Create the function needed to update a playlist title in the API.
The state that has been linked since Root while render out the update.

*/

export default function SelectedPlaylist({playlist, updatedSpecificPlaylist} : {
        playlist ?: {id:string, title:string}
        updatedSpecificPlaylist: (updatedPlaylist: PlaylistType) => void;
    }) {
    if (!playlist) {
        return <div className='self-align-center'>
            <h5 className='text-center'>Playlist loading... </h5><br></br>
            If not results are presented, please choose/create another playlist.
        </div>;
    }
    const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);

    const handlePlaylistModalClose = () => setIsPlaylistModalOpen(false);
    const openPlaylistModal = () => setIsPlaylistModalOpen(true);

    const [updatedPlaylistInput, setUpdatedPlaylistInput] = useState(playlist.title);
    const [updatedPlaylist, setUpdatedPlaylist] = useState(playlist.title);

    useEffect(() => {
        setUpdatedPlaylist(playlist.title);
        setUpdatedPlaylistInput(playlist.title);
    }, [playlist]);

    const handleChange = (newName:string) => {
        setUpdatedPlaylistInput(newName);
    };
    const updatePlaylist = async (event: React.FormEvent, id:string) => {
        event.preventDefault();
        const updatedPlaylistTitle = {
            id: id,
            title: updatedPlaylistInput
        };

        const response = await fetch(`https://67873157c4a42c916105d016.mockapi.io/music_app_contents_api/playlistList/${id}`, {
            method: "PUT",
            body: JSON.stringify(updatedPlaylistTitle),
            headers: { "Content-Type": "application/json" }
        });
        const data = await response.json();
        setUpdatedPlaylist(data.title)
        setUpdatedPlaylistInput(data.title);
        updatedSpecificPlaylist(data);
        handlePlaylistModalClose();
    }
    return (
        <div>
            <div className="d-flex flex-row">
                <div>
                    <img className='ratio ratio-1x1' style={{height: 300, width: 300, borderRadius: 15}} src={playlistImage}></img>
                </div>
                <div className='align-self-center' style={{paddingLeft: '5vw', overflow: 'hidden'}}>
                    <div>
                        <div>
                            <h1>{updatedPlaylist}<img onClick={openPlaylistModal} style={{maxWidth: '10%', paddingLeft: 5, cursor: 'pointer'}} alt='Edit' className='align-self-center' src={pencil}></img></h1>
                        </div>
                    </div>
                    <div className='d-flex flex-wrap'>
                        <div style={{paddingBottom:5, paddingRight:5}}>
                            <button style={{width:100}} className='btn btn-lg btn-dark' type='button'>Play</button>
                        </div>
                        <div style={{paddingBottom:5, paddingRight:5}}>
                            <button style={{width:100}} className='btn btn-lg btn-dark' type='button'>Shuffle</button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={isPlaylistModalOpen} onHide={handlePlaylistModalClose}>
                <ModalHeader closeButton>
                    <ModalTitle>Update Playlist</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <form onSubmit= {(e) => updatePlaylist(e, playlist.id)}>
                        <div className='form-group'>
                            <label>Playlist Title</label>
                            <input style={{width:'100%'}} className='form-control' type='text' value={updatedPlaylistInput} onChange={(e) => handleChange(e.target.value)} ></input>
                        </div>
                        <div style={{paddingTop:5}} className='form-group'>
                            <button style={{float:'right'}} className='btn btn-lg btn-dark'>Update</button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
        </div>
    )
}