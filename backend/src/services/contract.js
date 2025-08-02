import { ethers } from 'ethers';
import { portfolioService } from './portfolio.js';

class ContractService {
  constructor() {
    // this.provider = new ethers.JsonRpcProvider(process.env.RPC_URL? process.env.RPC_URL:"https://eth-sepolia.g.alchemy.com/v2/); sepolia
    this.provider = new ethers.JsonRpcProvider(
      'https://polygon-rpc.com', // No trailing slash
      {
        name: 'polygon',
        chainId: 137
      }
    );
    this.wallet = new ethers.Wallet(process.env.PRIVATE_KEY, this.provider);
    
    // Contract ABI (simplified)
    this.contractABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_feeRecipient",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "EnforcedPause",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ExpectedPause",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "OwnableInvalidOwner",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "OwnableUnauthorizedAccount",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ReentrancyGuardReentrantCall",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "token",
          "type": "address"
        }
      ],
      "name": "SafeERC20FailedOperation",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "duelId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "creator",
          "type": "address"
        }
      ],
      "name": "DuelCancelled",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "duelId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "creator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "tokenAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "wagerAmount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "duration",
          "type": "uint256"
        }
      ],
      "name": "DuelCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "duelId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "opponent",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "startTime",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "endTime",
          "type": "uint256"
        }
      ],
      "name": "DuelJoined",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "duelId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "winner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "totalPayout",
          "type": "uint256"
        }
      ],
      "name": "DuelResolved",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Paused",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Unpaused",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "MAX_DURATION",
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
      "name": "MIN_DURATION",
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
          "name": "resolver",
          "type": "address"
        }
      ],
      "name": "addAuthorizedResolver",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "authorizedResolvers",
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
      "inputs": [
        {
          "internalType": "uint256",
          "name": "duelId",
          "type": "uint256"
        }
      ],
      "name": "cancelDuel",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "tokenAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "wagerAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "duration",
          "type": "uint256"
        }
      ],
      "name": "createDuel",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "duels",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "creator",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "opponent",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "tokenAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "wagerAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "duration",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "startTime",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "endTime",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "resolved",
          "type": "bool"
        },
        {
          "internalType": "address",
          "name": "winner",
          "type": "address"
        },
        {
          "internalType": "enum Duel.DuelStatus",
          "name": "status",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "tokenAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "emergencyWithdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "feeRecipient",
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
          "internalType": "uint256",
          "name": "duelId",
          "type": "uint256"
        }
      ],
      "name": "getDuel",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "creator",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "opponent",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "tokenAddress",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "wagerAmount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "duration",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "startTime",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "endTime",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "resolved",
              "type": "bool"
            },
            {
              "internalType": "address",
              "name": "winner",
              "type": "address"
            },
            {
              "internalType": "enum Duel.DuelStatus",
              "name": "status",
              "type": "uint8"
            }
          ],
          "internalType": "struct Duel.DuelInfo",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "duelId",
          "type": "uint256"
        }
      ],
      "name": "isDuelExpired",
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
      "inputs": [
        {
          "internalType": "uint256",
          "name": "duelId",
          "type": "uint256"
        }
      ],
      "name": "joinDuel",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "nextDuelId",
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
      "name": "owner",
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
      "name": "pause",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "paused",
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
      "name": "platformFeeRate",
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
          "name": "resolver",
          "type": "address"
        }
      ],
      "name": "removeAuthorizedResolver",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "duelId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "winner",
          "type": "address"
        }
      ],
      "name": "resolveDuel",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newRecipient",
          "type": "address"
        }
      ],
      "name": "setFeeRecipient",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "newRate",
          "type": "uint256"
        }
      ],
      "name": "setPlatformFeeRate",
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
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "unpause",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
    
    this.contract = new ethers.Contract(
      // process.env.CONTRACT_ADDRESS ? process.env.CONTRACT_ADDRESS: "", sepolia
      process.env.CONTRACT_ADDRESS, //polygon
      this.contractABI,
      this.wallet
    );
    
    this.duelCache = new Map();
    this.lastCacheUpdate = 0;
    this.CACHE_DURATION = 30000; // 30 seconds
  }

