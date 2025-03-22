
// Movie data interface
export interface Movie {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  coverUrl: string;
  year: number;
  duration: string;
  genre: string[];
  rating: string;
  isFeatured?: boolean;
  trailerUrl?: string;
}

// Category interface
export interface Category {
  id: string;
  name: string;
  movies: Movie[];
}

// Mock movie data
export const movieData: Movie[] = [
  {
    id: "1",
    title: "Inception",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    thumbnailUrl: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    coverUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    year: 2010,
    duration: "2h 28m",
    genre: ["Action", "Sci-Fi", "Thriller"],
    rating: "PG-13",
    isFeatured: true,
    trailerUrl: "https://www.youtube.com/embed/YoHD9XEInc0"
  },
  {
    id: "2",
    title: "The Matrix",
    description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    thumbnailUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    coverUrl: "https://images.unsplash.com/photo-1592495479372-82b580d9410c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    year: 1999,
    duration: "2h 16m",
    genre: ["Action", "Sci-Fi"],
    rating: "R"
  },
  {
    id: "3",
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    thumbnailUrl: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    coverUrl: "https://images.unsplash.com/photo-1501862700950-18382cd41497?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    year: 2014,
    duration: "2h 49m",
    genre: ["Adventure", "Drama", "Sci-Fi"],
    rating: "PG-13"
  },
  {
    id: "4",
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    thumbnailUrl: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    coverUrl: "https://images.unsplash.com/photo-1514539079130-25950c84af65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    year: 2008,
    duration: "2h 32m",
    genre: ["Action", "Crime", "Drama"],
    rating: "PG-13"
  },
  {
    id: "5",
    title: "Pulp Fiction",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    thumbnailUrl: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    coverUrl: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    year: 1994,
    duration: "2h 34m",
    genre: ["Crime", "Drama"],
    rating: "R"
  },
  {
    id: "6",
    title: "The Shawshank Redemption",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    thumbnailUrl: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    coverUrl: "https://images.unsplash.com/photo-1486693128850-a77436e7ba3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    year: 1994,
    duration: "2h 22m",
    genre: ["Drama"],
    rating: "R"
  },
  {
    id: "7",
    title: "Fight Club",
    description: "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.",
    thumbnailUrl: "https://images.unsplash.com/photo-1528092744838-b91de0a10615?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    coverUrl: "https://images.unsplash.com/photo-1526430733783-a03e0053b27a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    year: 1999,
    duration: "2h 19m",
    genre: ["Drama"],
    rating: "R"
  },
  {
    id: "8",
    title: "Forrest Gump",
    description: "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
    thumbnailUrl: "https://images.unsplash.com/photo-1519864967-22b37f31a770?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    coverUrl: "https://images.unsplash.com/photo-1508336511136-e4ef634b7008?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    year: 1994,
    duration: "2h 22m",
    genre: ["Drama", "Romance"],
    rating: "PG-13"
  }
];

// Mock categories with movies
export const categories: Category[] = [
  {
    id: "1",
    name: "Trending Now",
    movies: movieData.slice(0, 6)
  },
  {
    id: "2",
    name: "Sci-Fi Adventures",
    movies: movieData.filter(movie => movie.genre.includes("Sci-Fi"))
  },
  {
    id: "3",
    name: "Award Winning Dramas",
    movies: movieData.filter(movie => movie.genre.includes("Drama"))
  },
  {
    id: "4",
    name: "Action Packed",
    movies: movieData.filter(movie => movie.genre.includes("Action"))
  },
];

// Get featured movie
export const getFeaturedMovie = (): Movie | undefined => {
  return movieData.find(movie => movie.isFeatured);
};

// Get movie by id
export const getMovieById = (id: string): Movie | undefined => {
  return movieData.find(movie => movie.id === id);
};
