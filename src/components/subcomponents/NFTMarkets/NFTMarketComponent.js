import React from 'react';
import ChangeLifeTimeComponent from './ChangeLifeTimeComponent.js';
import ChangeOwnerComponent from './ChangeOwnerComponent.js';
import ChangePaymentPlanComponent from './ChangePaymentPlanComponent.js';
import ChangeTransferFeeComponent from './ChangeTransferFeeComponent.js';


const Aux = require("../../../functions/AuxiliaryFunctions.js");


class NFTMarketComponent extends React.Component {
    constructor(props) {
        super(props)
        this.refresh = this.refresh.bind(this)
    }
        
    async refresh() {
        await this.props.refresh()
    }

    render(){
        return (
            <div>
               {(Aux.account)?
                    <div>
                        <ChangeLifeTimeComponent contract={this.props.contract} 
                            refresh={this.refresh}/>
                        <ChangeOwnerComponent contract={this.props.contract} 
                            refresh={this.refresh}/>
                        <ChangePaymentPlanComponent contract={this.props.contract} 
                            refresh={this.refresh}/>
                        <ChangeTransferFeeComponent contract={this.props.contract} 
                            refresh={this.refresh}/>
                    </div>
                    :null}
            </div>
            
          );
    }
}


export default NFTMarketComponent;