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

    handleUpgradeProp = async (event) => {
         event.preventDefault();
         var FinalValues = [];

        for(let i=0; i < this.state.valuesDynamic.length; i++){
            let DecimalsFactor = (i % 4 < PaymentsFunc.TokenDecimalsFactors.length) ? PaymentsFunc.TokenDecimalsFactors[i % 4] : PaymentsFunc.TokenDecimalsFactors[0];
            window.alert("DecimalsFactor " + DecimalsFactor)
            window.alert("DynamicDataType " + this.props.DynamicDataType[i])
            window.alert("valuesDynamic " + this.state.valuesDynamic[i])

            FinalValues.push(this.generateFinalValues(this.props.DynamicDataType[i], this.state.valuesDynamic[i], DecimalsFactor))
        }
         for(let i=0; i < this.state.valuesFix.length; i++){
          window.alert("FixDataType " + this.props.FixDataType[i])
          window.alert("valuesFix " + this.state.valuesFix[i])
            FinalValues.push(this.generateFinalValues(this.props.FixDataType[i], this.state.valuesFix[i], PaymentsFunc.TokenDecimalsFactors[0]))
         }

         window.alert(FinalValues)
         //await func.UpgradeProposition(FinalValues, this.props.contract);
   
         this.resetValues();
         await loadFunc.LoadPropositionFunc(this.props.contract);
         this.props.refresh();
       };

    generateFinalValues(dataType, value, DecimalsFactor){

      if(dataType == Constants.addressDataType) {
        if(value.length > 0) return aux.AddressToBytes32(value);
        else return aux.AddressToBytes32(address_0);
      } 

      else if(dataType == Constants.intDataType){
        if(value.length > 0) return aux.IntToBytes32(value);
        else return aux.IntToBytes32(0);
      }

      else if(dataType == Constants.numberDataType){
        if(value.length > 0)return aux.IntToBytes32(new BigNumber(value).multipliedBy(DecimalsFactor));
        else return aux.IntToBytes32(0);
      }

      else if(dataType == Constants.stringDataType){
        if(value.length > 0) return aux.StringToBytes(value);
        else return aux.StringToBytes("");
      }

      else{
        if(value.length > 0)return value;
        else return emptyBytes;
      }
    }

    AddRemovePaymentToken = (AddRemove) => {
        let list = this.state.PaymentTokens;
        if(AddRemove){
          list.push(this.state.PaymentTokens.length)
          this.updateStateValueDynamic(list.length - 1, (list.length - 1) * this.props.DynamicNames.length);
        }
        else{
          if(list.length > 1){
            list.pop()
            let newValuesDynamics = this.state.valuesDynamic;
            for(let i = this.state.valuesDynamic.length; i > list.length * this.props.DynamicNames.length; i--){
              newValuesDynamics.pop();
            }
            this.setState({valuesDynamic: newValuesDynamics})
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
                                <h6>Payment Token ID : {paymentTokenID}</h6>
                                <Form.Control type="hidden" name={paymentTokenID}
                                    value={paymentTokenID}
                                    onChange={event => this.updateStateValueDynamic(paymentTokenID, paymentTokenID * this.props.DynamicNames.length)}/>
                                {this.props.DynamicNames.map(
                                  (name, index) => (
                                   (index > 0)?
                                   <Form.Control type={this.props.DynamicTypes[index]} name={name + " " + paymentTokenID} placeholder={name} 
                                      value={this.state.valuesDynamic[index + (paymentTokenID * this.props.DynamicNames.length)]}
                                      onChange={event => this.updateStateValueDynamic(event.target.value, index + (paymentTokenID * this.props.DynamicNames.length))}/>
                                      :
                                    ""
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