// 都道府県 & チェックボックス
import { FC } from "react";
import styled from "styled-components";

type Props = {
  // 都道府県
  prefectures:
    | {
        prefCode: number;
        prefName: string;
      }[];
  // チェック時イベント
  onChanges: (name: string, prefName: number, check: boolean) => void;
};

export const CheckBox: FC<Props> = (props) => {
  const { prefectures, onChanges } = props;

  return (
    <>
      <SubTitle>都道府県</SubTitle>
      <Container>
        {prefectures.map((prefecture) => (
          <Box key={prefecture.prefName}>
            <input
              style={{ cursor: "pointer" }}
              id={"checkbox" + prefecture.prefCode}
              type="checkbox"
              name="prefecture name"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onChanges(prefecture.prefName, prefecture.prefCode, e.target.checked);
              }}
            />
            <Name htmlFor={"checkbox" + prefecture.prefCode}>
              {prefecture.prefName.length === 3 //3文字のとき空白をあける
                ? "　" + prefecture.prefName
                : prefecture.prefName}
            </Name>
          </Box>
        ))}
      </Container>
    </>
  );
};

const SubTitle = styled.h2`
  margin-left: 16px;
  margin-bottom: 0;
  font-weight: 500;
`;
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  justify-content: flex-start;
  justify-self: auto;
`;
const Box = styled.div`
  text-align: center;
  padding: 4px;
  margin: 0.5rem;
`;
const Name = styled.label`
  display: contents;
  margin-left: 1em;
  cursor: pointer;
`;