async createDuel(tokenAddress, wagerAmount, duration) {
  try {
    // Get wallet address
    const walletAddress = await this.wallet.getAddress();
    console.log('Wallet address:', walletAddress);

    // Create token contract instance
    const tokenContract = new ethers.Contract(
      tokenAddress,
      [
        "function approve(address spender, uint256 amount) external returns (bool)",
        "function allowance(address owner, address spender) external view returns (uint256)",
        "function balanceOf(address account) external view returns (uint256)",
        "function decimals() external view returns (uint8)"
      ],
      this.wallet
    );

    // Get token decimals (don't hardcode to 18)
    const decimals = await tokenContract.decimals();
    console.log(`Token decimals: ${decimals}`);

    // Parse the wager amount with correct decimals
    const parsedWagerAmount = ethers.parseUnits(wagerAmount.toString(), decimals);
    console.log(`Parsed wager amount: ${parsedWagerAmount.toString()}`);

    // Check user's token balance
    const balance = await tokenContract.balanceOf(walletAddress);
    console.log(`User balance: ${ethers.formatUnits(balance, decimals)}`);

    if (balance < parsedWagerAmount) {
      throw new Error(
        `Insufficient token balance. You have ${ethers.formatUnits(balance, decimals)} tokens but need ${wagerAmount}`
      );
    }

    // Get contract address
    const contractAddress = this.contract.target || this.contract.address;
    console.log(`Contract address: ${contractAddress}`);

    // Check current allowance BEFORE approval
    let currentAllowance = await tokenContract.allowance(walletAddress, contractAddress);
    console.log(`Current allowance BEFORE: ${ethers.formatUnits(currentAllowance, decimals)}`);

    // If allowance is insufficient, handle approval
    if (currentAllowance < parsedWagerAmount) {
      console.log('Insufficient allowance, approving token spending...');
      
      // Some tokens (like USDT) require resetting allowance to 0 first
      if (currentAllowance > 0n) {
        console.log('Resetting allowance to 0 first...');
        const resetTx = await tokenContract.approve(contractAddress, 0n);
        await resetTx.wait();
        console.log('Allowance reset to 0');
      }

      // Approve unlimited amount to avoid precision issues
      const approveTx = await tokenContract.approve(contractAddress, ethers.MaxUint256);
      console.log(`Approval tx hash: ${approveTx.hash}`);
      
      const approveReceipt = await approveTx.wait();
      console.log(`Approval confirmed in block: ${approveReceipt.blockNumber}`);
    }

    // Verify final allowance
    currentAllowance = await tokenContract.allowance(walletAddress, contractAddress);
    console.log(`Final allowance: ${ethers.formatUnits(currentAllowance, decimals)}`);

    if (currentAllowance < parsedWagerAmount) {
      throw new Error(
        `Approval verification failed. Expected: ${ethers.formatUnits(parsedWagerAmount, decimals)}, Got: ${ethers.formatUnits(currentAllowance, decimals)}`
      );
    }

    // Small delay to ensure blockchain state consistency
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Create the duel (no gas options needed for simple ERC20 operations)
    console.log('=== FINAL DEBUG CHECKS ===');
    console.log('Token Address:', tokenAddress);
    console.log('Contract Address:', contractAddress);
    console.log('Wallet Address:', walletAddress);
    console.log('Parsed Wager Amount:', parsedWagerAmount.toString());
    console.log('Final Allowance:', currentAllowance.toString());
    console.log('Balance:', balance.toString());
    console.log('Duration:', duration);
    console.log('=== END DEBUG ===');
    
    console.log('Creating duel...');
    const tx = await this.contract.createDuel(tokenAddress, parsedWagerAmount, duration, {
  gasLimit: 400000 // ✅ this is the correct way
});


    console.log(`Create duel tx hash: ${tx.hash}`);
    const receipt = await tx.wait();
    console.log(`Duel created in block: ${receipt.blockNumber}`);

    // Extract duel ID from events
    const event = receipt.logs.find(log => {
      try {
        return log.topics[0] === ethers.id("DuelCreated(uint256,address,address,uint256,uint256)");
      } catch {
        return false;
      }
    });

    if (event) {
      const duelId = parseInt(event.topics[1], 16);
      console.log(`Duel created with ID: ${duelId}`);
      this.invalidateCache();
      return duelId;
    }

    throw new Error('Failed to extract duel ID from transaction');

  } catch (error) {
    console.error('Create duel error:', error);

    // Provide specific error messages based on error type
    if (error.code === 'INSUFFICIENT_FUNDS') {
      throw new Error('Insufficient MATIC for gas fees');
    } else if (error.message.includes('insufficient allowance') || error.message.includes('transfer amount exceeds allowance')) {
      throw new Error('Token approval failed. The contract cannot spend your tokens.');
    } else if (error.message.includes('transfer amount exceeds balance')) {
      throw new Error('Insufficient token balance');
    } else if (error.message.includes('Invalid duration')) {
      throw new Error('Duration must be between 1 hour and 7 days');
    } else if (error.message.includes('Invalid token address')) {
      throw new Error('Invalid token contract address');
    } else if (error.code === 'NETWORK_ERROR') {
      throw new Error('Network connection error. Please check your internet connection.');
    }

    throw new Error(`Failed to create duel: ${error.message}`);
  }
}

  async joinDuel(duelId) {
    try {
      // Get the duel info first to check token requirements
      const duel = await this.getDuel(duelId);
      if (!duel) {
        throw new Error('Duel not found');
      }

      // Get wallet address
      const walletAddress = await this.wallet.getAddress();

      // Create token contract instance
      const tokenContract = new ethers.Contract(
        duel.tokenAddress,
        [
          "function approve(address spender, uint256 amount) external returns (bool)",
          "function allowance(address owner, address spender) external view returns (uint256)",
          "function balanceOf(address account) external view returns (uint256)"
        ],
        this.wallet
      );

      const parsedWagerAmount = ethers.parseUnits(duel.wagerAmount, 18);

      // Check token balance
      const balance = await tokenContract.balanceOf(walletAddress);
      if (balance < parsedWagerAmount) {
        throw new Error(`Insufficient token balance. You have ${ethers.formatUnits(balance, 18)} tokens but need ${duel.wagerAmount}`);
      }

      // Get contract address
      const contractAddress = this.contract.target || this.contract.address;

      // Check current allowance
      const currentAllowance = await tokenContract.allowance(
        walletAddress,
        contractAddress
      );

      // If allowance is insufficient, approve the contract
      if (currentAllowance < parsedWagerAmount) {
        console.log('Approving token spending for joining duel...');
        
        const approveTx = await tokenContract.approve(
          contractAddress,
          parsedWagerAmount
        );
        
        await approveTx.wait();
        console.log('Token approval successful');
      }

      // Now join the duel
      const tx = await this.contract.joinDuel(duelId);
      await tx.wait();
      this.invalidateCache();
    } catch (error) {
      console.error('Join duel error:', error);
      throw new Error(`Failed to join duel: ${error.message}`);
    }
  }

  async cancelDuel(duelId) {
    try {
      const tx = await this.contract.cancelDuel(duelId);
      await tx.wait();
      this.invalidateCache();
    } catch (error) {
      console.error('Cancel duel error:', error);
      throw new Error(`Failed to cancel duel: ${error.message}`);
    }
  }

  async getDuel(duelId) {
    try {
      const duelData = await this.contract.getDuel(duelId);
      return this.formatDuelData(duelData);
    } catch (error) {
      console.error('Get duel error:', error);
      return null;
    }
  }

  async getAllDuels() {
    const now = Date.now();
    if (this.duelCache.size > 0 && (now - this.lastCacheUpdate) < this.CACHE_DURATION) {
      return Array.from(this.duelCache.values());
    }

    try {
      const nextDuelId = await this.contract.nextDuelId();
      const duels = [];

      for (let i = 1; i < nextDuelId; i++) {
        try {
          const duel = await this.getDuel(i);
          if (duel) {
            duels.push(duel);
            this.duelCache.set(i, duel);
          }
        } catch (error) {
          console.warn(`Failed to fetch duel ${i}:`, error.message);
        }
      }

      this.lastCacheUpdate = now;
      return duels;
    } catch (error) {
      console.error('Get all duels error:', error);
      throw new Error(`Failed to fetch duels: ${error.message}`);
    }
  }

  async resolveExpiredDuels() {
    try {
      const duels = await this.getAllDuels();
      const expiredDuels = duels.filter(duel => 
        duel.status === 'ACTIVE' && 
        !duel.resolved && 
        Date.now() / 1000 >= duel.endTime
      );

      const resolvedDuels = [];

      for (const duel of expiredDuels) {
        try {
          const winner = await this.calculateWinner(duel);
          await this.resolveDuel(duel.id, winner);
          resolvedDuels.push({ ...duel, winner });
        } catch (error) {
          console.error(`Failed to resolve duel ${duel.id}:`, error.message);
        }
      }

      return resolvedDuels;
    } catch (error) {
      console.error('Resolve expired duels error:', error);
      throw error;
    }
  }

  async resolveDuel(duelId, winner) {
    try {
      const tx = await this.contract.resolveDuel(duelId, winner);
      await tx.wait();
      this.invalidateCache();
    } catch (error) {
      console.error('Resolve duel error:', error);
      throw new Error(`Failed to resolve duel: ${error.message}`);
    }
  }

  async calculateWinner(duel) {
    try {
      // Get portfolio values at start and end
      const [creatorStart, opponentStart] = await Promise.all([
        portfolioService.getPortfolioValue(duel.creator, duel.startTime),
        portfolioService.getPortfolioValue(duel.opponent, duel.startTime)
      ]);

      const [creatorEnd, opponentEnd] = await Promise.all([
        portfolioService.getPortfolioValue(duel.creator),
        portfolioService.getPortfolioValue(duel.opponent)
      ]);

      // Calculate P&L percentages
      const creatorPnL = ((creatorEnd.totalValue - creatorStart.totalValue) / creatorStart.totalValue) * 100;
      const opponentPnL = ((opponentEnd.totalValue - opponentStart.totalValue) / opponentStart.totalValue) * 100;

      console.log(`Duel ${duel.id} P&L - Creator: ${creatorPnL.toFixed(2)}%, Opponent: ${opponentPnL.toFixed(2)}%`);

      return creatorPnL > opponentPnL ? duel.creator : duel.opponent;
    } catch (error) {
      console.error('Calculate winner error:', error);
      throw error;
    }
  }

  formatDuelData(duelData) {
    const statusMap = ['OPEN', 'ACTIVE', 'RESOLVED', 'CANCELLED'];
    
    return {
      id: Number(duelData.id),
      creator: duelData.creator,
      opponent: duelData.opponent,
      tokenAddress: duelData.tokenAddress,
      wagerAmount: ethers.formatUnits(duelData.wagerAmount, 18),
      duration: Number(duelData.duration),
      startTime: Number(duelData.startTime),
      endTime: Number(duelData.endTime),
      resolved: duelData.resolved,
      winner: duelData.winner,
      status: statusMap[duelData.status] || 'UNKNOWN'
    };
  }

  invalidateCache() {
    this.duelCache.clear();
    this.lastCacheUpdate = 0;
  }
}

export const contractService = new ContractService();