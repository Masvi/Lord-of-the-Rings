import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.scss";
import movie from "../assets/movie.svg";
// import _ from "lodash";

const url = "https://the-one-api.dev/v2/movie";
const apiToken = "_tzMtEO34yxXdtZMmX6F";

const getMovies = async () =>
  await axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    })
    .then(({ data }) => data.docs);

const Card = ({ props }) => {
  const {
    name,
    academyAwardWins,
    academyAwardNominations,
    runtimeInMinutes,
    budgetInMillions,
    boxOfficeRevenueInMillions,
  } = props;

  return (
    <div className="card">
      <div className="card__image">
        <img src={movie} alt="movie" />
      </div>
      <div className="card__infos">
        <div className="card__title">{name}</div>
        <div className="card__time">{runtimeInMinutes} min</div>
        <div className="card__awards">
          {academyAwardWins} wins & {academyAwardNominations} Nominations
        </div>
        <div className="content content--btw">
          <div className="content content--column">
            <label>Budget</label>
            <span>{budgetInMillions}</span>
          </div>
          <div className="content content--column">
            <label>Revenue</label>
            <span>{boxOfficeRevenueInMillions}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <div className="header">
      <div className="header__title">
        Lord of the Rings Movies
        <div className="content content--column">
          <span>Ave. movie runtime: xxx min</span>
          <span>Ave. movie runtime: xxx min</span>
        </div>
      </div>
      <div className="header__actions">
        <input placeholder="Filter movies by name" />
        <button>sort by budget</button>
      </div>
    </div>
  );
};

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies().then((res) => {
      setMovies(res);
    });
  }, []);

  return (
    <div className="challenge">
      <Header />
      <div className="card-content">
        {movies && movies.map((card) => <Card key={card.name} props={card} />)}
      </div>
    </div>
  );
};

export default Movies;
