import React from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';

const func = require("../../../functions/NFTMarketFunctions.js");



class DisplayTokenComponent extends React.Component {
    state = {
        marketId : "",
        tokenId : "",
        displayToken : false
    };

    handleSearch = async (event) => {
        event.preventDefault();
        await func.RetrieveToken(this.props.contract, this.state.marketId, this.state.tokenId);
        this.setState({marketId: "", tokenId : "", displayToken: true});
        this.props.refresh();
    };

    render(){
        return (
            <div>
                <h4>Display Token Details</h4>
                <Form onSubmit={this.handleSearch} style={{margin: '50px 50px 50px 50px' }}>
                    <Form.Group  className="mb-3">
                        <Form.Control type="text" name="MarketId" placeholder="market id" 
                            value={this.state.marketId}
                            onChange={event => this.setState({ marketId: event.target.value })}/>
                        <Form.Control type="text" name="TokenId" placeholder="token id" 
                            value={this.state.tokenId}
                            onChange={event => this.setState({ tokenId: event.target.value })}/>
                    </Form.Group>
                    <button type="submit" class="btn btn-secondary">Display Token</button>
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
                            <Col><b>Owner :</b></Col> 
                            <Col>{func.TokenOwner}</Col>
                        </Row>
                        <Row>
                            <Col><b>Price :</b></Col> 
                            <Col>{func.TokenPrice.toString()}</Col>
                        </Row>
                        <Row>
                            <Col><b>Payment Plan :</b></Col> 
                            <Col>{func.TokenPaymentPlan}</Col>
                        </Row>
                    </Container>
                : null}
            </div>
            
          );
    }
}


export default DisplayTokenComponent;