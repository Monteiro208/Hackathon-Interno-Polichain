// data/samples.ts
export interface Sample {
  id: string;
  name: string;
  i: number;
  j: number;
  k: number;
}

/* ← adicione quantos quiser */
export const mockSamples: Sample[] = [
  { id: "1", name: "Happy Guitar", i: 5, j: 0, k: 0 },
  { id: "2", name: "Sad Piano",   i: 0, j: 5, k: 0 },
  { id: "3", name: "Epic Drums",  i: 0, j: 0, k: 5 },
  { id: "4", name: "Chill Pad",   i: 2, j: 2, k: 1 },
  { id: "5", name: "Jazz Bass",   i: 3, j: 1, k: 1 },
];
