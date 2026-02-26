import { PlacedChildren } from "../PlacedChildren";
import { PlacedChild } from "../types";
import { MIDDLEWARE_TYPE } from "./constants";

export type SetContextCallback<T extends object> = (
  c: T | ((prevContext: T) => T),
) => void;

export type MiddlewareCallback<T extends object> = (props: {
  context: T;
  setContext: SetContextCallback<T>;
}) => void;

export type UnknownMiddleware = {
  type: (typeof MIDDLEWARE_TYPE)[keyof typeof MIDDLEWARE_TYPE];
  callback: MiddlewareCallback<object>;
};

export type BeforePlacementMiddlewareContext = {
  container: HTMLElement;
  containerWidth?: number;
};

export type BeforePlacementMiddleware = {
  type: (typeof MIDDLEWARE_TYPE)["beforePlacement"];
  callback: MiddlewareCallback<BeforePlacementMiddlewareContext>;
};

export type PlacementMiddlewareContext = {
  container: HTMLElement;
  containerWidth: number;
  placedChildren: PlacedChildren;
  childrenElements: HTMLElement[];
  currentChildElement: HTMLElement;
  currentChild?: PlacedChild;
};

export type PlacementMiddleware = {
  type: (typeof MIDDLEWARE_TYPE)["placement"];
  callback: MiddlewareCallback<PlacementMiddlewareContext>;
};

export type CommonMiddlewareContext = {
  container?: HTMLElement;
  currentChildElement?: HTMLElement;
};

export type CommonMiddleware = {
  type: (typeof MIDDLEWARE_TYPE)["common"];
  callback: MiddlewareCallback<CommonMiddlewareContext>;
};

export type Middleware =
  | BeforePlacementMiddleware
  | PlacementMiddleware
  | CommonMiddleware;
