"use client";
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useContractRead,
  Chain,
} from "wagmi";
import { BigNumber } from "ethers";
import { ShoppingCartIcon, ArrowDownTrayIcon } from "@heroicons/react/24/solid";

// Defina a chain localhost manualmente
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

const MARKET_ADDRESS = process.env.NEXT_PUBLIC_MARKET_ADDR as `0x${string}`;

const marketAbi = [
  {
    inputs: [{ internalType: "uint256", name: "id", type: "uint256" }],
    name: "buy",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "user", type: "address" },
      { internalType: "uint256", name: "id", type: "uint256" },
    ],
    name: "canDownload",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

export interface Sample {
  id: number | string;
  name: string;
  price: string; // wei
  cid: string;
  i: number;
  j: number;
  k: number;
}

export default function SampleCard({ sample }: { sample: Sample }) {
  const { address, isConnected } = useAccount();
  const sampleId = BigNumber.from(sample.id.toString());
  const priceBN = BigNumber.from(sample.price);

  // 1. Preparação da transação
  const { config, error: prepareError } = usePrepareContractWrite({
    address: MARKET_ADDRESS,
    abi: marketAbi,
    functionName: "buy",
    args: [sampleId] as const,
    overrides: {
      value: priceBN,
    },
    enabled: isConnected,
  });

  // 2. Execução da transação
  const {
    data: txData,
    write: buy,
    isLoading: isBuying,
    error: writeError,
  } = useContractWrite(config);

  // 3. Aguardar confirmação
  const { isSuccess: buySuccess } = useWaitForTransaction({
    hash: txData?.hash,
  });

  // 4. Verificação de permissão
  const { data: canDownload, error: readError } = useContractRead({
    address: MARKET_ADDRESS,
    abi: marketAbi,
    functionName: "canDownload",
    args: [address || "0x0000000000000000000000000000000000000000", sampleId] as const,
    chainId: localhostChain.id,
    enabled: isConnected,
    watch: true,
  });

  return (
    <li className="rounded-md bg-white p-4 shadow flex flex-col justify-between">
      <div>
        <h4 className="font-semibold">{sample.name}</h4>
        <p className="text-xs text-gray-500">
          Emoção: {sample.i}-{sample.j}-{sample.k}
        </p>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => buy?.()}
          disabled={!buy || isBuying}
          className="p-2 bg-purple-600 rounded disabled:opacity-50 hover:bg-purple-700 transition-colors"
        >
          <ShoppingCartIcon className="h-5 w-5 text-white" />
        </button>

        <button
          type="button"
          onClick={() => window.open(`https://ipfs.io/ipfs/${sample.cid}`)}
          disabled={!buySuccess || !canDownload}
          className={`p-2 rounded transition-colors ${
            buySuccess && canDownload
              ? "bg-cyan-500 hover:bg-cyan-600"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          <ArrowDownTrayIcon className="h-5 w-5 text-white" />
        </button>
      </div>

      {/* Feedback de status */}
      {isBuying && (
        <p className="mt-2 text-xs text-yellow-600 animate-pulse">
          Processando transação...
        </p>
      )}
      {buySuccess && (
        <p className="mt-2 text-xs text-green-600">✅ Download liberado!</p>
      )}
      {writeError && (
        <p className="mt-2 text-xs text-red-600">❌ Erro: {writeError.message}</p>
      )}
      {(prepareError || readError) && (
        <p className="mt-2 text-xs text-red-600">
          ⚠️ {prepareError?.message || readError?.message}
        </p>
      )}
    </li>
  );
}