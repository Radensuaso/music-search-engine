import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBarTop from "./Components/NavBarTop";
import Home from "./Components/Home";
import Detail from "./Components/Detail";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBarTop />
        <Route path="/" exact component={Home} />
        <Route path="/Detail/:songId" exact component={Detail} />
      </Router>
    </div>
  );
}

export default App;
