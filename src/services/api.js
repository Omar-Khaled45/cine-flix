import axiosInstance from "@/api/axios";

const config = {
  headers: {
    Accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMmEyZDdkZjFkNjdkY2QxMWUwNjEwYTFhYmIzMDkwZSIsIm5iZiI6MTYzNDM5MDczOS44OTYsInN1YiI6IjYxNmFkMmQzNmY1M2UxMDA2NDkzNTkzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.K7xnllz1A3SQSx4NFxRkzjNA8DlqQX4zgvFZEyMrO0U",
  },
};

export const services = {
  getTrendingMovies: async () => {
    const res = await axiosInstance.get(
      "3/trending/movie/day?language=en-US",
      config,
    );
    return res.data;
  },
  getPopularMovies: async () => {
    const res = await axiosInstance.get("3/movie/popular", config);
    return res.data;
  },
  getUpComing: async () => {
    const res = await axiosInstance.get("3/movie/upcoming", config);
    return res.data;
  },
  getTopRated: async () => {
    const res = await axiosInstance.get("3/movie/top_rated", config);
    return res.data;
  },
  getGenre: () => {
    return axiosInstance.get("3/genre/movie/list", config);
  },
  getMovieDetails: (movie_id) => {
    return axiosInstance.get(`3/movie/${movie_id}$`, config);
  },
  getMovieCredits: (movie_id) => {
    return axiosInstance.get(`3/movie/${movie_id}$/credits`, config);
  },
  getMovieVideos: (movie_id) => {
    return axiosInstance.get(`3/movie/${movie_id}$/videos`, config);
  },
  searchMovie: (value) => {
    return axiosInstance.get(
      `3/search/movie?query=${value}&include_adult=false&language=en-US&page=1`,
      config,
    );
  },
};
