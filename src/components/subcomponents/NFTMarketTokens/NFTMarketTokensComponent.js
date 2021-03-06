import React from 'react';
import SubmitCancelOfferComponent from './SubmitCancelOfferComponent.js';
import ReplyOfferComponent from './ReplyOfferComponent.js';
import MintComponent from './MintComponent.js';
import DisplayTokenComponent from './DisplayTokenComponent.js';
import SetTokenPriceComponent from './SetTokenPriceComponent.js';
import TransferComponent from './TransferComponent.js';


const Aux = require("../../../functions/AuxiliaryFunctions.js");


class NFTMarketTokensComponent extends React.Component {
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
                <h3>Tokens</h3>
                <br />
                <DisplayTokenComponent contract={this.props.contract} />
               {(Aux.account)?
                    <div>
                        <TransferComponent contract={this.props.contract} 
                            refresh={this.refresh}/>
                        <SubmitCancelOfferComponent contract={this.props.contract} 
                            refresh={this.refresh}/>
                        <ReplyOfferComponent contract={this.props.contract} 
                            refresh={this.refresh}/>
                        <MintComponent contract={this.props.contract} 
                            refresh={this.refresh}/>
                        <SetTokenPriceComponent contract={this.props.contract} 
                            refresh={this.refresh}/>
                    </div>
                    :null}
                <hr class="bg-secondary"/>
            </div>
            
          );
    }
}


export default NFTMarketTokensComponent;