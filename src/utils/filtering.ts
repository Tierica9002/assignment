function filter<T>(items: T[], filterBy: keyof T, filterTerm: string): T[] {
  return items.filter((item) => {
    return String(item[filterBy])
      .toLowerCase()
      .includes(filterTerm.toLowerCase());
  });
}

export function applyFilters<T>(
  items: T[],
  filtersObj: Record<keyof T, unknown>
): T[] {
  return Object.entries(filtersObj).reduce(
    (acc, [filterField, filterValue]) => {
      return filter(acc, filterField as keyof T, String(filterValue));
    },
    items
  );
}
