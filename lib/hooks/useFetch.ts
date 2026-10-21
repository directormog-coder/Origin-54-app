import { useEffect, useState } from "react";

type UseFetchState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export function useFetch<T>(
  fetcher: () => Promise<T>,
  deps: unknown[] = []
) {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const result = await fetcher();
        if (!mounted) return;
        setState({ data: result, loading: false, error: null });
      } catch (error) {
        if (!mounted) return;
        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error.message : "Request failed",
        });
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, deps);

  return state;
}
