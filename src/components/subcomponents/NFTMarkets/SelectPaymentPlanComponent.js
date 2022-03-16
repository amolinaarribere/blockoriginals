import React from 'react';
import { Dropdown, DropdownButton} from 'react-bootstrap';
import {PaymentsPlans} from '../../../config.js';



class SelectPaymentPlanComponent extends React.Component{
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
                <DropdownButton id="dropdown-basic-button" title={this.props.selectedPaymentPlanLabel} variant="dark" onSelect={this.props.HandleSelect}>
                    {PaymentsPlans.map((paymentplan, index) => 
                          (
                            <Dropdown.Item eventKey={index}>{paymentplan}</Dropdown.Item>
                          )
                       )
                     }
                </DropdownButton>  
            </div>
          );
    }
}


export default SelectPaymentPlanComponent;