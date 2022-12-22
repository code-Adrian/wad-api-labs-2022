import React from "react";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import NowPlayingMoviesPage from "./pages/nowPlayingMoviesPage";
import PopularMoviesPage from "./pages/popularMoviesPage";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import MovieCreditsPage from "./pages/movieCreditsPage";
import TvCreditsPage from "./pages/tvCreditsPage";
import TvShowReviewPage from "./pages/tvShowReviewPage";
import SiteHeader from './components/siteHeader'
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import { createRoot } from "react-dom/client";
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import TvDetailsPage from "./pages/tvDetailsPage";
import TvPage from "./pages/tvPage";
import TvContextProvider from "./contexts/tvContext";
import Login from "./components/login"
import Signup from "./components/signup"
import { AuthProvider } from "./contexts/auth";
import AuthRoute from "./components/authroute";
import NotAuthRoute from "./components/notauthroute";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});
const App = () => {
 
  return (
    
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <AuthProvider>
      <SiteHeader />
      <TvContextProvider>
      <MoviesContextProvider>
      <Routes>

      <Route element={<NotAuthRoute/>}>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        </Route>

        <Route element={<AuthRoute/>}>
         <Route path="/reviews/form" element={ <AddMovieReviewPage /> } />


          <Route path="/creditsTv/:id" element={ <TvCreditsPage /> } />
          <Route path="/credits/:id" element={ <MovieCreditsPage /> } />
         <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
          <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
         <Route path="/movies/popular" element={<PopularMoviesPage />} />
         <Route path="/movies/now_playing" element={<NowPlayingMoviesPage />} />
         <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
         <Route path="/movies/:id" element={<MoviePage />} />


          <Route path="/tvShow/:id" element={<TvDetailsPage />} />
         <Route path="/tvShowReviews/:id" element={ <TvShowReviewPage /> } />
         <Route path="/tv/" element={<TvPage/>}/>


         <Route path="/" element={<HomePage />} />
         <Route path="*" element={ <Navigate to="/" /> } />
        </Route>
      </Routes>
      </MoviesContextProvider>
      </TvContextProvider>
      </AuthProvider>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    
  );
};

const rootElement = createRoot(  document.getElementById("root"),document.body.style.backgroundImage = "url('https://wallpaperboat.com/wp-content/uploads/2019/10/high-resolution-black-background-06.jpg')", document.body.style.backgroundRepeat = "repeat",document.body.style.backgroundSize = "repeat")
rootElement.render(<App />);