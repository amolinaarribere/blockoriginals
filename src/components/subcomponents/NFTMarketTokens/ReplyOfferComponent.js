import React from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';

const func = require("../../../functions/NFTMarketFunctions.js");
const BigNumber = require('bignumber.js');


class ReplyOfferComponent extends React.Component {
    state = {
        marketId : "",
        tokenId : "",
        displayOffer : false
    };

    handleValidate = async (event) => {
        event.preventDefault();
        let MarketId = new BigNumber(this.state.marketId);
        let TokenId = new BigNumber(this.state.tokenId);
        await func.replyOffer(this.props.contract, MarketId, TokenId, true);
        await this.reset();
    };

    handleReject = async (event) => {
        event.preventDefault();
        let MarketId = new BigNumber(this.state.marketId);
        let TokenId = new BigNumber(this.state.tokenId);
        await func.replyOffer(this.props.contract, MarketId, TokenId, false);
        await this.reset();
    };

    handleRetrieve = async (event) => {
        event.preventDefault();
        let MarketId = new BigNumber(this.state.marketId);
        let TokenId = new BigNumber(this.state.tokenId);
        await func.RetrieveOffer(this.props.contract, MarketId, TokenId);
        this.setState({marketId: "", tokenId : "", displayOffer: true});
    };

    async reset(){
        this.setState({marketId: "", tokenId : ""});
        this.props.refresh();
    }

    render(){
        return (
            <div>
              <h4>Reply to an offer</h4>
              <Form onSubmit={this.handleValidate} style={{margin: '50px 50px 50px 50px' }}>
                    <Form.Group  className="mb-3">
                        <Form.Control type="text" name="MarketId" placeholder="market id" 
                            value={this.state.marketId}
                            onChange={event => this.setState({ marketId: event.target.value })}/>
                        <Form.Control type="text" name="TokenId" placeholder="token id" 
                            value={this.state.tokenId}
                            onChange={event => this.setState({ tokenId: event.target.value })}/>
                    </Form.Group>
                    <button type="submit" class="btn btn-success">Validate Offer</button>  &nbsp;&nbsp;
                    <button type="button" class="btn btn-danger"  onClick={this.handleReject}>Reject Offer</button>   &nbsp;&nbsp;
                    <button type="button" class="btn btn-secondary"  onClick={this.handleRetrieve}>Retrieve Offer details</button>
                </Form>
                {(this.state.displayOffer)? 
                    <Container style={{margin: '10px 50px 50px 50px' }}>
                    <Row>
                        <Col><b>Market :</b></Col> 
                        <Col>{func.MarketID}</Col>
                    </Row>
                    <Row>
                        <Col><b>Token :</b></Col> 
                        <Col>{func.TokenID}</Col>
                    </Row>
                    <br />
                    <Row>
                        <Col><b>Sender :</b></Col> 
                        <Col>{func.OfferSender}</Col>
                    </Row>
                    <Row>
                        <Col><b>Bidder :</b></Col> 
                        <Col>{func.OfferBidder}</Col>
                    </Row>
                    <Row>
                        <Col><b>Offer :</b></Col> 
                        <Col>{func.OfferOffer.toString()}</Col>
                    </Row>
                    <Row>
                        <Col><b>Deadline :</b></Col> 
                        <Col>{func.OfferDeadline.toString()}</Col>
                    </Row>
                </Container>
                : null}
                
            </div>
            
          );
    }
}


export default ReplyOfferComponent;