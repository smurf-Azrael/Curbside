import { createContext, useContext } from "react";
import CurbsideApiClient from "./CurbsideApiClient";

export const ApiContext = createContext<CurbsideApiClient>({} as CurbsideApiClient);

export default function ApiProvider({children}:children) {
  const api = new CurbsideApiClient();

  return (
    <ApiContext.Provider value={api}>
      {children}
    </ApiContext.Provider>
  )
}

export function useApi () {
  return useContext(ApiContext);
}

interface children {
  children: JSX.Element[] | JSX.Element
}