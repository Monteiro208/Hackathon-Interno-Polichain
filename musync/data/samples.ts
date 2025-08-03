export interface Sample {
  id:   string;
  name: string;
  i:    number;
  j:    number;
  k:    number;
  cid:   string;   // URL ou IPFS cid
  price: string;   // valor em wei (string)
}

export const mockSamples: Sample[] = [
  {
    id: "1",
    name: "Happy Guitar",
    i: 5, j: 0, k: 0,
    cid:   "https://example.com/happy-guitar.wav",
    price: "10000000000000000"  // 0.01 ETH em wei
  },
  {
    id: "2",
    name: "Sad Piano",
    i: 0, j: 5, k: 0,
    cid:   "https://example.com/sad-piano.wav",
    price: "10000000000000000"  // 0.01 ETH
  },
];
