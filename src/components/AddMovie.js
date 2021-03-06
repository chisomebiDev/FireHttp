import React, { useRef } from "react";

import classes from "./AddMovie.module.css";

function AddMovie(props) {
  const titleRef = useRef("");
  const openingTextRef = useRef("");
  const releaseDateRef = useRef("");

  const { onAddMovie: addMovieHandler } = props;

  function submitHandler(event) {
    event.preventDefault();

    const titleValue = titleRef.current.value;
    const openingTextValue = openingTextRef.current.value;
    const releaseDateValue = releaseDateRef.current.value;

    if (
      titleValue.length === 0 &&
      openingTextValue.length === 0 &&
      releaseDateValue.length === 0
    )
      return;
    // could add validation here...
    const movie = {
      title: titleValue,
      openingText: openingTextValue,
      releaseDate: releaseDateValue,
    };

    addMovieHandler(movie);

    titleRef.current.value = "";
    openingTextRef.current.value = "";
    releaseDateRef.current.value = "";
  }

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" ref={titleRef} />
      </div>

      <div className={classes.control}>
        <label htmlFor="opening-text">Opening Text</label>
        <textarea rows="5" id="opening-text" ref={openingTextRef}></textarea>
      </div>

      <div className={classes.control}>
        <label htmlFor="date">Release Date</label>
        <input type="text" id="date" ref={releaseDateRef} />
      </div>

      <button>Add Movie</button>
    </form>
  );
}

export default AddMovie;
