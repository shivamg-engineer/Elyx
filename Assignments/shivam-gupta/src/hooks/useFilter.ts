import { useState, useMemo } from "react";

export type FilterFunctions<T> = {
  [K in string]?: (item: T, value: string) => boolean;
};

export interface UseFilterOptions<T> {
  searchKeys?: (keyof T)[];
  filters?: FilterFunctions<T>;
}

/**
 * Generic filtering hook
 */
export function useFilter<T>(data: T[], options: UseFilterOptions<T>) {
  const { searchKeys = [], filters = {} } = options;

  const [search, setSearch] = useState("");
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});

  const updateFilter = (key: string, value: string) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setSearch("");
    setFilterValues({});
  };

  const filtered = useMemo(() => {
    return data.filter((item) => {
      // TEXT SEARCH
      if (search.trim()) {
        const lower = search.toLowerCase();
        const match = searchKeys.some((k) =>
          String(item[k] ?? "").toLowerCase().includes(lower)
        );
        if (!match) return false;
      }

      // DROPDOWN FILTERS
      for (const key in filterValues) {
        const filterFn = filters[key];
        const value = filterValues[key];

        if (filterFn && !filterFn(item, value)) return false;
      }

      return true;
    });
  }, [data, search, filterValues]);

  return {
    search,
    setSearch,
    filterValues,
    updateFilter,
    clearFilters,
    filtered,
  };
}
