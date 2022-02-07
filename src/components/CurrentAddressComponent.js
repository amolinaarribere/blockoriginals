import React from 'react';
const AuxFunc = require("../functions/AuxiliaryFunctions.js");


class CurrentAddressComponent extends React.Component{

    render(){
      return(
        <div>
          <h6 class="text-white">Your Address : {AuxFunc.accountResolved}</h6>
        </div>

      );
    }
  }

export default CurrentAddressComponent;