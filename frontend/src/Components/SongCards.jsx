import "../assets/styles/cards.css";

export default function SongCards({ songInfo, onClick, isPlaying, isBuffering }) {
    const handleClick = (e) => {
        e.preventDefault();
        onClick(songInfo);
    };

    return (
        <div 
            className={`song-cards ${isPlaying ? 'playing' : ''} ${isBuffering ? 'buffering' : ''}`} 
            onClick={handleClick}
        >
            <div className="song-card-container">
                <img src={songInfo.thumbnail} alt={songInfo.title} />
                <button 
                    className={`play-button ${isPlaying ? 'playing' : ''}`} 
                    aria-label={isPlaying ? "Pause song" : "Play song"}
                >
                    {isBuffering ? (
                        <span className="spinner"></span>
                    ) : isPlaying ? (
                        <svg viewBox="0 0 24 24">
                            <path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                        </svg>
                    ) : (
                        <svg viewBox="0 0 24 24">
                            <path fill="currentColor" d="M8 5v14l11-7z" />
                        </svg>
                    )}
                </button>
                {isPlaying && <div className="wave-animation"></div>}
            </div>
            <div className="song-details">
                <p className="card-title">{songInfo.title}</p>
                <p className="card-artist">{songInfo.artist}</p>
            </div>
        </div>
    );
}