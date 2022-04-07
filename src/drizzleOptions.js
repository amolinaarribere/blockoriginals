import AdminPiggyBank from "./contracts/AdminPiggyBank.json"
import Manager from "./contracts/Manager.json"
import MarketsCredits from "./contracts/AdminPiggyBank.json"
import NFTMarket from "./contracts/NFTMarket.json"
import OriginalsToken from "./contracts/OriginalsToken.json"
import Payments from "./contracts/Payments.json"
import PropositionSettings from "./contracts/PropositionSettings.json"
import PublicPool from "./contracts/PublicPool.json"
import Treasury from "./contracts/Treasury.json"

const options = {
    contracts: [AdminPiggyBank, 
        Manager, 
        MarketsCredits, 
        NFTMarket, 
        OriginalsToken, 
        Payments, 
        PropositionSettings, 
        PublicPool, 
        Treasury],
        web3 : {
            fallback: {
                type: "ws",
                url: "ws://127.0.0.1:9545"
            }
        }
};

export default options;