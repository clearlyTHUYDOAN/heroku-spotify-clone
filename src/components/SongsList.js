import React, {Component} from 'react';
import {Link} from 'react-router';

class SongsList extends Component {
    render() {
        let songs = this.props.songs; // Q. Where is this coming from? App.js? 
        let selectSong = this.props.selectSong; // Q. Where is this coming from? App.js?
        // A. Probably from this App.js line -> {React.cloneElement(this.props.children, {songs, selectSong})}

        // console.log(songs); // Our songs array from index.js > App.js.
        // console.log(selectSong); // This allows us to reference our method from App.js.

        let songListJSX = songs.map((song, index) => {
            return (
                <li key={index}>
                    <Link to={`songs/${song.id}`}>{song.title}</Link>
                    <button onClick={() => selectSong(song.id)}>
                        <i className="fa fa-play"></i>
                    </button>
                </li>
            )
        });

        return (
            <div>
                <h2>Song List</h2>
                <ol>
                    {songListJSX}
                </ol>
            </div>
        )
    }
}

export default SongsList;