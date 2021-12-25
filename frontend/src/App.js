import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/chats">
          <Chat />
        </Route>
      </Switch>
    </>
  );
}

export default App;
