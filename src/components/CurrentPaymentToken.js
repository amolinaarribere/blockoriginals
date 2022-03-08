import React from 'react';
const Func = require("../functions/PaymentsFunctions.js");


class CurrentPaymentToken extends React.Component{

    render(){
      return(
        <div>
          <h6 class="text-white">{Func.TokenSymbols[Func.CurrentPaymentID]}</h6>
        </div>

      );
    }
  }

export default CurrentPaymentToken;