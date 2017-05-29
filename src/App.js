import React, { Component } from 'react';

class App extends Component {
  constructor(){
    super();
    this.state = {
      playing: false,
      index: 0 // For referencing specific songs in the songs array passed from index.js.
    }
    
    // BIND METHODS THAT NEED ACCESS TO "THIS". //
    this.togglePlay = this.togglePlay.bind(this);
    this.changeSong = this.changeSong.bind(this);
    this.selectSong = this.selectSong.bind(this);

  }

  // DEFINE METHODS AND COMPONENT LIFECYCLES. //
  togglePlay() {
    this.setState ({
      playing: !this.state.playing
    })
  };

// When you want to play a specific song from the songs list, the index of the song gets passed from SongsList.js to App.js...
// Then the state of index and playing gets changed appropriately.
// Then player will play the appropriate song after component updates.

  selectSong(num) { 
    this.setState ({
          index: num,
          playing: true
      })
  };

  changeSong(num) {
    let newIndex = this.state.index + num;

    this.setState({
      index: newIndex
    })
  };

  componentDidUpdate() {
    const player = this.refs.player; // Refers to audio tag in render > return.
    if (this.state.playing === true) { // Component lifecycle ensures this happens after togglePlay and changeSong changes their respective states.
      player.play(); // The line that actually completes making songs play in addition to this.togglePlay.
    } else {
      player.pause(); 
    }
  };

  render() {
    const songs = this.props.route.songs; // Pass songs from index.js // Have to use props.route.
    const selectSong = this.selectSong; // Allows you to play specific songs in the song list.

    // The audio tag below is needed to play music.
    // Q. Why do we have to call this.changeSong anonymous function style? Why doesn't it work otherwise? 
    // Is it because we're passing parameters? Is it to ensure order of running? Callback functions?
    // A. Yes, it's because we're passing parameters. Can also use .bind.

    return (
      <div className="App">
        <h1>Audio Player App</h1>
        {/* 
                This is the way we pass props to the components inside the nested routes.
                Since the components are loaded by react-router instead of being referenced inside this component,
                this is the syntax we will use for providing props to those nested components.

                Note how we wrote { songs, selectSong } for our props object.
                This is a shorthand form introduced by ES6, and is equivalent to:
                { songs: songs , selectSong: selectSong }
              */}
        {React.cloneElement(this.props.children, {songs, selectSong})}

        <h4>Current Playing: {songs[this.state.index].title}</h4>

        <audio ref="player" src={songs[this.state.index].source}></audio> 

        <button onClick={() => this.changeSong(-1)}>
            <i className="fa fa-fast-backward"></i>
        </button>

        <button onClick={this.togglePlay}>
            <i className={"fa " + (this.state.playing? "fa-pause" : "fa-play")}></i>
        </button>
        
        <button onClick={() => this.changeSong(1)}>
            <i className="fa fa-fast-forward"></i>
        </button>

      </div>
    );
  }
}

export default App;
