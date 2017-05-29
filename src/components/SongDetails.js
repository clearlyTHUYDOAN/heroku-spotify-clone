import React, {Component} from 'react';
import {Link} from 'react-router';

class SongDetails extends Component {
    render() {
        let songs = this.props.songs; // Q. Where is this coming from?
        // A. Probaby from this App.js line -> {React.cloneElement(this.props.children, {songs, selectSong})}
        let songId = (this.props.routeParams.id); // Could also be this.props.params.id.
        let song = songs[songId]

        return (
            <div>
                <Link to="/songs"><button>Back</button></Link>
                <h2>Song Details</h2>
                <h3>
                    {song.title}  
                </h3>
                <p>{song.description}</p>   
            </div>
        )
    }
}

export default SongDetails;