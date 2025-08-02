import express from 'express';
import { oneInchService } from '../services/oneInch.js';

const router = express.Router();

// Get quote for swap
router.get('/quote', async (req, res, next) => {
  try {
    const { src, dst, amount } = req.query;
    
    if (!src || !dst || !amount) {
      return res.status(400).json({
        success: false,
        error: 'Missing required parameters: fromTokenAddress, toTokenAddress, amount'
      });
    }

    const quote = await oneInchService.getSwapQuote({
      src,
      dst,
      amount
    });

    res.json({ success: true, data: quote });
  } catch (error) {
    next(error);
  }
});

// Get swap transaction data
router.get('/transaction', async (req, res, next) => {
  try {
    const { 
      src, 
      dst, 
      amount,
      from,
      slippage = 1
    } = req.query;
    
    if (!src || !dst || !amount || !from ) {
      return res.status(400).json({
        success: false,
        error: 'Missing required parameters'
      });
    }

    const swapData = await oneInchService.getSwapTransaction({
      src,
      dst,
      amount,
      from,
      slippage
    });

    res.json({ success: true, data: swapData });
  } catch (error) {
    next(error);
  }
});

// Get supported tokens
router.get('/tokens', async (req, res, next) => {
  try {
    console.log("point 1")
    const tokens = await oneInchService.getSupportedTokens();
    res.json({ success: true, data: tokens });
  } catch (error) {
    next(error);
  }
});

export { router as swapRoutes };