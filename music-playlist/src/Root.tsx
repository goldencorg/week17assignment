import Sidebar from './Sidebar'
import Lyrics from './Lyrics'
import PlaylistDetails from './PlaylistDetails'
import { useEffect, useState } from 'react';
import { PlaylistType } from './types';
import { useNavigate } from 'react-router';

/*

Root component serves as the root of everything. All my states originate from here.
Created a state to contain data of my array of playlists.
Created a function to add playlists to that array with a PUT method, while also rendering the new addition.
Created a function to delete any playlist from the array with a DELETE method, also rendering the change.
Created a function, going down multiple generations of the family, that will handle any title changes of the specific playlist user is on.
Passed down all necessary info to the three child components (Sidebar, PlaylistDetails, Lyrics).

*/

export default function Root(){
  const navigate = useNavigate();
  const [Playlists, setPlaylistList] = useState<PlaylistType[]>([]);
  useEffect(() => {
    const asyncFunction = async () => {
        const response = await fetch("https://67873157c4a42c916105d016.mockapi.io/music_app_contents_api/playlistList")
        const data = await response.json()
        setPlaylistList(data)
    }
    asyncFunction()
}, []);
const addPlaylist = async (titleName: string) => {
  event?.preventDefault()
  const newPlaylist = {
      id: Playlists.length ? Playlists[Playlists.length -1].id + 1 : 0,
      title: titleName
  };
  const response = await fetch("https://67873157c4a42c916105d016.mockapi.io/music_app_contents_api/playlistList", {
      method: "POST",
      body: JSON.stringify(newPlaylist),
      headers: { "Content-Type": "application/json" }
  }).then(response => response.json());
  setPlaylistList([...Playlists, response]);
  navigate(response.id)
}
const deletePlaylist = async ( idToDelete: string) => {
  const response = await fetch(`https://67873157c4a42c916105d016.mockapi.io/music_app_contents_api/playlistList/${idToDelete}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
  }).then(response => response.json());
  setPlaylistList(Playlists.filter(playlist => playlist.id !== response.id))
  navigate(-1);
}
const updatedSpecificPlaylist = (updatedPlaylist: PlaylistType) => {
  setPlaylistList((prevPlaylistArray) => prevPlaylistArray.map(p => p.id === updatedPlaylist.id ? updatedPlaylist : p))
}
  return (
  <div className='d-flex flex-column vh-100'>
    <div className='d-flex flex-grow-1'>
      <Sidebar Playlists={Playlists} addPlaylist={addPlaylist} deletePlaylist={deletePlaylist}/>
      <PlaylistDetails updatedSpecificPlaylist={updatedSpecificPlaylist} Playlists={Playlists}/>
      <Lyrics />
    </div>
  </div>
)
}