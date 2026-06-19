import { PAGINATION } from "@repo/contracts";
import { useEffect, useState } from "react";

export interface EntitySearchProps<
  T extends {
    search: string;
    page: number;
  },
> {
  params: T;
  setParams: (params: T) => void;
  debounceMs?: number;
}

export default function useEntitySearch<
  T extends {
    search: string;
    page: number;
  },
>({ params, setParams, debounceMs = 500 }: EntitySearchProps<T>) {
  const [localsearch, setLocalsearch] = useState(params.search);
  useEffect(() => {
    if (localsearch.length == 0 && params.search.length != 0) {
      setParams({
        ...params,
        search: "",
        page: PAGINATION.DEFAULT_PAGE,
      });

      return;
    }

    const timer = setTimeout(() => {
      setParams({
        ...params,
        search: localsearch,
        page: PAGINATION.DEFAULT_PAGE,
      });
    }, debounceMs);
    return () => {
      clearTimeout(timer);
    };
  }, [localsearch, setParams, debounceMs]);

  useEffect(() => {
    setLocalsearch(params.search);
  }, [params.search]);

  return {
    search: localsearch,
    onSearchChange: setLocalsearch,
  };
}
