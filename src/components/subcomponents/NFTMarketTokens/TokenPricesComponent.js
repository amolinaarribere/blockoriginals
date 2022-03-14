import React from 'react';
import { Form, Row, Col, Dropdown, DropdownButton} from 'react-bootstrap';


const PaymentsFunc = require("../../../functions/PaymentsFunctions.js");

class TokenPricesComponent extends React.Component{
    constructor(props) {
      super(props)
    }


    render(){
        return (
            <div>
                {this.props.prices.map(
                    (price, index) => (
                        <Row>
                            <Col>
                                <DropdownButton id="dropdown-basic-button" title= {this.props.pricesPaymentTokenLabels[index]} variant="secondary" onSelect={(selectedOption) => this.props.ChangePricePaymentID(selectedOption, index)} >
                                    {PaymentsFunc.TokenAddresses.map((tokenaddress, i) => 
                                        (
                                            <Dropdown.Item eventKey={i}>{PaymentsFunc.TokenSymbols[i]}</Dropdown.Item>
                                        )
                                    )
                                    }
                                </DropdownButton> 
                            </Col>
                            <Col>
                                <Form.Control type="text" name="Price" placeholder="price" 
                                    value={this.props.pricesValues[index]}
                                    onChange={event => this.props.ChangePriceValue(index, event.target.value)}/>
                            </Col>
                            <Col>
                                <Form.Check type="checkbox" name="Disabled" label="Disabled"
                                    checked={this.props.pricesDisabled[index]}
                                    onChange={event => this.props.ChangePriceEnabled(index, event.target.checked)} />  
                            </Col>
                            <Col>
                                {(index == this.props.prices.length - 1) ? <button class="btn btn-secondary" onClick={this.props.AddPrice}>Add</button> : null} &nbsp;&nbsp;
                            </Col>
                            <Col>
                                {((index == this.props.prices.length - 1) && (index > 0)) ?<button class="btn btn-secondary" onClick={this.props.RemovePrice}>Remove</button> : null}
                            </Col>
                        </Row>
                    )                
                )}
            </div>
          );
    }
}


export default TokenPricesComponent;