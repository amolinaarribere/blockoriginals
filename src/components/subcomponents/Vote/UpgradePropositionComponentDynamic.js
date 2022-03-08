import React from 'react';
import { Form } from 'react-bootstrap';

const func = require("../../../functions/VoteFunctions.js");
const loadFunc = require("../../../functions/LoadFunctions.js");
const aux = require("../../../functions/AuxiliaryFunctions.js");
const Constants = require("../../../functions/Constants.js");
const PaymentsFunc = require("../../../functions/PaymentsFunctions.js");
const address_0 = "0x0000000000000000000000000000000000000000";
const emptyBytes = "0x";
const BigNumber = require('bignumber.js');



class UpgradePropositionComponentDynamic extends React.Component{
    constructor(props) {
      super(props)
      this.refresh = this.refresh.bind(this)
    }

    async refresh() {
      await this.props.refresh();
    }

    state = {
        valuesDynamic: [],
        valuesFix: [],
        isUpdatePropositionShown: false,
        PaymentTokens: [0]
       };

    resetValues = () => {
      var emptyValuesDynamic = [];
      var emptyValuesFix = [];

      for(let i=0; i < this.state.valuesDynamic.length; i++){
        emptyValuesDynamic.push("")
      }
      for(let i=0; i < this.state.valuesFix.length; i++){
        emptyValuesFix.push("")
      }
      this.setState({ valuesDynamic: emptyValuesDynamic })
      this.setState({ valuesFix: emptyValuesFix })
    }

    updateStateValueDynamic = (value, index) => {
      var tmpValues = this.state.valuesDynamic;
      tmpValues[index] = value;
      this.setState({ valuesDynamic: tmpValues })
    }

    updateStateValueFix = (value, index) => {
      var tmpValues = this.state.valuesFix;
      tmpValues[index] = value;
      this.setState({ valuesFix: tmpValues })
    }

    toggleUpdatePropositionConfig = () => {
        if(this.state.isUpdatePropositionShown) this.setState({ isUpdatePropositionShown: false })
          
        else {
          if(this.state.valuesDynamic.length == 0){
            this.props.DynamicNames.map(() => {this.state.valuesDynamic.push("")})
          }
          if(this.state.valuesFix.length == 0){
            this.props.FixNames.map(() => {this.state.valuesFix.push("")})
          }
          this.setState({ isUpdatePropositionShown: true })
        }
      };

    TreasuryValues(){
      let FinalValues = [];
      let numberOfTokens = 0;

      FinalValues.push(this.generateFinalValues(Constants.intDataType, 0, 1)); 
      FinalValues.push(this.generateFinalValues(Constants.intDataType, 4, 1)); // hard coded
      FinalValues.push(this.generateFinalValues(Constants.intDataType, 0, 1)); // hard coded

      for(let i=0; i < (this.state.valuesDynamic.length / 5) + 1; i++){
        if(this.state.valuesDynamic[i * 5]){
          numberOfTokens++;
          let paymentTokenID = parseInt(this.state.valuesDynamic[i * 5]);
          for(let j=0; j < 5; j++){
            let DecimalsFactor = (paymentTokenID < PaymentsFunc.TokenDecimalsFactors.length) ? PaymentsFunc.TokenDecimalsFactors[paymentTokenID] : PaymentsFunc.TokenDecimalsFactors[0];
            FinalValues.push(this.generateFinalValues(this.props.DynamicDataType[j], this.state.valuesDynamic[(i * 5) + j], DecimalsFactor))
          }
        }
      }

      FinalValues[0] = this.generateFinalValues(Constants.intDataType, numberOfTokens, 1);

      if(this.state.valuesFix.length > 0){
        FinalValues[2] = this.generateFinalValues(Constants.intDataType, 4, 1);
        for(let i=0; i < 5; i++){
          FinalValues.push(this.generateFinalValues(this.props.FixDataType[i], this.state.valuesFix[i], 1));
        }
      }

      return FinalValues;
    }

