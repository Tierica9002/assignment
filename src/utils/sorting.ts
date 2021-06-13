export enum SortDirections {
  ASCENDENT = "asc",
  DESCENDENT = "desc",
  UNSORTED = "unsorted",
}

type NextSort = {
  [Key in SortDirections]: SortDirections;
};

export const nextSortDirection: NextSort = {
  [SortDirections.ASCENDENT]: SortDirections.DESCENDENT,
  [SortDirections.DESCENDENT]: SortDirections.UNSORTED,
  [SortDirections.UNSORTED]: SortDirections.ASCENDENT,
};

export enum SortTypes {
  STRING = "string",
  NUMBER = "number",
}

const toInt = (x: unknown): number => {
  return parseInt(String(x));
};

// when sortType is NUMBER values are converted to number first and then compared
export function sorter<T>(
  items: T[],
  sortType: SortTypes,
  sortDirection: SortDirections,
  sortBy: keyof T
): T[] {
  const unsortedItems = [...items];
  if (sortType === SortTypes.NUMBER) {
    if (sortDirection === SortDirections.ASCENDENT) {
      return unsortedItems.sort((a, b) => {
        if (toInt(a[sortBy]) < toInt(b[sortBy])) {
          return -1;
        }
        if (toInt(a[sortBy]) > toInt(b[sortBy])) {
          return 1;
        }
        return 0;
      });
    }

    if (sortDirection === SortDirections.DESCENDENT) {
      return unsortedItems.sort((a, b) => {
        if (toInt(a[sortBy]) > toInt(b[sortBy])) {
          return -1;
        }
        if (toInt(a[sortBy]) < toInt(b[sortBy])) {
          return 1;
        }
        return 0;
      });
    }
    return items;
  }

  if (sortType === SortTypes.STRING) {
    if (sortDirection === SortDirections.ASCENDENT) {
      return unsortedItems.sort((a, b) => {
        if (String(a[sortBy]).toLowerCase() < String(b[sortBy]).toLowerCase()) {
          return -1;
        }
        if (String(a[sortBy]).toLowerCase() > String(b[sortBy]).toLowerCase()) {
          return 1;
        }
        return 0;
      });
    }

    if (sortDirection === SortDirections.DESCENDENT) {
      return unsortedItems.sort((a, b) => {
        if (String(a[sortBy]).toLowerCase() > String(b[sortBy]).toLowerCase()) {
          return -1;
        }
        if (String(a[sortBy]).toLowerCase() < String(b[sortBy]).toLowerCase()) {
          return 1;
        }
        return 0;
      });
    }
    return items;
  }

  return items;
}
