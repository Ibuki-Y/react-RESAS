// レイアウト
import { FC, memo } from "react";

import { Header } from "../organisms/layout/Header";

type Props = {
  children: React.ReactNode;
};

export const Layout: FC<Props> = memo((props) => {
  const { children } = props;
  return (
    <>
      <Header />
      {children}
    </>
  );
});
