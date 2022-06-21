import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";
import Header from "./Components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route
          path={["/nomad_framermotion/tv", "/nomad_framermotion/tv/:tvId"]}
        >
          <Tv />
        </Route>
        <Route path="/nomad_framermotion/search">
          <Search />
        </Route>
        <Route
          path={["/nomad_framermotion/", "/nomad_framermotion/movies/:movieId"]}
        >
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
