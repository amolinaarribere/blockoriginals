export const MANAGER_PROXY_ADDRESS = {
  "ganache": '0x2A3a3bed1510fC141bC292D4Cfe93013c4d28834',
  "rinkeby": '0x0f44634AC811DD61c4172B34cB5b1414158a5E27',
  "ropsten": '',
  "kovan": '',
  "mumbai": '0x6aB9FC5fCb5652a0C838A379e56CeB9A78fCd778'
}

export const PaymentPlansMinting = 0;
export const PaymentPlansTransferFee = 1;

export const PaymentsPlans = ["Paying when Minting", "Paying for each Transfer"]

export const AdminRights = false;

export const MumbaiNode = "https://matic-mumbai.chainstacklabs.com"


export const MANAGER_ABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "Id",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "Proposer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "Deadline",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "Threshold",
        "type": "uint256"
      }
    ],
    "name": "_AddedProposition",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "Id",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "Proposer",
        "type": "address"
      }
    ],
    "name": "_CancelledProposition",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "NewContractAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "ProxyId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "ProxyType",
        "type": "string"
      }
    ],
    "name": "_ContractUpgrade",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "NewContractAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "ProxyId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "ProxyType",
        "type": "string"
      }
    ],
    "name": "_NewProxy",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "Id",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "Proposer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "VotesFor",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "VotesAgainst",
        "type": "uint256"
      }
    ],
    "name": "_PropositionApproved",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "Id",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "Proposer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "VotesFor",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "VotesAgainst",
        "type": "uint256"
      }
    ],
    "name": "_PropositionRejected",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "Id",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "Voter",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "Vote",
        "type": "bool"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "AmountTokens",
        "type": "uint256"
      }
    ],
    "name": "_PropositionVote",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "Id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "From",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "To",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "Amount",
        "type": "uint256"
      }
    ],
    "name": "_UsedTokensTransfered",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "chairPerson",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "managerContractAddress",
        "type": "address"
      }
    ],
    "name": "StdPropositionBaseContract_init",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "cancelProposition",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "onTokenBalanceChanged",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retrieveChairPerson",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retrieveManagerContract",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retrieveNextPropId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retrieveProposition",
    "outputs": [
      {
        "internalType": "bytes[]",
        "name": "",
        "type": "bytes[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retrievePropositionStatus",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "PropId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "voter",
        "type": "address"
      }
    ],
    "name": "retrieveVotesForVoter",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes[]",
        "name": "NewValues",
        "type": "bytes[]"
      }
    ],
    "name": "sendProposition",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "vote",
        "type": "bool"
      }
    ],
    "name": "voteProposition",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "chairPerson",
        "type": "address"
      }
    ],
    "name": "Manager_init",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "address[]",
            "name": "TransparentAddresses",
            "type": "address[]"
          },
          {
            "internalType": "address[]",
            "name": "BeaconAddresses",
            "type": "address[]"
          },
          {
            "internalType": "bytes[]",
            "name": "TransparentData",
            "type": "bytes[]"
          }
        ],
        "internalType": "struct Library.ProposedContractsStruct",
        "name": "initialContracts",
        "type": "tuple"
      },
      {
        "internalType": "contract TransparentUpgradeableProxy",
        "name": "ManagerProxyAddress",
        "type": "address"
      }
    ],
    "name": "InitializeContracts",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retrieveTransparentProxies",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retrieveBeacons",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retrieveProxyAdmin",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retrieveTransparentProxiesImpl",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retrieveBeaconsImpl",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "isInitialized",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

