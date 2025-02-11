import {
  getRouteApi,
  RegisteredRouter,
  RouteIds,
  useNavigate,
} from "@tanstack/react-router";

export const cleanEmptyParams = <T extends Record<string, unknown>>(
  search: T,
) => {
  const newSearch = { ...search };
  Object.keys(newSearch).forEach((key) => {
    const value = newSearch[key];
    if (
      value === undefined ||
      value === "" ||
      (typeof value === "number" && isNaN(value))
    )
      delete newSearch[key];
  });

  return newSearch;
};

export function usePolicyAsSearchParams<
  T extends RouteIds<RegisteredRouter["routeTree"]>,
>(routeId: T) {
  const routeApi = getRouteApi<T>(routeId);
  const navigate = useNavigate();
  const policy = routeApi.useSearch();

  console.log("pp", policy, routeApi);
  const setPolicy = (partialFilters: Partial<typeof policy>) =>
    navigate({
      search: (prev) => cleanEmptyParams({ ...prev, ...partialFilters }),
    });
  const clearPolicy = () => navigate({ search: {} });

  return { policy, setPolicy, clearPolicy };
}
