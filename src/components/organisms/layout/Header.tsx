// ヘッダー
import { FC, memo } from "react";
import styled from "styled-components";

export const Header: FC = memo(() => {
  return (
    <>
      <HeaderTitle>Title</HeaderTitle>
    </>
  );
});

const HeaderTitle = styled.h1`
  margin: auto;
  padding: 16px;
  background-color: silver;
  text-align: center;
`;
