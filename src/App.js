import { lazy, Suspense } from 'react';
import { Route, Switch, NavLink, Redirect } from 'react-router-dom';

const HomePage = lazy(() =>
  import('./components/HomePage/HomePage' /* webpackChunkName: "home-page" */),
);
const MoviesPage = lazy(() =>
  import('./components/Movie/MoviesPage' /* webpackChunkName: "movie-page" */),
);
const MovieDetailsPage = lazy(() =>
  import(
    './components/Movie/MovieDetailsPage' /* webpackChunkName: "movie-detail-page" */
  ),
);

    
function App() {
  return (
    <div className="App">
      <nav className="mainNav">
        <NavLink exact to="/" className="mainNavLink" activeClassName="active">
          Home
        </NavLink>
        <NavLink to="/movies" className="mainNavLink" activeClassName="active">
          Movies
        </NavLink>
      </nav>


          <Suspense fallback={<h1>loading...</h1>}>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/movies" exact component={MoviesPage} />
          <Route path="/movies/:moviesId" component={MovieDetailsPage} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;


// function App() {
//   return (
//     <div className="App">
//       <nav className="mainNav">
//         <NavLink exact to="/" className="mainNavLink" activeClassName="active">
//           Home
//         </NavLink>
//         <NavLink to="/movies" className="mainNavLink" activeClassName="active">
//           Movies
//         </NavLink>
//       </nav>
