import { http, createConfig } from "wagmi";
import { mainnet, sepolia, baseSepolia } from "wagmi/chains";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";

export const config = createConfig({
  chains: [mainnet, sepolia, baseSepolia],
  connectors: [
    injected(),
    coinbaseWallet(),
    walletConnect({ projectId: import.meta.env.VITE_WC_PROJECT_ID }),
  ],
  transports: {
    [mainnet.id]: http(
      "https://eth-mainnet.g.alchemy.com/v2/om-5_ZpCzcvOr2joTT_rH6R8LszNNKjH"
    ),
    [sepolia.id]: http(
      "https://eth-sepolia.g.alchemy.com/v2/om-5_ZpCzcvOr2joTT_rH6R8LszNNKjH"
    ),
    [baseSepolia.id]: http(
      "https://base-sepolia.g.alchemy.com/v2/om-5_ZpCzcvOr2joTT_rH6R8LszNNKjH"
    ),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
