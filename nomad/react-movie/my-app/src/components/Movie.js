import PropTypes from "prop-types";

function Movie({title, year, coverImage, summary, genres}) {
  return  (
    <li>
      <h2>{title} ({year})</h2>
      <img src={coverImage} alt="" />
      <p>{summary}</p>
      <ul>
        {genres.map((g) => <li key={g}>{g}</li>)}
      </ul>
    </li>
  );
}

Movie.propTypes = {
  coverImage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Movie;