    PaymentValues(){
      let FinalValues = [];

      for(let i=0; i < (this.state.valuesDynamic.length / 2) + 1; i++){
        if(this.state.valuesDynamic[i * 2]){
          for(let j=0; j < 2; j++){
            FinalValues.push(this.generateFinalValues(this.props.DynamicDataType[j], this.state.valuesDynamic[(i * 2) + j], 1))
          }
        }
      }

      return FinalValues;
    }
    
    handleUpgradeProp = async (event) => {
        event.preventDefault();
        let FinalValues = [];

        if(this.props.Treasury) FinalValues = this.TreasuryValues();
        else FinalValues = this.PaymentValues();
        
        await func.UpgradeProposition(FinalValues, this.props.contract);
   
        this.resetValues();
        await loadFunc.LoadPropositionFunc(this.props.contract);
        this.props.refresh();
    };

    generateFinalValues(dataType, value, DecimalsFactor){
      if(dataType == Constants.addressDataType) {
        if(value) return aux.AddressToBytes32(value);
        else return aux.AddressToBytes32(address_0);
      } 

      else if(dataType == Constants.intDataType){
        if(value) return aux.IntToBytes32(value);
        else return aux.IntToBytes32(0);
      }

      else if(dataType == Constants.numberDataType){
        if(value)return aux.IntToBytes32(new BigNumber(value).multipliedBy(DecimalsFactor));
        else return aux.IntToBytes32(0);
      }

      else if(dataType == Constants.stringDataType){
        if(value) return aux.StringToBytes(value);
        else return aux.StringToBytes("");
      }

      else{
        if(value)return value;
        else return emptyBytes;
      }
    }

    AddRemovePaymentToken = (AddRemove) => {
        let list = this.state.PaymentTokens;
        if(AddRemove){
          list.push(this.state.PaymentTokens.length)
        }
        else{
          if(list.length > 1){
            list.pop()
          }
        }
        this.setState({PaymentTokens: list})
    };
    
    AddPaymentToken = (event) => {
      event.preventDefault();
      this.AddRemovePaymentToken(true);
    };

    RemovePaymentToken = (event) => {
      event.preventDefault();
      this.AddRemovePaymentToken(false);
    };   

    render(){
         return (
           <div>
              <button
                    className="btn btn-lg btn-primary center modal-button"
                    onClick={this.toggleUpdatePropositionConfig}>{this.props.text}</button>

                  {this.state.isUpdatePropositionShown ? (
                    <div class="border border-primary border-5">
                      <Form onSubmit={this.handleUpgradeProp} style={{margin: '50px 50px 50px 50px' }}>
                        <Form.Group  className="mb-3">
                          {this.state.PaymentTokens.map(
                            (paymentTokenID) => (
                              <div>
                                <h6>Payment Token number : {paymentTokenID}</h6>
                                {this.props.DynamicNames.map(
                                  (name, index) => (
                                   <Form.Control type={this.props.DynamicTypes[index]} name={name + " " + paymentTokenID} placeholder={name} 
                                      value={this.state.valuesDynamic[index + (paymentTokenID * this.props.DynamicNames.length)]}
                                      onChange={event => this.updateStateValueDynamic(event.target.value, index + (paymentTokenID * this.props.DynamicNames.length))}/>
                                  )
                                )}
                                <br />
                              </div>
                            )
                          )}
                          <button class="btn btn-secondary" onClick={this.AddPaymentToken}>Add</button> &nbsp;&nbsp;
                          <button class="btn btn-secondary" onClick={this.RemovePaymentToken}>Remove</button> &nbsp;&nbsp;
                          <br />
                          <br />
                          {this.props.FixNames.map(
                                (name, index) => (
                                  <Form.Control type={this.props.FixTypes[index]} name={name} placeholder={name} 
                                    value={this.state.valuesFix[index]}
                                    onChange={event => this.updateStateValueFix(event.target.value, index)}/>
                                )
                            )}
                        </Form.Group>
                        <button class="btn btn-primary">{this.props.textButton}</button>
                      </Form>
                      <br/>
                    </div>) : null}    
           </div>
         );
       }
  }

export default UpgradePropositionComponentDynamic;