const MovieCard = ({ movie }) => {
  const { title, poster_path, vote_average, original_language, release_date } =
    movie;

  return (
    <li className="movie-card">
      {poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
        />
      ) : (
        <img src="No-Poster.png" alt="no-poster" />
      )}

      <h3 className="mt-4 text-left text-lg">{title}</h3>

      <div className="content">
        <div className="rating">
          <p>⭐</p>
          <p>{vote_average.toFixed(1)}</p>
        </div>

        <span className="lang">{original_language}</span>
        <span className="year">
          {release_date ? release_date?.slice(0, 4) : "N/A"}
        </span>
      </div>
    </li>
  );
};

export default MovieCard;
