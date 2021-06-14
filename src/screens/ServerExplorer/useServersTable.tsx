import React from "react";

import { applyFilters } from "../../utils/filtering";

import {
  sorter,
  nextSortDirection,
  SortDirections,
  SortTypes,
} from "../../utils/sorting";

export enum Columns {
  NAME = "name",
  DISTANCE = "distance",
}

export interface Server {
  name: string;
  distance: number;
}

const columnToSortType = {
  [Columns.NAME]: SortTypes.STRING,
  [Columns.DISTANCE]: SortTypes.NUMBER,
};

type Action =
  | { type: "set_data"; payload: Server[] }
  | {
      type: "sort";
      payload: {
        field: Columns;
      };
    }
  | { type: "filter"; payload: { column: Columns; value: string } }
  | { type: "apply_filters" };

export interface SortState {
  field: Columns;
  direction: SortDirections;
}

interface Filtering {
  name: string;
  distance: string;
}

interface State {
  servers: Server[];
  filteredServers: Server[];
  sort: SortState;
  filter: Filtering;
  isLoading: boolean;
}

const initialState = {
  servers: [],
  filteredServers: [],
  sort: {
    field: Columns.NAME,
    direction: SortDirections.UNSORTED,
  },
  filter: {
    name: "",
    distance: "",
  },
  isLoading: true,
};

const tableReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "set_data":
      return {
        ...state,
        servers: action.payload,
        filteredServers: action.payload,
        isLoading: false,
      };
    case "sort": {
      const { field } = action.payload;

      return {
        ...state,
        sort: {
          ...state.sort,
          ...{
            field,
            direction:
              field !== state.sort.field
                ? SortDirections.ASCENDENT
                : nextSortDirection[state.sort.direction],
          },
        },
      };
    }
    case "filter": {
      const { column, value } = action.payload;
      return {
        ...state,
        filter: {
          ...state.filter,
          ...{
            [column]: value,
          },
        },
      };
    }
    case "apply_filters": {
      const sortedServers =
        state.sort.direction === SortDirections.UNSORTED
          ? state.servers
          : sorter(
              state.servers,
              columnToSortType[state.sort.field],
              state.sort.direction,
              state.sort.field
            );
      const filteredServers = applyFilters(sortedServers, state.filter);
      return {
        ...state,
        filteredServers: filteredServers,
      };
    }
  }
};

export const useServersTable = (
  servers: Server[]
): [State, React.Dispatch<Action>] => {
  const [state, dispatch] = React.useReducer(tableReducer, initialState);

  React.useEffect(() => {
    if (servers.length > 0) {
      dispatch({ type: "set_data", payload: servers });
    }
  }, [servers]);

  React.useEffect(() => {
    dispatch({
      type: "apply_filters",
    });
  }, [state.sort, state.filter]);

  return [state, dispatch];
};