export const PUBLIC_ABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "_AddOwnerRejection",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "_AddOwnerValidation",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "NFTMarketId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenID",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "factor",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "paymentTokenID",
        "type": "uint256"
      }
    ],
    "name": "_CreditAssigned",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "paymentTokenID",
        "type": "uint256"
      }
    ],
    "name": "_CreditReceived",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "NFTMarketId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenID",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "creditor",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "paymentTokenID",
        "type": "uint256"
      }
    ],
    "name": "_CreditReused",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "NFTMarketId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "paymentTokenID",
        "type": "uint256"
      }
    ],
    "name": "_CreditSpent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "NFTMarketId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenID",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "paymentTokenID",
        "type": "uint256"
      }
    ],
    "name": "_CreditUnAssignedReceived",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "withdrawer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "paymentTokenID",
        "type": "uint256"
      }
    ],
    "name": "_CreditWithdrawn",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "withdrawer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "paymentTokenID",
        "type": "uint256"
      }
    ],
    "name": "_CreditWithdrawnFor",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "_IssuerRejection",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "NFTMarket",
        "type": "address"
      }
    ],
    "name": "_IssuerValidation",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "minOwner",
        "type": "uint256"
      }
    ],
    "name": "_MinOwnerRejection",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "minOwner",
        "type": "uint256"
      }
    ],
    "name": "_MinOwnerValidation",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "symbol",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "paymentTokenID",
        "type": "uint256"
      }
    ],
    "name": "_NewIssuerRequest",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "_RemoveOwnerRejection",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "_RemoveOwnerValidation",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "voter",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "vote",
        "type": "bool"
      }
    ],
    "name": "_VoteForIssuer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "minOwner",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "voter",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "vote",
        "type": "bool"
      }
    ],
    "name": "_VoteForMinOwner",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "voter",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "vote",
        "type": "bool"
      }
    ],
    "name": "_VoteForOwner",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address[]",
        "name": "owners",
        "type": "address[]"
      },
      {
        "internalType": "uint256",
        "name": "minOwners",
        "type": "uint256"
      }
    ],
    "name": "MultiSigContract_init",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "addOwner",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "newMinOwners",
        "type": "uint256"
      }
    ],
    "name": "changeMinOwners",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "rejectMinOwners",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "rejectOwner",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "removeOwner",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retrieveAllOwners",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retrieveManagerContract",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retrieveMinOwners",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retrievePendingMinOwners",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retrievePendingMinOwnersStatus",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "addedORremove",
        "type": "bool"
      }
    ],
    "name": "retrievePendingOwners",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "validateMinOwners",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "validateOwner",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address[]",
        "name": "owners",
        "type": "address[]"
      },
      {
        "internalType": "uint256",
        "name": "minOwners",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "managerContractAddress",
        "type": "address"
      }
    ],
    "name": "PublicPool_init",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "_owner",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "_name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_symbol",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "_feeAmount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_feeDecimals",
            "type": "uint256"
          },
          {
            "internalType": "enum Library.PaymentPlans",
            "name": "_paymentPlan",
            "type": "uint8"
          }
        ],
        "internalType": "struct ItemsLibrary._issuerStruct",
        "name": "requestedIssuer",
        "type": "tuple"
      },
      {
        "internalType": "bool",
        "name": "FromCredit",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "paymentTokenID",
        "type": "uint256"
      }
    ],
    "name": "requestIssuer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "validateIssuer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "rejectIssuer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retrieveIssuers",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "retrieveNFTMarketForIssuer",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retrievePendingIssuers",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "retrievePendingIssuer",
    "outputs": [
      {
        "components": [
          {
            "components": [
              {
                "internalType": "address",
                "name": "_owner",
                "type": "address"
              },
              {
                "internalType": "string",
                "name": "_name",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "_symbol",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "_feeAmount",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "_feeDecimals",
                "type": "uint256"
              },
              {
                "internalType": "enum Library.PaymentPlans",
                "name": "_paymentPlan",
                "type": "uint8"
              }
            ],
            "internalType": "struct ItemsLibrary._issuerStruct",
            "name": "_issuer",
            "type": "tuple"
          },
          {
            "internalType": "uint256",
            "name": "_pendingId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_validations",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_rejections",
            "type": "uint256"
          },
          {
            "internalType": "address[]",
            "name": "_voters",
            "type": "address[]"
          }
        ],
        "internalType": "struct IPool._pendingIssuerStruct",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

export const TREASURY_ABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "Id",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "Proposer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "Deadline",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "Threshold",
        "type": "uint256"
      }
    ],
    "name": "_AddedProposition",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "Recipient",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "Amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "TotalSupply",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "tokenContractId",
        "type": "uint256"
      }
    ],
    "name": "_AssignDividend",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "Id",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "Proposer",
        "type": "address"
      }
    ],
    "name": "_CancelledProposition",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256[][]",
        "name": "Fees",
        "type": "uint256[][]"
      },
      {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "TransactionFees",
        "type": "uint256[]"
      },
      {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "OfferSettings",
        "type": "uint256[]"
      }
    ],
    "name": "_NewSettings",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "Payer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "Amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "AggregatedAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "tokenContractId",
        "type": "uint256"
      }
    ],
    "name": "_Pay",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "Id",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "Proposer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "VotesFor",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "VotesAgainst",
        "type": "uint256"
      }
    ],
    "name": "_PropositionApproved",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "Id",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "Proposer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "VotesFor",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "VotesAgainst",
        "type": "uint256"
      }
    ],
    "name": "_PropositionRejected",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "Id",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "Voter",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "Vote",
        "type": "bool"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "AmountTokens",
        "type": "uint256"
      }
    ],
    "name": "_PropositionVote",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "Id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "From",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "To",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "Amount",
        "type": "uint256"
      }
    ],
    "name": "_UsedTokensTransfered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "Recipient",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "Amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "tokenContractId",
        "type": "uint256"
      }
    ],
    "name": "_Withdraw",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "paymentTokenID",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "CreditReceived",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "chairPerson",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "managerContractAddress",
        "type": "address"
      }
    ],
    "name": "StdPropositionBaseContract_init",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "cancelProposition",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "onTokenBalanceChanged",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retrieveChairPerson",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retrieveManagerContract",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retrieveNextPropId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retrieveProposition",
    "outputs": [
      {
        "internalType": "bytes[]",
        "name": "",
        "type": "bytes[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retrievePropositionStatus",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "PropId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "voter",
        "type": "address"
      }
    ],
    "name": "retrieveVotesForVoter",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes[]",
        "name": "NewValues",
        "type": "bytes[]"
      }
    ],
    "name": "sendProposition",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "vote",
        "type": "bool"
      }
    ],
    "name": "voteProposition",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256[][]",
        "name": "Fees",
        "type": "uint256[][]"
      },
      {
        "internalType": "uint256[]",
        "name": "TransferFees",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "OfferSettings",
        "type": "uint256[]"
      },
      {
        "internalType": "address",
        "name": "managerContractAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "chairPerson",
        "type": "address"
      }
    ],
    "name": "Treasury_init",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "paymentTokenID",
        "type": "uint256"
      }
    ],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "paymentTokenID",
        "type": "uint256"
      }
    ],
    "name": "withdrawAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "addr",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "paymentTokenID",
        "type": "uint256"
      }
    ],
    "name": "retrieveLastAssigned",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "addr",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "paymentTokenID",
        "type": "uint256"
      }
    ],
    "name": "retrieveFullBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retrieveSettings",
    "outputs": [
      {
        "internalType": "uint256[][]",
        "name": "",
        "type": "uint256[][]"
      },
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "paymentTokenID",
        "type": "uint256"
      }
    ],
    "name": "retrieveAggregatedAmount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

