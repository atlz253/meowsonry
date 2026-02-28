import {
  BeforePlacementMiddleware,
  BeforePlacementMiddlewareContext,
  CommonMiddleware,
  Middleware,
  PlacementMiddleware,
  PlacementMiddlewareContext,
  UnknownMiddleware,
} from "./types";

export function handleMiddleware(options: {
  middleware: Array<BeforePlacementMiddleware | CommonMiddleware>;
  initialContext: BeforePlacementMiddlewareContext;
}): BeforePlacementMiddlewareContext;
export function handleMiddleware(options: {
  middleware: Array<PlacementMiddleware | CommonMiddleware>;
  initialContext: PlacementMiddlewareContext;
}): PlacementMiddlewareContext;

export function handleMiddleware({
  middleware,
  initialContext,
}: {
  middleware: Array<Middleware>;
  initialContext: BeforePlacementMiddlewareContext | PlacementMiddlewareContext;
}) {
  let currentContext = initialContext;
  (middleware as UnknownMiddleware[]).forEach(({ callback }) =>
    callback({
      context: currentContext,
      setContext: (c) => {
        currentContext = typeof c === "function" ? c(currentContext) : c;
      },
    }),
  );
  return currentContext;
}
