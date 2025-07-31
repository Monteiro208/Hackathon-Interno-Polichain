import useSWR from "swr";
import { useFilter } from "@/lib/filterContext";
import { Sample } from "@/data/samples";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useSamples() {
  const { nameQuery, emotion } = useFilter();

  const params = new URLSearchParams();
  if (nameQuery) params.set("q", nameQuery);
  if (emotion) {
    params.set("i", emotion.i.toString());
    params.set("j", emotion.j.toString());
    params.set("k", emotion.k.toString());
  }

  const { data, error } = useSWR<Sample[]>(
    `/api/samples?${params.toString()}`,
    fetcher
  );

  return { samples: data, isLoading: !data && !error, error };
}
