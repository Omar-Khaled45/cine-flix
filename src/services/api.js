import axiosInstance from "@/api/axios";

const config = {
  headers: {
    Accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMmEyZDdkZjFkNjdkY2QxMWUwNjEwYTFhYmIzMDkwZSIsIm5iZiI6MTYzNDM5MDczOS44OTYsInN1YiI6IjYxNmFkMmQzNmY1M2UxMDA2NDkzNTkzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.K7xnllz1A3SQSx4NFxRkzjNA8DlqQX4zgvFZEyMrO0U",
  },
};

const returnRes = async (url) => {
  const res = await axiosInstance.get(url, config);
  return res.data;
};

export const services = {
  getTrendingMovies: () => {
    return returnRes("3/trending/movie/day?language=en-US");
  },

  getPopularMovies: () => {
    return returnRes("3/movie/popular");
  },

  getUpComing: () => {
    return returnRes("3/movie/upcoming");
  },

  getTopRated: () => {
    return returnRes("3/movie/top_rated");
  },

  getGenre: () => {
    return returnRes("3/genre/movie/list");
  },

  getMovieDetails: (movie_id) => {
    // return axiosInstance.get(`3/movie/${movie_id}$`, config);

    return returnRes(`3/movie/${movie_id}$`);
  },

  getMovieCredits: (movie_id) => {
    return returnRes(`3/movie/${movie_id}$/credits`);
  },

  getMovieVideos: (movie_id) => {
    return returnRes(`3/movie/${movie_id}$/videos`);
  },

  searchMovie: (value) => {
    return returnRes(
      `3/search/movie?query=${value}&include_adult=false&language=en-US&page=1`,
    );
  },
};
