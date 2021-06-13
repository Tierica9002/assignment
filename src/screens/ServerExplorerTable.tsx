import React from "react";
import SortAscending from "../components/icons/SortAscending";
import SortDescending from "../components/icons/SortDescending";
import UpDownArrows from "../components/icons/UpDownArrows";
import { SortDirections } from "../utils/sorting";
import FormInput from "../components/FormInput";
import { useServersTable, Columns, SortState, Server } from "../utils/hooks";

interface ServerExplorerTableProps {
  servers: Server[];
}

interface SortingIconProps {
  column: Columns;
  sortState: SortState;
}

const SortingIcon = ({ column, sortState }: SortingIconProps): JSX.Element => {
  if (sortState.field !== column) {
    return <UpDownArrows />;
  }
  return sortState.direction === SortDirections.ASCENDENT ? (
    <SortAscending />
  ) : sortState.direction === SortDirections.DESCENDENT ? (
    <SortDescending />
  ) : (
    <UpDownArrows />
  );
};

const TableText = ({ text }: { text: string }): JSX.Element => (
  <tr>
    <td
      colSpan={Object.keys(Columns).length}
      className="mx-2 text-sm font-medium text-gray-900 text-center"
    >
      {text}
    </td>
  </tr>
);

const ServerExplorerTable = ({
  servers,
}: ServerExplorerTableProps): JSX.Element => {
  const [state, dispatch] = useServersTable(servers);

  return (
    <div className="shadow max-w-2xl m-auto overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <div className="px-2 py-4">
        <FormInput
          value={state.filter.name ? state.filter.name : ""}
          label="Search by name"
          id="name"
          type="text"
          onChange={(value) => {
            dispatch({
              type: "filter",
              payload: {
                column: Columns.NAME,
                value,
              },
            });
          }}
        />
        <FormInput
          value={state.filter.distance ? state.filter.distance : ""}
          label="Search by distance"
          id="distance"
          type="text"
          onChange={(value) => {
            dispatch({
              type: "filter",
              payload: {
                column: Columns.DISTANCE,
                value,
              },
            });
          }}
        />
      </div>
      <table className="min-w-full w-100 divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() =>
                dispatch({
                  type: "sort",
                  payload: {
                    field: Columns.NAME,
                  },
                })
              }
            >
              Name
              <span className="float-right">
                <SortingIcon column={Columns.NAME} sortState={state.sort} />
              </span>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() =>
                dispatch({
                  type: "sort",
                  payload: {
                    field: Columns.DISTANCE,
                  },
                })
              }
            >
              Distance
              <span className="float-right">
                <SortingIcon column={Columns.DISTANCE} sortState={state.sort} />
              </span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {state.filteredServers.length !== 0 ? (
            state.filteredServers.map((server) => (
              <tr key={server.name + server.distance}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-900">
                      {server.name}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{server.distance}</div>
                </td>
              </tr>
            ))
          ) : state.isLoading ? (
            <TableText text="Loading..." />
          ) : (
            <TableText text="No results match your search, please refine your search." />
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ServerExplorerTable;
