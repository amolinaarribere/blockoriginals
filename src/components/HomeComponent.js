import React from 'react';

class ManagerComponent extends React.Component {


  
    render(){
      return (
        <div>
          <h6>
          <span style={{ color: 'red' }}><b>DISCLAIMER :</b></span> blockoriginals is intended as a PoC to showcase my skills as a solidity developer, the <span style={{ color: 'blue' }}><b>Source code</b></span> can be found at : 
            <ul>
                <li>Smart Contracts (Solidity) : <a href="https://github.com/amolinaarribere/Originals">Originals source code</a></li>
                <li>Front End (React.js) : <a href="https://github.com/amolinaarribere/blockoriginals">Blockoriginals source code</a></li>
            </ul>
            Some <span style={{ color: 'blue' }}><b>articles</b></span> I wrote about how I implemented certain functionalities that can be interesting to other developers can be found at : 
            <ul>
              <li>Governance : <a href="https://coinsbench.com/dapp-governance-using-erc-20-tokens-solidity-9953c2e82831">dApp Governance using ERC-20 tokens (solidity)</a></li>
              <li>Dividends : <a href="https://coinsbench.com/erc-20-tokens-as-dividends-paying-shares-solidity-b95f6c6c52ce">ERC-20 tokens as dividends paying shares (solidity)</a></li>
              <li>dapp Architecture : <a href="https://coinsbench.com/upgradeable-dapp-architecture-1c18643e358a">Upgradeable dapp architecture</a></li>
            </ul>
            <hr />
            <h1><b>What is Blockoriginals?</b></h1>
            <br />
            <span style={{ color: 'blue' }}><b>BlockOriginals</b></span> is a decentralized application where luxury brands will use NFTs to avoid their products been counterfeited.
            <br />
            The application is available on the Ethereum the Polygon TestNet <span style={{ color: 'blue' }}><b>Mumbai</b></span>
            <br />
            <br />
            Companies will first apply to get their own <span style={{ color: 'blue' }}><b>NFT Market Place</b></span>. A Market place is a space, where each company will be allowed to mint and NFT for each product they make.
            Customers will then submit offers for the minted NFT they wish to purchase (corresponding to an actual product from a specific company). The NFT owner (the original company if it is a brand new product or a private customer if it is a second hand one) will then either reject or accept the received offer.
            <br />
            <i>Products must contain a special code in their bar code tag or in an independant tag, identifying the Company's Market Place Id and the NFT Id, that way products can be very easily identifiable</i>
            <br />
            <br />
            Market Places will allow companies to:
            <ul>
              <li>Update the Market Place owner's account (which is the account that is allowed to carry out all the below actions)</li>
              <li>Mint a new NFT for an unique "real-life" product</li>
              <li>Add transfer fees as a percentage of any future NFT transaction</li>
              <li>Set the offers lifetime (the maximum amount of time the customers credit will be withheld before he can recover it in case his/her offer does not get a response from the NFT owner)</li>
              <li>Change the Market Place <i>Payment Plan</i></li>
            </ul>
            <br />
            The two <span style={{ color: 'blue' }}><b>Payment Plans</b></span> companies can choose from are :
            <ul>
              <li>Paying a fix amount for every new NFT they mint</li>
              <li>Paying a percentage of every NFT transaction's amount</li>
            </ul>
            <i>The Payment Plan is controlled at the Market Place level but is set and can never be changed for every minted NFT. That way NFTs for which the company paid when minting it will never pay transaction fees and vice-versa</i>
            <br />
            <br />
            Several tokens can be accepted for payment, ideally <span style={{ color: 'blue' }}><b>fiat-pegged tokens</b></span> but technically any ERC-20 compliant token is compatible.
            <br />
            NFTs owners can set a minimum price for their NFT in as many as the accepted payment tokens as they want.
            <br />
            <br />
            Customers will scan the special code on the product tag they wish to purchase. They will then be able to submit an offer in any of the accepted payment token for an amount equal to or higher than the NFT minimum price for that token.
            <br />
            There can only be one offer in progress at a given time for a specific NFT. During the <i>Offer Lifetime</i> amount of time defined for the Market Place, the tokens submitted by the customer will be locked in the system and the offer can't be cancelled.
            <br />
            The NFT owner can either accept or reject the offer. If no response is received after the <i>Offer Lifetime</i> amount of time, the offer can't be accepted anymore.
            <br />
            If an offer get's rejected or expired, the customer will be allowed to withdraw his tokens.
            <br />
            <br />
            If another customer submits an offer for an NFT for which there is still an expired offer "in progress" (not reclaimed by its submitting customer). The locked tokens will be <span style={{ color: 'blue' }}><b>credited</b></span> to the original customer.
            <br />
            Customers can at anytime withdraw their credit or use it to submit an offer for any other NFT in any other Market place. Customers can also increase their credit by sending tokens to the system, they do not necessarily need to wait for an offer to expire to get some system credit.
            <br />
            <br />
            The dapp will be governed by the <span style={{ color: 'blue' }}><b>Original token</b></span> owners that will have not only voting rights but will also receive dividends.
            <br />
            Original token owners will then be in charge of validating among other things: 
            <ul>
              <li>dapp code upgrades</li>
              <li>Accepted payment tokens add and/or removals</li>
              <li>Changes to the dapp service Fees</li>
            </ul>
            They will receive dividends from the dapp services : 
            <ul>
              <li>New NFT Market Place creations</li>
              <li>New NFT Minting or NFT Transactions (depending on the NFT Market Place Playment Plan)</li>
            </ul>
            <br />
            The dapp will also include a multisig wallet controlled by the Admin Team, called the <span style={{ color: 'blue' }}><b>Admin Piggy Bank</b></span>
            <br />
            The Admin Piggy Bank will also receive fees for the services offered by the dapp, just like Original token owners.
            <br />
            dapp developers will be in control of the Admin Piggy Bank and will be able to manage the contract's funds however they want.

          </h6>
        </div>
      );
    }
  }

  export default ManagerComponent;

