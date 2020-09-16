import React from 'react'

const CurrencyRow = (props) => {


    const {currencyOptions , Currency , onChangeCurrency , amount , handleCurrencyChange } = props ;
       

    //  handle currency  change is  for on change amount 
  

    return (
        <div>

         <input className = "input"  type="number" onChange = {handleCurrencyChange} value={amount}  />
         <select name="" id=""  value = {Currency } onChange = {onChangeCurrency} >
            {/* <option value="Hi">Hi</option>
            <option value="There" > There </option> */}

            {
                currencyOptions ? currencyOptions.map( (country) => <option key = {Math.random()} value = { country }  > {country} </option>  ) : null 
            }

         </select> 
            
        </div>
    )
}

export default CurrencyRow
