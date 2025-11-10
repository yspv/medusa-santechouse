import {
  ForwardRefRenderFunction,
  PropsWithoutRef,
  ReactNode,
  RefAttributes,
  forwardRef,
} from "react";

export function genericForwardRef<T, P = {}>(
  render: ForwardRefRenderFunction<T, PropsWithoutRef<P>>,
): (props: P & RefAttributes<T>) => ReactNode {
  return forwardRef(render) as any;
}
