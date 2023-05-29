import { makeStyles } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import { numberWithCommas } from "../CoinsTable";

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();

  const fetchTrendingCoins = async () => {
    // const { data } = await axios.get(TrendingCoins(currency));
    // console.log('data', data);
    const data = [
      {
        id: "bitcoin",
        symbol: "btc",
        name: "Bitcoin",
        image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
        current_price: 2308769,
        market_cap: 44783314902088,
        market_cap_rank: 1,
        fully_diluted_valuation: 48509558130013,
        total_volume: 1141785504625,
        high_24h: 2341424,
        low_24h: 2240020,
        price_change_24h: 60394,
        price_change_percentage_24h: 2.68611,
        market_cap_change_24h: 1216368813526,
        market_cap_change_percentage_24h: 2.79195,
        circulating_supply: 19386893,
        total_supply: 21000000,
        max_supply: 21000000,
        ath: 5128383,
        ath_change_percentage: -55.03514,
        ath_date: "2021-11-10T14:24:11.849Z",
        atl: 3993.42,
        atl_change_percentage: 57644.24843,
        atl_date: "2013-07-05T00:00:00.000Z",
        roi: null,
        last_updated: "2023-05-29T08:13:17.914Z",
        price_change_percentage_24h_in_currency: 2.6861063026678993
      },
      {
        id: "ethereum",
        symbol: "eth",
        name: "Ethereum",
        image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
        current_price: 157137,
        market_cap: 18907659008765,
        market_cap_rank: 2,
        fully_diluted_valuation: 18907659008765,
        total_volume: 655433091743,
        high_24h: 158626,
        low_24h: 151876,
        price_change_24h: 4595.52,
        price_change_percentage_24h: 3.01264,
        market_cap_change_24h: 564009777475,
        market_cap_change_percentage_24h: 3.07469,
        circulating_supply: 120256010.188417,
        total_supply: 120256010.188417,
        max_supply: null,
        ath: 362338,
        ath_change_percentage: -56.66575,
        ath_date: "2021-11-10T14:24:19.604Z",
        atl: 28.13,
        atl_change_percentage: 558057.60068,
        atl_date: "2015-10-20T00:00:00.000Z",
        roi: {
          times: 90.01281708891347,
          currency: "btc",
          percentage: 9001.281708891347
        },
        last_updated: "2023-05-29T08:13:14.064Z",
        price_change_percentage_24h_in_currency: 3.012635609094298
      },
      {
        id: "ripple",
        symbol: "xrp",
        name: "XRP",
        image: "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1605778731",
        current_price: 39.74,
        market_cap: 2066103713658,
        market_cap_rank: 6,
        fully_diluted_valuation: 3974546239713,
        total_volume: 64538329772,
        high_24h: 40.17,
        low_24h: 38.98,
        price_change_24h: 0.618522,
        price_change_percentage_24h: 1.58114,
        market_cap_change_24h: 32485560824,
        market_cap_change_percentage_24h: 1.59743,
        circulating_supply: 51983386003,
        total_supply: 99988920499,
        max_supply: 100000000000,
        ath: 215.1,
        ath_change_percentage: -81.50684,
        ath_date: "2018-01-07T00:00:00.000Z",
        atl: 0.159343,
        atl_change_percentage: 24864.78595,
        atl_date: "2013-08-16T00:00:00.000Z",
        roi: null,
        last_updated: "2023-05-29T08:13:08.129Z",
        price_change_percentage_24h_in_currency: 1.5811424343662082
      },
      {
        id: "solana",
        symbol: "sol",
        name: "Solana",
        image: "https://assets.coingecko.com/coins/images/4128/large/solana.png?1640133422",
        current_price: 1714.6,
        market_cap: 679660371499,
        market_cap_rank: 11,
        fully_diluted_valuation: 940895597334,
        total_volume: 24148642243,
        high_24h: 1745.02,
        low_24h: 1685.7,
        price_change_24h: 21.81,
        price_change_percentage_24h: 1.28837,
        market_cap_change_24h: 9321991890,
        market_cap_change_percentage_24h: 1.39064,
        circulating_supply: 396463114.844582,
        total_supply: 548848240.834627,
        max_supply: null,
        ath: 19286.66,
        ath_change_percentage: -91.11925,
        ath_date: "2021-11-06T21:54:35.825Z",
        atl: 38.03,
        atl_change_percentage: 4404.32225,
        atl_date: "2020-05-11T19:35:23.449Z",
        roi: null,
        last_updated: "2023-05-29T08:13:17.738Z",
        price_change_percentage_24h_in_currency: 1.2883724948182769
      },
      {
        id: "binancecoin",
        symbol: "bnb",
        name: "BNB",
        image: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1644979850",
        current_price: 26009,
        market_cap: 4107431397452,
        market_cap_rank: 4,
        fully_diluted_valuation: 5203025110797,
        total_volume: 49748893298,
        high_24h: 26091,
        low_24h: 25368,
        price_change_24h: 566.13,
        price_change_percentage_24h: 2.2251,
        market_cap_change_24h: 90904511893,
        market_cap_change_percentage_24h: 2.26326,
        circulating_supply: 157886280,
        total_supply: 157900174,
        max_supply: 200000000,
        ath: 50351,
        ath_change_percentage: -48.39986,
        ath_date: "2021-05-10T07:24:17.097Z",
        atl: 2.58,
        atl_change_percentage: 1005076.75793,
        atl_date: "2017-10-19T00:00:00.000Z",
        roi: null,
        last_updated: "2023-05-29T08:13:15.372Z",
        price_change_percentage_24h_in_currency: 2.2250989025742873
      },
      {
        id: "dogecoin",
        symbol: "doge",
        name: "Dogecoin",
        image: "https://assets.coingecko.com/coins/images/5/large/dogecoin.png?1547792256",
        current_price: 6.06,
        market_cap: 845519568008,
        market_cap_rank: 9,
        fully_diluted_valuation: null,
        total_volume: 21560325178,
        high_24h: 6.11,
        low_24h: 5.97,
        price_change_24h: 0.03934428,
        price_change_percentage_24h: 0.65399,
        market_cap_change_24h: 6594892015,
        market_cap_change_percentage_24h: 0.78611,
        circulating_supply: 139543026383.705,
        total_supply: null,
        max_supply: null,
        ath: 53.62,
        ath_change_percentage: -88.70773,
        ath_date: "2021-05-08T05:08:23.458Z",
        atl: 0.00552883,
        atl_change_percentage: 109410.56979,
        atl_date: "2015-05-06T00:00:00.000Z",
        roi: null,
        last_updated: "2023-05-29T08:13:09.017Z",
        price_change_percentage_24h_in_currency: 0.6539897499485585
      },
      {
        id: "cardano",
        symbol: "ada",
        name: "Cardano",
        image: "https://assets.coingecko.com/coins/images/975/large/cardano.png?1547034860",
        current_price: 31.32,
        market_cap: 1098325552451,
        market_cap_rank: 7,
        fully_diluted_valuation: 1410318746837,
        total_volume: 20604068916,
        high_24h: 31.9,
        low_24h: 30.54,
        price_change_24h: 0.489076,
        price_change_percentage_24h: 1.58623,
        market_cap_change_24h: 15871826485,
        market_cap_change_percentage_24h: 1.46628,
        circulating_supply: 35045020830.3234,
        total_supply: 45000000000,
        max_supply: 45000000000,
        ath: 225.26,
        ath_change_percentage: -86.08437,
        ath_date: "2021-09-02T06:00:10.474Z",
        atl: 1.38,
        atl_change_percentage: 2179.06758,
        atl_date: "2017-11-02T00:00:00.000Z",
        roi: null,
        last_updated: "2023-05-29T08:13:12.236Z",
        price_change_percentage_24h_in_currency: 1.5862284760756185
      },
      {
        id: "chainlink",
        symbol: "link",
        name: "Chainlink",
        image: "https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png?1547034700",
        current_price: 545.94,
        market_cap: 282433883885,
        market_cap_rank: 21,
        fully_diluted_valuation: 546188163989,
        total_volume: 10000927141,
        high_24h: 550.67,
        low_24h: 534.74,
        price_change_24h: 9.85,
        price_change_percentage_24h: 1.83816,
        market_cap_change_24h: 5149703804,
        market_cap_change_percentage_24h: 1.85719,
        circulating_supply: 517099971.2305644,
        total_supply: 1000000000,
        max_supply: 1000000000,
        ath: 3862.15,
        ath_change_percentage: -85.87321,
        ath_date: "2021-05-10T00:13:57.214Z",
        atl: 9.55,
        atl_change_percentage: 5615.06701,
        atl_date: "2017-11-29T00:00:00.000Z",
        roi: null,
        last_updated: "2023-05-29T08:13:09.153Z",
        price_change_percentage_24h_in_currency: 1.8381594397081016
      },
      {
        id: "polkadot",
        symbol: "dot",
        name: "Polkadot",
        image: "https://assets.coingecko.com/coins/images/12171/large/polkadot.png?1639712644",
        current_price: 452.99,
        market_cap: 560318965765,
        market_cap_rank: 13,
        fully_diluted_valuation: 596981414152,
        total_volume: 8855026579,
        high_24h: 459.11,
        low_24h: 443.09,
        price_change_24h: 8.08,
        price_change_percentage_24h: 1.8161,
        market_cap_change_24h: 10258476633,
        market_cap_change_percentage_24h: 1.86497,
        circulating_supply: 1237144644.86693,
        total_supply: 1318092737.7589,
        max_supply: null,
        ath: 4095.22,
        ath_change_percentage: -88.95682,
        ath_date: "2021-11-04T14:10:09.301Z",
        atl: 202.26,
        atl_change_percentage: 123.5979,
        atl_date: "2020-08-19T03:44:11.556Z",
        roi: null,
        last_updated: "2023-05-29T08:13:11.695Z",
        price_change_percentage_24h_in_currency: 1.8160958854034213
      },
      {
        id: "stellar",
        symbol: "xlm",
        name: "Stellar",
        image: "https://assets.coingecko.com/coins/images/100/large/Stellar_symbol_black_RGB.png?1552356157",
        current_price: 7.37,
        market_cap: 197688901517,
        market_cap_rank: 28,
        fully_diluted_valuation: 368784096445,
        total_volume: 3285561933,
        high_24h: 7.38,
        low_24h: 7.26,
        price_change_24h: 0.066499,
        price_change_percentage_24h: 0.91006,
        market_cap_change_24h: 1880752204,
        market_cap_change_percentage_24h: 0.96051,
        circulating_supply: 26803754575.9339,
        total_supply: 50001787337.4738,
        max_supply: 50001787337.4738,
        ath: 58.01,
        ath_change_percentage: -87.29205,
        ath_date: "2021-05-16T09:48:45.220Z",
        atl: 0.02966141,
        atl_change_percentage: 24752.21866,
        atl_date: "2015-03-05T00:00:00.000Z",
        roi: null,
        last_updated: "2023-05-29T08:13:08.266Z",
        price_change_percentage_24h_in_currency: 0.91006011302949
      }
    ]
    setTrending(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const useStyles = makeStyles((theme) => ({
    carousel: {
      height: "50%",
      display: "flex",
      alignItems: "center",
    },
    carouselItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      textTransform: "uppercase",
      color: "white",
    },
  }));

  const classes = useStyles();

  const items = trending.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;

    return (
      <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </div>
  );
};

export default Carousel;
