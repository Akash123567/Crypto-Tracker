import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CryptoState } from "../CryptoContext";
import './ComparePage.css';
import CoinPageNew from "./CoinPageNew";
import {
    Container,
    createTheme,
    Select,
    MenuItem,
    ThemeProvider,
    Grid,
} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: theme.spacing(4),
    },
    verticalLine: {
        borderLeft: `1px solid ${theme.palette.primary.main}`,
        height: "95%",
        color: "gold"
    },
    selectContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: theme.spacing(2),
        width: "50% "  //------------------
    },
    select: {
        width: 200,
        margin: theme.spacing(2),
    },

    coinPageContainer: {
        width: "50%", // Adjust the width as desired
        display: "flex",
        justifyContent: " center"
    },

}));

const darkTheme = createTheme({
    palette: {
        primary: {
            main: "#fff",
        },
        type: "dark",
    },
});




const MyComponent = () => {
    const [coinsdata, setcoindata] = useState([]);
    const [selectedCoin, setSelectedCoin] = useState('bitcoin');
    const [selectedCoin1, setSelectedCoin1] = useState('bitcoin');
    const { symbol, coins, loading } = CryptoState();
    const [coinData , setCoinData] = useState('');
    const [coinDataList , setCoinDataList] = useState('');
    const [coinData1 , setCoinData1] = useState('');
    const [ coinDataList1 , setCoinDataList1   ] = useState('');
    
    // console.log(coins);
    const classes = useStyles();


    //   useEffect (   () =>{
    //     setcoindata(coins);
    //   })

    useEffect(() => {
        setcoindata(coins);
    }, [coins, selectedCoin , selectedCoin1]);

    const handleClick = (id) => {
        setSelectedCoin(id);
        const coinData = coinsdata.find((coin) => coin.id == id  );
        setCoinDataList(coinData);
        console.log(id, "id hu m");
        console.log(selectedCoin, "selectedCoin");
    };

    const handleClick1 = (id) => {
        setSelectedCoin1(id);
        const coinData1 = coinsdata.find((coin) => coin.id == id  );
        setCoinDataList1(coinData1);
        console.log(id, "id hu m");
        console.log(selectedCoin1, "selectedCoin");
    };
//-----------------------------------------------------
    const handleSelectChange = (event) => {
        setCoinData(event.target.value);
      };
    
      const handleSelectChange2 = (event) => {
        setCoinData1(event.target.value);
      };
//------------------------------------------------------
    return (
        // <Container className={classes.container} maxWidth={false}>
        <ThemeProvider theme={darkTheme}>
            <Grid container xs={12} spacing={2} sx={{
                width: '100vw',
                height: '100vh',
                spacing: 0,
                justify: 'space-around'
            }}>
                <Grid container item xs={6} >
                    <Grid item xs={4}>
                        <Select
                            className={classes.select}
                            variant="outlined"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={coinData}
                            onChange={handleSelectChange}
                            renderValue={() => (
                                <>
                                  {coinDataList ? (
                                    <>
                                      <img src={coinDataList.image} alt="icon" className='icon' />
                                      {coinDataList.name}
                                    </>
                                  ) : null}
                                </>
                              )}
                            >
                        
                            {coinsdata.map((option) => (
                                <MenuItem key={option.value} value={option.id} onClick={(e) => handleClick(option.id)}     >
                                    <img src={option.image} alt="icon" className='icon' />
                                    { option.name }
        
                                    
                                    
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={8}> </Grid>
                    <Grid item xs={12} sx={{height:"100vh"}} >
                        <CoinPageNew id={selectedCoin} />
                    </Grid>
                </Grid>
                {/* <Grid item className={classes.verticalLine} xs={2}></Grid> */}
                <Grid container item xs={6} >
                    <Grid item xs={4} >
                        <Select
                            className={classes.select}
                            variant="outlined"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={coinData1}
                            onChange={handleSelectChange2}
                            renderValue={() => (
                                <>
                                  {coinDataList1 ? (
                                    <>
                                      <img src={coinDataList1.image} alt="icon" className='icon' />
                                      {coinDataList1.name}
                                    </>
                                  ) : null}
                                </>
                              )}
                            >
                        
                            {coinsdata.map(option => (
                                <MenuItem key={option.value} value={option.id} onClick={(e) => handleClick1(option.id)}>
                                    <img src={option.image} alt="icon" className='icon' />
                                    { option.name}
                               
                                    
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={8}> </Grid>
                    <Grid item xs={12} sx={{height:"100vh"}} >
                        <CoinPageNew id={selectedCoin1} />
                    </Grid>
                </Grid>
            </Grid>
        </ThemeProvider>
        // </Container>
    );
};

export default MyComponent;
