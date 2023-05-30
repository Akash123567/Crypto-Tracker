import React, { useEffect, useState } from "react";
import { makeStyles, Backdrop, CircularProgress, FormControlLabel } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import { CryptoState } from "../CryptoContext";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: "20px",
    },
    checkboxContainer: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        marginBottom: "10px",
    },
    filterLabel: {
        color: "white",
        marginLeft: theme.spacing(1),
    },
    article: {
        display: "flex",
        alignItems: "flex-start", // Align titles with the top line of the image
        marginBottom: "20px",
        color: "white",
        textDecoration: "none", // Set the width to take up the whole viewport
    },
    articleImage: {
        marginRight: "10px",
        width: "80px",
        height: "80px",
        objectFit: "cover",
    },
    articleContent: {
        flex: 1, // Take up remaining space in the flex container
    },
    articleTitle: {
        textDecoration: "underline", // Add underline to the titles
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
    },
    filterCheckbox: {
        color: "white",
        "&$checked": {
            color: "gold",
        },
    },
    checked: {},
}));

const NewsPage = () => {
    const classes = useStyles();
    const [news, setNews] = useState([]);
    const [filteredNews, setFilteredNews] = useState([]);
    const [showWatchlistNews, setShowWatchlistNews] = useState(false);
    const [loading, setLoading] = useState(true);
    const { watchlist } = CryptoState();

    useEffect(() => {
        // Fetch news articles from the API
        const fetchNews = async () => {
            try {
                const { data } = await axios.get(
                    "https://api.coingecko.com/api/v3/news"
                );
                console.log("data", data);
                setNews(data.data);
                setLoading(false); // Set loading to false once data is fetched
            } catch (error) {
                console.error("Error fetching news:", error);
                setLoading(false); // Set loading to false in case of an error
            }
        };

        fetchNews();
    }, []);

    useEffect(() => {
        // Filter news articles based on watchlist
        if (showWatchlistNews) {
            const filtered = news.filter((article) => {
                const lowercaseTitle = article.title.toLowerCase();
                return (
                    article.thumb_2x !== "" &&
                    watchlist.some((coin) => lowercaseTitle.includes(coin.toLowerCase()))
                );
            });
            setFilteredNews(filtered);
        } else {
            const filtered = news.filter((article) => article.thumb_2x !== "");
            setFilteredNews(filtered);
        }
    }, [showWatchlistNews, news, watchlist]);

    const handleCheckboxChange = (event) => {
        setShowWatchlistNews(event.target.checked);
    };

    const getDescription = (description) => {
        const sentences = description.split(".");
        const truncated = sentences.slice(0, 2).join(".").concat("...");
        return truncated;
    };

    return (
        <div className={classes.container}>
            <div className={classes.checkboxContainer}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={showWatchlistNews}
                            onChange={handleCheckboxChange}
                            classes={{
                                root: classes.filterCheckbox,
                                checked: classes.checked,
                            }}
                        />
                    }
                    label="Filter Watchlist News"
                    classes={{
                        label: classes.filterLabel,
                    }}
                />
            </div>

            {loading ? ( // Render loading spinner when data is being fetched
                <Backdrop className={classes.backdrop} open={loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            ) : (
                filteredNews?.map((article) => (
                    <a
                        key={article.id}
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={classes.article}
                    >
                        <img
                            src={article.thumb_2x}
                            alt="Article"
                            className={classes.articleImage}
                        />
                        <div>
                            <h3>{article.title}</h3>
                            <p>{getDescription(article.description)}</p>
                        </div>
                    </a>
                ))
            )}
        </div>
    );
};

export default NewsPage;
