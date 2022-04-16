// グラフ with highcharts
import { FC } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import styled from "styled-components";

type Props = {
  populationdata: {
    prefName: string;
    data: { year: number; value: number }[]; // 年，年の人数
  }[];
};

export const Graph: FC<Props> = (props) => {
  const { populationdata } = props;
  let series: Highcharts.SeriesOptionsType[] = []; // 折線グラフ 配列
  let years = []; // 年 配列

  for (let pop of populationdata) {
    let data = [];

    for (let pdate of pop.data) {
      data.push(pdate.value);
      years.push(String(pdate.year));
    }

    series.push({
      type: "line",
      name: pop.prefName,
      data: data,
    });
  }

  const options: Highcharts.Options = {
    title: {
      text: "総人口推移",
    },
    // x軸
    xAxis: {
      title: {
        text: "年度",
      },
      categories: years,
    },
    // y軸
    yAxis: {
      title: {
        text: "人口数",
      },
    },
    // 配列が空のとき or 存在するとき
    series:
      series.length === 0 ? [{ type: "line", name: "都道府県名", data: [] }] : series,
  };

  return (
    <>
      <Container>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </Container>
    </>
  );
};

const Container = styled.div`
  margin-top: 2rem;
  padding: 12px;
`;
