// import React, { useEffect, useState } from "react";
// import Track from '../track/track'
// import SearchBar from "../search/index";
// import '../login/index.css'
// import FormPlaylist from "../playlist/formPlaylist";
// import { getUserProfile } from "../playlist/playlistSetting";
// import { useDispatch, useSelector } from "react-redux";
// import { login } from '../utility/authslice'
// import spotifyApi from "../utility/spotifyApi";

// export default function Home() {
//   const [tracks, setTracks] = useState([]);
//   const authorized = useSelector((state) => state.auth.authorized);
//   const [selectedTrackURI, setSelectedTrackURI] = useState([]);
//   const [selectedTracks, setSelectedTracks] = useState([]);
//   const [search, setSearch] = useState(false);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const params = new URLSearchParams(window.location.hash);
//     const accessTokenParams = params.get("#access_token");

//     if (accessTokenParams !== null) {

//       const setUserProfile = async () => {
//         try {
//           const response = await getUserProfile(accessTokenParams);
//           dispatch(
//             login({
//               accessToken: accessTokenParams,
//               user: response,
//             })
//           )
//         } catch (e) {
//           alert(e);
//         }
//       };

//       setUserProfile();
//     }
//   }, []);


//   useEffect(() => {
//     if (!search) {
//       const selectedTracks = filterSelectedTracks();

//       setTracks(selectedTracks);
//     }
//   }, [selectedTrackURI]);


//   const getSpotifyLinkAuthorize = () => {
//     const state = Date.now().toString();
//     const CLIENT_ID= process.env.REACT_APP_CLIENT_ID;
//     const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URL;
//     const AUTHORIZED = process.env.REACT_APP_AUTHORIZE_URL

//     return `${AUTHORIZED}?client_id=${CLIENT_ID}&response_type=${spotifyApi.RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}&state=${state}&scope=${spotifyApi.SPOTIFY_SCOPE}`;
//   };


//   const filterSelectedTracks = () => {
//     return tracks.filter((track) => selectedTrackURI.includes(track.uri));
//   };


//   const handleSuccessSearch = (searchTracks) => {
//     setSearch(true);

//     const selectedSearchTracks  = searchTracks.filter(
//       (track) => selectedTrackURI.includes(track.uri)
//     );


//     setTracks([...new Set([...selectedSearchTracks, ...searchTracks])]);
//   };

//   // const clearSearch = () => {
//   //   setTracks(selectedTracks);
//   //   setSearch(false);
//   // };

//   const toggleSelect = (track) => {
//     const uri = track.uri;

//     if (selectedTrackURI.includes(uri)) {
//       setSelectedTrackURI(selectedTrackURI.filter((item) => item !== uri));
//       setSelectedTracks(selectedTrackURI.filter((item) => item.uri !== uri));
//     } else {
//       setSelectedTrackURI([...selectedTrackURI, uri]);
//       setSelectedTracks([...selectedTracks, track]);
//     }
//   };

//   return (
//     <div className="container">
//       {!authorized && (
//         <div className="login-app text-center">
//           <a href={getSpotifyLinkAuthorize()} className="btn btn-login text-white text-login">
//             Login with Spotify
//             <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-spotify" viewBox="0 0 16 16">
//               <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.669 11.538a.498.498 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686zm.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858zm.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288z"/>
//             </svg>
//           </a>
//         </div>

//       )}

//       {authorized && (
//         <>
//           <FormPlaylist
//             uris={selectedTrackURI}
//           />
//           <hr />
//           <SearchBar
//             onSuccess={(tracks) => handleSuccessSearch(tracks)}
//           />

//           {tracks.length === 0 && <p className="not-found text-center">Song Not Found</p>}

//           <div className="track-list">
//             {tracks.map((track) => (
//               <Track
//                 key={track.id}
//                 url={track.album.images[0].url}
//                 title={track.name}
//                 artist={track.artists[0].name}
//                 album={track.album.name}
//                 toggleSelect={() => toggleSelect(track)}
//                 select={selectedTrackURI.includes(track.uri)}
//               />
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
