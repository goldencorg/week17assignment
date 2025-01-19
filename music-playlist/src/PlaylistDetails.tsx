import { useParams } from "react-router";
import Playlist from "./Playlist";
import { PlaylistType } from "./types";

/*

Received state and function through parameters from parent component (Root).
Find the id of a specific playlist with useParams(), which will grab the id from the url.
Once the id is grabbed, the matching playlist is found and passed down to the child component, along with function meant to handle updates.

*/

export default function PlaylistDetails({Playlists, updatedSpecificPlaylist}: {
        Playlists: PlaylistType[]; 
        updatedSpecificPlaylist: (updatedPlaylist: PlaylistType) => void;
    }) {
    const { playlistId } = useParams();
    const playlist = Playlists.find((p) => String(p.id) === playlistId);
    return(
        <Playlist updatedSpecificPlaylist={updatedSpecificPlaylist} playlist={playlist}/>
    )
}