import React from 'react';
import ListOwnersComponent from './ListOwnersComponent.js';
import ListPendingOwnersComponent from './ListPendingOwnersComponent.js';
import UpdateMinOwnerComponent from './UpdateMinOwnerComponent.js';
import ManageOwnerComponent from './ManageOwnerComponent.js';

class OwnerComponent extends React.Component{
  constructor(props) {
    super(props)
    this.refresh = this.refresh.bind(this)
  }
  
  async refresh() {
    await this.props.refresh();
  }

    render(){
      return(
        <div>
          <br />
            <ListOwnersComponent contract={this.props.contract}/>
          <br />
          {
            (this.props.isOwner)?(
              <div>
                  <ManageOwnerComponent contract={this.props.contract}
                    refresh={this.refresh}/>
                  <br/>
                  <UpdateMinOwnerComponent contract={this.props.contract}
                    refresh={this.refresh}/>
                  <br/>
                  <ListPendingOwnersComponent contract={this.props.contract}
                    refresh={this.refresh}/>
              </div>
              ):null}
          <hr class="bg-secondary"/>
        </div>
      );
    }
  }

  export default OwnerComponent;