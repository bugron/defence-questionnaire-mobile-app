import { useState } from "react";

export type RequestState = "loading" | "success" | "error";

export const useRequestState = () => {
  const stateAndUpdater = useState<RequestState>("loading");

  return stateAndUpdater;
};
