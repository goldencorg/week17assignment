import { useState } from "react"

/*

This is the third child component of Root.
Created a state that will collapse the entire component, allowing more space for the PlaylistDetails component.
If the component is open/expanded, it will simply display a div with a static message.
This ends the Lyrics branch.

*/

export default function Lyrics() {
    const [isExpanded, setIsExpanded] = useState(true)
    function buttonClick() {
        setIsExpanded(!isExpanded)
    }
    return (
        <>
            <button className="btn" onClick={buttonClick}>{isExpanded ? '>' : '<'}</button>
            {isExpanded ? (
            <div className='border-start p-4 d-flex flex-column col-xl-2 text-muted'>
                <div className="align-self-center">No lyrics available</div>
            </div> ): null }
        </>
    )
}