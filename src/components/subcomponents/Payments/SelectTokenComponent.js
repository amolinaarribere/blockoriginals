import React from 'react';
import { Dropdown, DropdownButton, Row, Col} from 'react-bootstrap';


const func = require("../../../functions/PaymentsFunctions.js");

class SelectTokenComponent extends React.Component{
     constructor(props) {
      super(props)
      this.refresh = this.refresh.bind(this)
      this.state.paymentTokenId = func.CurrentPaymentID;
    }
  
    state = {
        paymentTokenId : func.CurrentPaymentID
    };
      
    async refresh() {
        this.props.refresh()
    }

    HandleSelect = async (index) => {
      func.changeCurrentPaymentId(index);
      this.refresh();
    }


    render(){
        return (
            <div>
                <DropdownButton id="dropdown-basic-button" title="Payment Token" variant="secondary" onSelect={this.HandleSelect}>
                  {func.TokenAddresses.map((tokenaddress, index) => 
                      (
                        (tokenaddress.active) ? <Dropdown.Item eventKey={index}>{func.TokenSymbols[index]}</Dropdown.Item> : null
                      )
                    )
                  }
                </DropdownButton> 
            </div>
          );
    }
}


export default SelectTokenComponent;