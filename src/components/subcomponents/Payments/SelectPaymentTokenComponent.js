import React from 'react';
import { Dropdown, DropdownButton} from 'react-bootstrap';


const PaymentsFunc = require("../../../functions/PaymentsFunctions.js");

class SelectPaymentTokenComponent extends React.Component{
     constructor(props) {
      super(props)
      this.refresh = this.refresh.bind(this)
    }
      
    async refresh() {
        this.props.refresh()
    }


    render(){
        return (
            <div>
                <DropdownButton id="dropdown-basic-button" title={this.props.selectedPaymentLabel} variant="secondary" onSelect={this.props.HandleSelect}>
                    {PaymentsFunc.TokenAddresses.map((tokenaddress, index) => 
                          (
                            (tokenaddress.active || this.props.DisplayAll) ? <Dropdown.Item eventKey={index}>{PaymentsFunc.TokenSymbols[index]}</Dropdown.Item> : null
                          )
                       )
                     }
                </DropdownButton> 
            </div>
          );
    }
}


export default SelectPaymentTokenComponent;