import React from 'react';
import { Form } from 'react-bootstrap';

const func = require("../../../functions/VoteFunctions.js");
const loadFunc = require("../../../functions/LoadFunctions.js");
const aux = require("../../../functions/AuxiliaryFunctions.js");
const Constants = require("../../../functions/Constants.js");
const address_0 = "0x0000000000000000000000000000000000000000";
const emptyBytes = "0x";
const ENSFunc = require("../../../functions/ENSFunctions.js");


class UpgradePropositionComponent extends React.Component{
    constructor(props) {
      super(props)
      this.refresh = this.refresh.bind(this)
    }

    async refresh() {
      await this.props.refresh();
    }

    state = {
        values: [],
        isUpdatePropositionShown: false
       };

    resetValues = () => {
      var emptyValues = [];
      for(let i=0; i < this.state.values.length; i++){
        emptyValues.push("")
      }
      this.setState({ values: emptyValues })
    }

    updateStateValue = (value, index) => {
      var tmpValues = this.state.values;
      tmpValues[index] = value;
      this.setState({ values: tmpValues })
    }

    toggleUpdatePropositionConfig = () => {
        if(this.state.isUpdatePropositionShown) this.setState({ isUpdatePropositionShown: false })
          
        else {
          if(this.state.values.length == 0)this.props.names.map(() => {this.state.values.push("")})
          this.setState({ isUpdatePropositionShown: true })
        }
      };

    handleUpgradeProp = async (event) => {
         event.preventDefault();
         var FinalValues = [];

         for(let i=0; i < this.state.values.length; i++){
          if(this.props.dataType[i] == Constants.addressDataType) {
            if(this.state.values[i].length > 0){
              let Address = await ENSFunc.Resolution(this.state.values[i]);
              FinalValues.push(aux.AddressToBytes32(Address));
            }
            else{FinalValues.push(aux.AddressToBytes32(address_0));}
          } 

          else if(this.props.dataType[i] == Constants.intDataType){
            if(this.state.values[i].length > 0){
              FinalValues.push(aux.IntToBytes32(this.state.values[i]));
            }
            else{FinalValues.push(aux.IntToBytes32(0));}
          }

          else if(this.props.dataType[i] == Constants.numberDataType){
            if(this.state.values[i].length > 0){
              FinalValues.push(aux.IntToBytes32(100 * this.state.values[i]));
            }
            else{FinalValues.push(aux.IntToBytes32(0));}
          }

          else if(this.props.dataType[i] == Constants.stringDataType){
            if(this.state.values[i].length > 0){
              FinalValues.push(aux.StringToBytes(this.state.values[i]));
            }
            else{FinalValues.push(aux.StringToBytes(""));}
          }

          else{
            if(this.state.values[i].length > 0){
              FinalValues.push(this.state.values[i]);
            }
            else{FinalValues.push(emptyBytes);}
          }

         }

         await func.UpgradeProposition(FinalValues, this.props.contract);
   
         this.resetValues();
         await loadFunc.LoadPropositionFunc(this.props.contract);
         this.props.refresh();
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
                          {this.props.names.map(
                                (name, index) => (
                                  <Form.Control type={this.props.types[index]} name={name} placeholder={name} 
                                    value={this.state.values[index]}
                                    onChange={event => this.updateStateValue(event.target.value, index)}/>
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

export default UpgradePropositionComponent;