export const ORIGINALS_ABI =  [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "subtractedValue",
        "type": "uint256"
      }
    ],
    "name": "decreaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "addedValue",
        "type": "uint256"
      }
    ],
    "name": "increaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retrieveManagerContract",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "symbol",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "MaxSupply",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "managerContractAddress",
        "type": "address"
      },
      {
        "internalType": "uint8",
        "name": "decimalsValue",
        "type": "uint8"
      },
      {
        "internalType": "address",
        "name": "initialOwner",
        "type": "address"
      }
    ],
    "name": "OriginalsToken_init",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

export const PROPOSITIONSETTINGS_ABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "Id",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "Proposer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "Deadline",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "Threshold",
        "type": "uint256"
      }
    ],
    "name": "_AddedProposition",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "Id",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "Proposer",
        "type": "address"
      }
    ],
    "name": "_CancelledProposition",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "LifeTime",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "Threshold",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "minToPropose",
        "type": "uint256"
      }
    ],
    "name": "_NewSettings",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "Id",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "Proposer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "VotesFor",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "VotesAgainst",
        "type": "uint256"
      }
    ],
    "name": "_PropositionApproved",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "Id",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "Proposer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "VotesFor",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "VotesAgainst",
        "type": "uint256"
      }
    ],
    "name": "_PropositionRejected",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "Id",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "Voter",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "Vote",
        "type": "bool"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "AmountTokens",
        "type": "uint256"
      }
    ],
    "name": "_PropositionVote",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "Id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "From",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "To",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "Amount",
        "type": "uint256"
      }
    ],
    "name": "_UsedTokensTransfered",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "chairPerson",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "managerContractAddress",
        "type": "address"
      }
    ],
    "name": "StdPropositionBaseContract_init",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "cancelProposition",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "onTokenBalanceChanged",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retrieveChairPerson",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retrieveManagerContract",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retrieveNextPropId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retrieveProposition",
    "outputs": [
      {
        "internalType": "bytes[]",
        "name": "",
        "type": "bytes[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retrievePropositionStatus",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "PropId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "voter",
        "type": "address"
      }
    ],
    "name": "retrieveVotesForVoter",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes[]",
        "name": "NewValues",
        "type": "bytes[]"
      }
    ],
    "name": "sendProposition",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "vote",
        "type": "bool"
      }
    ],
    "name": "voteProposition",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "managerContractAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "chairPerson",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "PropositionLifeTime",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "PropositionThreshold",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "minToPropose",
        "type": "uint256"
      }
    ],
    "name": "PropositionSettings_init",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retrieveSettings",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

