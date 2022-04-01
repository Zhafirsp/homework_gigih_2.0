import React, { useState } from "react";
import './index.css'
import { SpotifyAPI } from "../auth/spotifyapi";

function SearchBar({ accessToken, onSuccess, onClearSearch }) {
  const [text, setText] = useState("");
  const spotify = {SpotifyAPI}
  const handleInput = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestOptions = {
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(
        `${spotify.BASE_URL}/search?type=track&q=${text}`,
        requestOptions
      ).then((data) => data.json());

      const tracks = response.tracks.items;
      onSuccess(tracks);
    } catch (e) {
      alert(e);
    }
  };

  const clearSearch = () => {
    setText("");
    onClearSearch();
  };

  return (
    <div className="search-wrapper">
      <form className="form-search" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="query"
            placeholder="Search..."
            onChange={handleInput}
            required
            value={text}
          />
          <input type="submit" className="btn btn-primary" value="Search" />
        </div>
      </form>
      <button className="btn btn-text" onClick={clearSearch}>
        Clear Search
      </button>
    </div>
  );
}

// class Login extends Component {
// constructor() {
//     super();
//     this.state = {
//       loggedIn: false,
//       token: "",
//       searchQuery: "",
//       searchResult: [],
//     };

//     this.onSubmit = this.onSubmit.bind(this);
//     this.onSearch = this.onSearch.bind(this);
//     this.handleInput = this.handleInput.bind(this);
//     this.onClick = this.onClick.bind(this);
//   }

//   componentDidMount() {
//     console.warn("didMount");
//     const access_token = new URLSearchParams(window.location.hash).get(
//       "#access_token"
//     );
//     this.setState(
//       {
//         token: access_token,
//         loggedIn: true,
//       },
//       () => console.log(this.state.token)
//     );
//   }

//   handleInput(event) {
//     this.setState({
//       searchQuery: event.target.value,
//     });
//   }

//   onSearch(event) {
//     axios
//       .get("https://api.spotify.com/v1/search", {
//         headers: {
//           Authorization: `Bearer ${this.state.token}`,
//         },
//         params: {
//           q: `${this.state.searchQuery}`,
//           type: "track",
//         },
//       })
//       .then((response) => {
//         const data = response.data.tracks.items;
//         console.log(data);
//         this.setState({
//           searchResult: data,
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//     event.preventDefault();
//   }

//   onSubmit(event) {
//     const url = `${spotify.SPOTIFY_AUTHORIZE}?client_id=${spotify.CLIENT_ID}&redirect_uri=${spotify.REDIRECT_URL}&scope=${spotify.SCOPE}&response_type=token&show_dialog=true`;
//     window.location = url;
//     event.preventDefault();
//   }

//   onClick(event) {
//     this.setState({
//       loggedIn: false,
//       token: "",
//     });
//     window.location.replace = "http://localhost:3000/";
//   }

//   render() {
//     let isi;
//     if (this.state.token != null && this.state.loggedIn === true) {
//       isi = (
//         <form onSubmit={this.onSearch} className="form-search text-center mt-3">
//           <div class="input-group">
//             <input type="text" class="form-control" placeholder="Search Song..." aria-label="Recipient's username with two button addons" onChange={this.handleInput}/>
//             <button class="btn text-white" type="submit" >Search</button>
//             <button class="btn text-white" onClick={this.onClick} type="submit" value="submit">Logout</button>
//           </div>
//           {this.state.searchResult.map((track) => (
            
//             <Albums
//               key={track.album.id}
//               images={track.album.images[0].url}
//               title={track.name}
//               album={track.album.name}
//               artist={track.artists[0].name}
//             />
//           ))}
//         </form>
//       );
//     } else
//       isi = (
//           <div>
//             <form onSubmit={this.onSubmit} className="form-login text-center">
//               <button className="btn btn-lg mt-3 text-white btn-login" id="info" type="submit" value="submit">
//                 Login with Spotify
//               </button>
//             </form>
//           </div>
//       );

    
//     return (
//       <div className="spotify-track">
//         {isi}
//       </div>
//     );
//   }
// }

export default SearchBar;