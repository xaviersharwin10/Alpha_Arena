import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, sepolia, hardhat } from 'wagmi/chains';

export const wagmiConfig = getDefaultConfig({
  appName: 'Alpha Arena',
  projectId: '1a240ae3b33be6f8e103b0ab20f114af', // Get from WalletConnect Cloud
  chains: [
    mainnet,
    ...(import.meta.env.VITE_ENABLE_TESTNETS === 'true' ? [sepolia, hardhat] : []),
  ],
  ssr: false,
});