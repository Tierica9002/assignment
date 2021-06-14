import React from "react";
import { client } from "../../utils/api-client";
import { useAuth } from "../../context/auth-context";
import ServerExplorerTable from "./ServerExplorerTable";

const ServerExplorer = (): JSX.Element => {
  const { token } = useAuth();
  const [servers, setServers] = React.useState([]);

  React.useEffect(() => {
    if (token) {
      client("servers", { token }).then(async (response: Response) => {
        const items = await response.json();
        setServers(items);
      });
    }
  }, [token]);

  return (
    <div className="flex flex-col">
      <div className="my-2 overflow-x-auto">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <ServerExplorerTable servers={servers} />
        </div>
      </div>
    </div>
  );
};

export default ServerExplorer;
