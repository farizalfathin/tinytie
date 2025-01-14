import { Children, ReactNode } from "react";

export default function RenderList({
  of,
  render,
}: {
  of: object[];
  render: (item: any, index: number) => ReactNode;
}) {
  return Children.toArray(of.map((item, index) => render(item, index)));
}