export const ADMINPIGGYBANK_ABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "_AddOwnerRejection",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "_AddOwnerValidation",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "minOwner",
        "type": "uint256"
      }
    ],
    "name": "_MinOwnerRejection",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "minOwner",
        "type": "uint256"
      }
    ],
    "name": "_MinOwnerValidation",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "payer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "paymentTokenID",
        "type": "uint256"
      }
    ],
    "name": "_Pay",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "_RemoveOwnerRejection",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "_RemoveOwnerValidation",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "paymentTokenID",
        "type": "uint256"
      }
    ],
    "name": "_TransferCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "paymentTokenID",
        "type": "uint256"
      }
    ],
    "name": "_TransferRejected",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "paymentTokenID",
        "type": "uint256"
      }
    ],
    "name": "_TransferValidated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "minOwner",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "voter",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "vote",
        "type": "bool"
      }
    ],
    "name": "_VoteForMinOwner",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "voter",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "vote",
        "type": "bool"
      }
    ],
    "name": "_VoteForOwner",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "paymentTokenID",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "voter",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "vote",
        "type": "bool"
      }
    ],
    "name": "_VoteForTransfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "paymentTokenID",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "CreditReceived",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address[]",
        "name": "owners",
        "type": "address[]"
      },
      {
        "internalType": "uint256",
        "name": "minOwners",
        "type": "uint256"
      }
    ],
    "name": "MultiSigContract_init",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "addOwner",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "newMinOwners",
        "type": "uint256"
      }
    ],
    "name": "changeMinOwners",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "rejectMinOwners",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "rejectOwner",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "removeOwner",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retrieveAllOwners",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retrieveManagerContract",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retrieveMinOwners",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retrievePendingMinOwners",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retrievePendingMinOwnersStatus",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "addedORremove",
        "type": "bool"
      }
    ],
    "name": "retrievePendingOwners",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "validateMinOwners",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "validateOwner",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address[]",
        "name": "owners",
        "type": "address[]"
      },
      {
        "internalType": "uint256",
        "name": "minOwners",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "managerContractAddress",
        "type": "address"
      }
    ],
    "name": "AdminPiggyBank_init",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "paymentTokenID",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "reject",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retrieveTransferInfo",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "_to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_amount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_paymentTokenID",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_validations",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_rejections",
            "type": "uint256"
          },
          {
            "internalType": "address[]",
            "name": "_voters",
            "type": "address[]"
          }
        ],
        "internalType": "struct IAdminPiggyBank._TransferStruct",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

