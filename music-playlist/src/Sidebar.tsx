import { useState } from 'react'
import AlternativeChoices from './AlternativeChoices'
import PlaylistChoices from './PlaylistChoices'
import { Modal, ModalBody, ModalHeader, ModalTitle } from 'react-bootstrap';
import { PlaylistType } from './types';

/*

Received states and functions through parameters from parent component (Root).
Created functions to handle Modal functionality.
Created states and functions to extract and store the value from the Modal.
Passed down the necessary info to one of the two child components.

*/

export default function Sidebar({Playlists, addPlaylist, deletePlaylist} : {
        Playlists: PlaylistType[]; 
        addPlaylist: (titleName: string) => void;
        deletePlaylist: (id: string) => void;
    }) {
    const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);
    const [titleName, setTitleName] = useState('');

    const handlePlaylistModalClose = () => setIsPlaylistModalOpen(false);

    const openPlaylistModal = () => setIsPlaylistModalOpen(true);

    const handleChange = (newName:string) => {
        setTitleName(newName);
    };
    
    const handleAddPlaylist = (event: React.FormEvent) => {
        event.preventDefault();
        addPlaylist(titleName);
        setTitleName('');
        handlePlaylistModalClose();
    }

    return (
        <div className='border-end p-4 d-flex flex-column col-xl-2' style={{height: '100vh', overflowY: 'auto'}}>
            <div><AlternativeChoices /></div>
                <h6 className="text-muted">Playlists</h6>
                <button className='btn btn-sm' type='button' onClick={openPlaylistModal}>+</button>
            <div>{ Playlists.map( playlist => <PlaylistChoices key={playlist.id} playlist={playlist} deletePlaylist={deletePlaylist}/>)}</div>
            <Modal show={isPlaylistModalOpen} onHide={handlePlaylistModalClose}>
                <ModalHeader closeButton>
                    <ModalTitle>Custom Playlist</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <form onSubmit= {handleAddPlaylist}>
                        <div className='form-group'>
                            <label>Playlist Title</label>
                            <input style={{width:'100%'}} className='form-control' type='text' value={titleName} onChange={(e) => handleChange(e.target.value)} ></input>
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