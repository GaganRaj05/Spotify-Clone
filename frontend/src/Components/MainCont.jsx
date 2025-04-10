import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SongCards from "./SongCards";
import { getAllSongs, getTopSongs } from "../services/songs";
import { useAuth } from "../Context/AuthContext";

function MainContent() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [audio, setAudio] = useState(null);
  const location = useLocation();
  const [currentSong, setCurrentSong] = useState(null);
  const {user, setUser} = useAuth()
  useEffect(() => {
    async function getSongs() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await getTopSongs();
        
        if (response === "No data in cache" || response === "Failed to fetch") {
          const newResponse = await getAllSongs();
          setSongs(newResponse);
        } else {
          setSongs(response);
        }
      } catch (err) {
        setError("Failed to load songs. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    
    getSongs();

    return () => {
      if (audio) {
        audio.pause();
        audio.src = "";
        audio.onended = null;
        audio.onerror = null;
      }
    };
  }, []);
  useEffect(()=> {
    return () => {
      if (audio) {
        audio.pause();
        audio.src = "";
      }
    };  
  },[audio, location.pathname])
  const formatArtists = (artists) => {
    if (!artists || !Array.isArray(artists)) return "Unknown Artist";
    return artists.map(artist => artist.name).join(", ");
  };

  const handleSongEnd = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
    setCurrentSong(songs[nextIndex])
    handleSongClick(songs[nextIndex], nextIndex);
  };

  const handleSongClick = async (songInfo, index) => {
    if(!user) {
      alert("Login to use this feature ");
      return;
    }
    setError(null);
    if (index !== undefined) {
      setCurrentSongIndex(index);
      setCurrentSong(songs[index]);
    }

    if (audio && songInfo._id === songs[currentSongIndex]?._id) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        try {
          await audio.play();
          setIsPlaying(true);
        } catch (err) {
          setError("Couldn't resume playback. Please try again.");
        }
      }
      return;
    }

    if (audio) {
      audio.pause();
      audio.src = "";
      audio.onended = null;
      audio.onerror = null;
    }

    const newAudio = new Audio(songInfo.fileUrl);
    setAudio(newAudio);
    setIsBuffering(true);

    newAudio.onended = handleSongEnd;
    newAudio.onerror = () => {
      setError("Error playing the song. The file might be corrupted.");
      setIsPlaying(false);
      setIsBuffering(false);
    };
    newAudio.onwaiting = () => setIsBuffering(true);
    newAudio.onplaying = () => setIsBuffering(false);

    try {
      await newAudio.play();
      setIsPlaying(true);
    } catch (err) {
      setError("Couldn't play the song. Please try again.");
      setIsPlaying(false);
    } finally {
      setIsBuffering(false);
    }
  };

  const togglePlayPause = async () => {
    if (!audio) return;
    
    try {
      if (isPlaying) {
        audio.pause();
      } else {
        await audio.play();
      }
      setIsPlaying(!isPlaying);
    } catch (err) {
      setError("Playback error. Please try again.");
    }
  };

  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
        audio.src = "";
      }
    };
  }, [location.pathname]);

  return (
    <div className="main-cont">
      <h2>Trending Songs</h2>
      
      {error && (
        <div className="error">
          {error}
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}
      
      {loading ? (
        <div className="loading">Loading songs...</div>
      ) : songs.length > 0 ? (
        <div className="song-cont">
          {songs.map((song, index) => (
            <SongCards 
              key={song._id}
              songInfo={{
                id: song._id,
                title: song.title,
                thumbnail: song.thumbnail,
                fileUrl: song.fileUrl,
                artist: formatArtists(song.artist) 
              }}
              onClick={() => handleSongClick(song, index)}
              isPlaying={currentSongIndex === index && isPlaying}
              isBuffering={currentSongIndex === index && isBuffering}
            />
          ))}
        </div>
      ) : (
        <div className="empty">No songs available</div>
      )}

      {currentSong && (
        <div className="music-controller">
          <div className="controller-left">
            <img 
              src={songs[currentSongIndex]?.thumbnail} 
              alt={songs[currentSongIndex]?.title} 
              className="controller-thumbnail"
            />
            <div className="song-info">
              <h4>{songs[currentSongIndex]?.title || "No song selected"}</h4>
              <p>{songs[currentSongIndex]?.artist ? formatArtists(songs[currentSongIndex].artist) : "Unknown Artist"}</p>
            </div>
          </div>
          <div className="controller-center">
            <button 
              onClick={togglePlayPause} 
              className="play-pause-btn"
              disabled={isBuffering}
            >
              {isBuffering ? (
                <span className="spinner"></span>
              ) : isPlaying ? (
                <span>⏸</span> 
              ) : (
                <span>▶</span> 
              )}
            </button>
            <span className="track-count">
              {currentSongIndex + 1} / {songs.length}
            </span>
          </div>
          <div className="controller-right">
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01" 
              onChange={(e) => {
                if (audio) audio.volume = e.target.value;
              }}
              defaultValue="1"
              className="volume-slider"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default MainContent;