import { makeStyles } from "@material-ui/core";
import Homepage from "./Pages/HomePage";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import CoinPage from "./Pages/CoinPage";
import Header from "./components/Header";
import ComparePage from "./Pages/ComparePage";
import Alert from "./components/Alert";
import NewsPage from "./Pages/NewsPage";


const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Route path="/" component={Homepage} exact />
        <Route path="/coins/:id" component={CoinPage} exact />
        <Route path="/compare" component={ComparePage} exact />
        <Route path="/news" component={NewsPage} exact /> {/* Add this line */}
      </div>
      <Alert />
    </BrowserRouter>
  );
}

export default App;