export const NFTMARKET_ABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "approved",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "ApprovalForAll",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "formerOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "offer",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "paymentTokenID",
        "type": "uint256"
      }
    ],
    "name": "_AcceptOffer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "_paymentTokenID",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_price",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "_enabled",
            "type": "bool"
          }
        ],
        "indexed": false,
        "internalType": "struct INFTMarket._tokenPriceStruct[]",
        "name": "prices",
        "type": "tuple[]"
      },
      {
        "indexed": false,
        "internalType": "enum Library.PaymentPlans",
        "name": "plan",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "MintingFee",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "AdminMintingFee",
        "type": "uint256"
      }
    ],
    "name": "_MintToken",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "formerLifeTime",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "newLifeTime",
        "type": "uint256"
      }
    ],
    "name": "_NewOffersLifeTime",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "formerOwner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "_NewOwner",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "formerAmount",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "formerDecimals",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "newAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "newDecimals",
        "type": "uint256"
      }
    ],
    "name": "_NewOwnerFees",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "enum Library.PaymentPlans",
        "name": "formerPlan",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "enum Library.PaymentPlans",
        "name": "newPlan",
        "type": "uint8"
      }
    ],
    "name": "_NewPaymentPlan",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "_RejectOffer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "formerPrice",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "newPrice",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "paymentTokenID",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "enabled",
        "type": "bool"
      }
    ],
    "name": "_SetTokenPrice",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "bidder",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "offer",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "FromCredit",
        "type": "bool"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "paymentTokenID",
        "type": "uint256"
      }
    ],
    "name": "_SubmitOffer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "_WithdrawOffer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getApproved",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "isApprovedForAll",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retrieveManagerContract",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "_data",
        "type": "bytes"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "managerContractAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "symbol",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "offersLifeTime",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "ownerTransferFeeAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "ownerTransferFeeDecimals",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "issuerID",
        "type": "uint256"
      },
      {
        "internalType": "uint8",
        "name": "paymentPlan",
        "type": "uint8"
      }
    ],
    "name": "NFTMarket_init",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "changeOwner",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "enum Library.PaymentPlans",
        "name": "newPaymentPlan",
        "type": "uint8"
      }
    ],
    "name": "changePaymentPlan",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "newLifeTime",
        "type": "uint256"
      }
    ],
    "name": "changeOffersLifeTime",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "newAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "newDecimals",
        "type": "uint256"
      }
    ],
    "name": "changeOwnerTransferFees",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "_paymentTokenID",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_price",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "_enabled",
            "type": "bool"
          }
        ],
        "internalType": "struct INFTMarket._tokenPriceStruct[]",
        "name": "prices",
        "type": "tuple[]"
      },
      {
        "internalType": "bool",
        "name": "FromCredit",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "paymentTokenID",
        "type": "uint256"
      }
    ],
    "name": "mintToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "_paymentTokenID",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_price",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "_enabled",
            "type": "bool"
          }
        ],
        "internalType": "struct INFTMarket._tokenPriceStruct[]",
        "name": "prices",
        "type": "tuple[]"
      }
    ],
    "name": "setTokenPrice",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "acceptOffer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "rejectOffer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "_bidder",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_offer",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "_FromCredit",
            "type": "bool"
          },
          {
            "internalType": "uint256",
            "name": "_paymentTokenID",
            "type": "uint256"
          }
        ],
        "internalType": "struct INFTMarket._submitOfferStruct",
        "name": "offer",
        "type": "tuple"
      }
    ],
    "name": "submitOffer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "withdrawOffer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retrieveIssuer",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "_owner",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "_name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_symbol",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "_feeAmount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_feeDecimals",
            "type": "uint256"
          },
          {
            "internalType": "enum Library.PaymentPlans",
            "name": "_paymentPlan",
            "type": "uint8"
          }
        ],
        "internalType": "struct ItemsLibrary._issuerStruct",
        "name": "",
        "type": "tuple"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "retrieveToken",
    "outputs": [
      {
        "components": [
          {
            "internalType": "enum Library.PaymentPlans",
            "name": "_paymentPlan",
            "type": "uint8"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "_paymentTokenID",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "_price",
                "type": "uint256"
              },
              {
                "internalType": "bool",
                "name": "_enabled",
                "type": "bool"
              }
            ],
            "internalType": "struct INFTMarket._tokenPriceStruct[]",
            "name": "_prices",
            "type": "tuple[]"
          }
        ],
        "internalType": "struct INFTMarket._tokenStruct",
        "name": "",
        "type": "tuple"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "retrieveOffer",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "_offer",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_paymentTokenID",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "_sender",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "_bidder",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_deadline",
            "type": "uint256"
          }
        ],
        "internalType": "struct INFTMarket._offerStruct",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

