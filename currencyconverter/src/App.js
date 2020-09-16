import React, { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './Components/CurrencyRow';
import axios from 'axios';

const BASE_URL = 'https://api.exchangeratesapi.io/latest';

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate,setExchangeRate] = useState() ;
  const [amount ,setAmount] = useState(1) ;
  const [amountInFromCurrency,setamountInFromCurrency] = useState(true) ;


  let toAmount , fromAmount ;

  if (  amountInFromCurrency ){

    fromAmount = amount ;
    toAmount = amount * exchangeRate ;

  }else{

    toAmount = amount ;
    fromAmount = amount/exchangeRate ;

  }

  function handleFromAmountChange(e) {
    setAmount(e.target.value) ;
    setamountInFromCurrency(true) ;
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value) ;
    setamountInFromCurrency(false) ;
  }
   
  useEffect(() => {
    axios
      .get(BASE_URL)
      .then((res) => { 
        const firstCurrency = Object.keys(res.data.rates)[0] ;
        setCurrencyOptions([res.data.base, ...Object.keys(res.data.rates)] )
        setFromCurrency(res.data.base) ;
        setToCurrency(firstCurrency) ;  
        setExchangeRate(res.data.rates[firstCurrency]) ;
         
        

        } );
  }, []);


  useEffect( () => {

    if ( fromCurrency != null && toCurrency != null  ){
      axios.get(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
      .then( data => {
        // console.log(data)
         setExchangeRate( data.data.rates[toCurrency]) }  ).catch( err => console.log(err) )
    }


  } , [fromCurrency,toCurrency] )


  return (
    <div className="App">
      <h1 className="middle">Currency Converter</h1>

      <div className="container">
        <CurrencyRow
          currencyOptions={currencyOptions}
          Currency = {fromCurrency}
          onChangeCurrency = {(e) => setFromCurrency(e.target.value) }
          amount = {fromAmount}
          handleCurrencyChange ={handleFromAmountChange}
        />
        <div className="equals">=</div>
        <CurrencyRow
          currencyOptions={currencyOptions}
          Currency = {toCurrency}
          onChangeCurrency = {(e) => setToCurrency(e.target.value) }
          amount = {toAmount}
          handleCurrencyChange = {handleToAmountChange}
        />
      </div>
    </div>
  );
}

export default App;
