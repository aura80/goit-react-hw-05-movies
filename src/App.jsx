import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
// import Home from './components/Home/Home';
// import Movies from './components/Movies/Movies';
// import MovieDetails from './components/MovieDetails/MovieDetails';
// import Cast from './components/Cast/Cast';
// import Reviews from './components/Reviews/Reviews';
// import NotFound from './components/NotFound/NotFound';
import { Container, Header, StyledLink } from './App.styled.js';

const Home = lazy(() => import('./components/Home/Home'));
const Movies = lazy(() => import('./components/Movies/Movies'));
const MovieDetails = lazy(() =>
  import('./components/MovieDetails/MovieDetails')
);
const Cast = lazy(() => import('./components/Cast/Cast'));
const Reviews = lazy(() => import('./components/Reviews/Reviews'));
const NotFound = lazy(() => import('./components/NotFound/NotFound'));

const App = () => {
  return (
      <Container>
        <Header>
          <StyledLink to="/" end>
            Home
          </StyledLink>
          <StyledLink to="/movies">Movies</StyledLink>
        </Header>
        <Suspense fallback={<div>Loading.....</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:movieId" element={<MovieDetails />}>
              <Route path="cast" element={<Cast />} />
              <Route path="reviews" element={<Reviews />} />
            </Route>
            {/* * a wildcard route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Container>
  );
};

export default App;