export const PAYMENTS_ABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "Id",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "Proposer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "Deadline",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "Threshold",
        "type": "uint256"
      }
    ],
    "name": "_AddedProposition",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "Id",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "Proposer",
        "type": "address"
      }
    ],
    "name": "_CancelledProposition",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "index",
        "type": "uint256[]"
      },
      {
        "indexed": false,
        "internalType": "address[]",
        "name": "TokenAddresses",
        "type": "address[]"
      }
    ],
    "name": "_NewAddresses",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "Id",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "Proposer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "VotesFor",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "VotesAgainst",
        "type": "uint256"
      }
    ],
    "name": "_PropositionApproved",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "Id",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "Proposer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "VotesFor",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "VotesAgainst",
        "type": "uint256"
      }
    ],
    "name": "_PropositionRejected",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "Id",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "Voter",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "Vote",
        "type": "bool"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "AmountTokens",
        "type": "uint256"
      }
    ],
    "name": "_PropositionVote",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "Id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "From",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "To",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "Amount",
        "type": "uint256"
      }
    ],
    "name": "_UsedTokensTransfered",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "chairPerson",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "managerContractAddress",
        "type": "address"
      }
    ],
    "name": "StdPropositionBaseContract_init",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "cancelProposition",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "onTokenBalanceChanged",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retrieveChairPerson",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retrieveManagerContract",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retrieveNextPropId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retrieveProposition",
    "outputs": [
      {
        "internalType": "bytes[]",
        "name": "",
        "type": "bytes[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retrievePropositionStatus",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "PropId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "voter",
        "type": "address"
      }
    ],
    "name": "retrieveVotesForVoter",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes[]",
        "name": "NewValues",
        "type": "bytes[]"
      }
    ],
    "name": "sendProposition",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "vote",
        "type": "bool"
      }
    ],
    "name": "voteProposition",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "managerContractAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "chairPerson",
        "type": "address"
      },
      {
        "internalType": "address[]",
        "name": "tokenAddresses",
        "type": "address[]"
      }
    ],
    "name": "Payments_init",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "MarketId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "TransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "BalanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retrieveSettings",
    "outputs": [
      {
        "components": [
          {
            "internalType": "contract IERC20",
            "name": "TokenContract",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "active",
            "type": "bool"
          }
        ],
        "internalType": "struct Library.PaymentTokenStruct[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

export const MARKETSCREDITS_ABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "NFTMarketId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenID",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "factor",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "paymentTokenID",
        "type": "uint256"
      }
    ],
    "name": "_CreditAssigned",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "paymentTokenID",
        "type": "uint256"
      }
    ],
    "name": "_CreditReceived",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "NFTMarketId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenID",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "creditor",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "paymentTokenID",
        "type": "uint256"
      }
    ],
    "name": "_CreditReused",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "NFTMarketId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "paymentTokenID",
        "type": "uint256"
      }
    ],
    "name": "_CreditSpent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "NFTMarketId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenID",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "paymentTokenID",
        "type": "uint256"
      }
    ],
    "name": "_CreditUnAssignedReceived",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "withdrawer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "paymentTokenID",
        "type": "uint256"
      }
    ],
    "name": "_CreditWithdrawn",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "withdrawer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "paymentTokenID",
        "type": "uint256"
      }
    ],
    "name": "_CreditWithdrawnFor",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "paymentTokenID",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "CreditReceived",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retrieveManagerContract",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "managerContractAddress",
        "type": "address"
      }
    ],
    "name": "MarketsCredits_init",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "addr",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "paymentTokenID",
        "type": "uint256"
      }
    ],
    "name": "sendCredit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "NFTMarketId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "tokenID",
        "type": "uint256"
      },
      {
        "internalType": "address[]",
        "name": "addrs",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "amounts",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "factors",
        "type": "uint256[]"
      }
    ],
    "name": "assignCredit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "NFTMarketId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "tokenID",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "addr",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "paymentTokenID",
        "type": "uint256"
      }
    ],
    "name": "reuseCredit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "NFTMarketId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "paymentTokenID",
        "type": "uint256"
      }
    ],
    "name": "spendCredit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "paymentTokenID",
        "type": "uint256"
      }
    ],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "paymentTokenID",
        "type": "uint256"
      }
    ],
    "name": "withdrawAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "NFTMarketId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "addr",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "paymentTokenID",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "withdrawAllFor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "addr",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "paymentTokenID",
        "type": "uint256"
      }
    ],
    "name": "retrieveCredit",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

export const ERC20_ABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "name_",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "symbol_",
        "type": "string"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "addedValue",
        "type": "uint256"
      }
    ],
    "name": "increaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "subtractedValue",
        "type": "uint256"
      }
    ],
    "name": "decreaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]