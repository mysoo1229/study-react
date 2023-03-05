import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Movie({title, id, year, coverImage, summary, genres}) {
  return  (
    <li>
      <h2>
        <Link to={`/movie/${id}`}>{title} ({year})</Link>
      </h2>
      <img src={coverImage} alt="" />
      <p>{summary}</p>
      <ul>
        {genres.map((g) => <li key={g}>{g}</li>)}
      </ul>
    </li>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  coverImage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Movie;
