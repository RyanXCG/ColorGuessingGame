import HomePage from "./component/HomePage";
import GameRules from "./component/GameRules";
import { Switch, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/" component={HomePage} />
        <Route exact={true} path="/gameRules" component={GameRules} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
