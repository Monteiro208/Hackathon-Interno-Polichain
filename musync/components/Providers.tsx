"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  WagmiConfig,
  createClient,
  configureChains,
} from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { Chain } from "wagmi"; // Usar 'chain.localhost'
import {
  RainbowKitProvider,
  getDefaultWallets,
} from "@rainbow-me/rainbowkit";
import { FilterProvider } from "@/lib/filterContext";

const localhostChain: Chain = {
  id: 31337,
  name: "Localhost",
  network: "localhost",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: { http: ["http://127.0.0.1:8545"] },
    public: { http: ["http://127.0.0.1:8545"] },
  },
  testnet: true,
};

const queryClient = new QueryClient();
const { chains, provider, webSocketProvider } = configureChains(
  [localhostChain],
  [jsonRpcProvider({ rpc: () => ({ http: "http://127.0.0.1:8545" }) })]
);
const { connectors } = getDefaultWallets({
  appName: "Musync Local",
  projectId: "musync-local",
  chains,
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig client={wagmiClient}>
        <QueryClientProvider client={queryClient}>
          <FilterProvider>
          <RainbowKitProvider chains={chains}>
            {children}
          </RainbowKitProvider>
          </FilterProvider>
        </QueryClientProvider>
    </WagmiConfig>
  );
}
