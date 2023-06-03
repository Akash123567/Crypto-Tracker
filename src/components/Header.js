import React from "react";
import { Link } from "react-router-dom"
import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  IconButton
} from "@material-ui/core";
import { createTheme, makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import AuthModal from "./Authentication/AuthModal";
import UserSidebar from "./Authentication/UserSidebar";
import StackedBarChartIcon from "@mui/icons-material/StackedBarChart";
import Notifications from "react-notifications-menu";
import whiteBellIcon from "../assets/notifications_white_24dp.svg";
import NewsIcon from "@mui/icons-material/Article";
import './customNotifications.css';
import './customNotificationCard.css';

const useStyles = makeStyles((theme) => ({
  link: {
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(2),
    textDecoration: "none",
    cursor: "pointer",
  },

  title: {
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  },
  notificationsIcon: {
    color: "white",
  },
  badge: {
    color: "gold",
  },
  flexContainer: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(4),
  },
  customCount: {
    height: "17px",
    width: "17px",
    maxWidth: "17px",
    minHeight: "17px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "-2px",
    right: "0",
    fontSize: "10px",
    borderRadius: "50%",
    backgroundColor: "red",
    fontWeight: "400",
    color: "white",
  },
  newsIcon:{
    paddingBottom:'20px',
    color:'white',
    size:'medium'
  }
}));

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});

function Header() {
  const classes = useStyles();
  const { currency, setCurrency, user, notifications, watchlist } = CryptoState();
  const history = useHistory();

  const handleNewsIconClick = () => {
    history.push("/news");
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <StackedBarChartIcon style={{ color: "gold" }} />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Typography
              onClick={() => history.push(`/`)}
              variant="h6"
              className={classes.title}
            >
              Crypto Tracker
            </Typography>

            <Link to= "compare" className={classes.link}>
              compare
            </Link>
            <div className={classes.flexContainer}>
              <Select
                variant="outlined"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={currency}
                style={{ width: 85, height: 40 }}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"INR"}>INR</MenuItem>
              </Select>
              <Notifications data={notifications} icon={whiteBellIcon} classNamePrefix={'crypto'} />
              <IconButton className={classes.newsIcon} onClick={handleNewsIconClick}>
                <NewsIcon/>
              </IconButton>
              {user ? <UserSidebar /> : <AuthModal />}
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
