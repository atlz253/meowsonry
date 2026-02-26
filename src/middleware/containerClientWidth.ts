import { MIDDLEWARE_TYPE } from "./constants";
import {
  BeforePlacementMiddleware,
  BeforePlacementMiddlewareContext,
  SetContextCallback,
} from "./types";

export const containerClientWidth = ({
  apply,
}: {
  apply: (props: {
    clientWidth: number;
    setContext: SetContextCallback<BeforePlacementMiddlewareContext>;
  }) => void;
}): BeforePlacementMiddleware => ({
  type: MIDDLEWARE_TYPE.beforePlacement,
  callback: ({ context: { container }, setContext }) => {
    apply({ setContext, clientWidth: container.clientWidth });
  },
});
