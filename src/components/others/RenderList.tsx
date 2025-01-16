import { Children, ReactNode } from "react";

export default function RenderList({
  of,
  classNameContainer = [],
  componentNull,
  render,
}: {
  of: object[];
  classNameContainer?: Array<string>;
  componentNull?: ReactNode;
  render: (item: any, index: number) => ReactNode;
}) {
  if (!(of.length > 0))
    return <div className={classNameContainer[1]}>{componentNull}</div>;

  return (
    <div className={classNameContainer[0]}>
      {Children.toArray(of.map((item, index) => render(item, index)))}
    </div>
  );
}
