// API取得 => コンポーネントに渡す
import { FC, useState, useEffect } from "react";
import axios from "axios";

import { CheckBox } from "../organisms/checkbox/CheckBox";
import { Graph } from "../organisms/graph/Graph";

export const Home: FC = () => {
  // 都道府県情報
  const [prefectures, setPreFectures] = useState<{
    message: null;
    result: {
      prefCode: number;
      prefName: string;
    }[];
  } | null>(null);
  // 人口情報，年
  const [prefPopulation, setPrefPopulation] = useState<
    { prefName: string; data: { year: number; value: number }[] }[]
  >([]);

  // マウント時，情報取得
  useEffect(() => {
    axios
      .get("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
        headers: { "X-API-KEY": `${process.env.REACT_APP_API_KEY}` },
      })
      .then((res) => {
        setPreFectures(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  // チェックボックスをクリックしたとき
  const handleClickCheck = (prefName: string, prefCode: number, check: boolean) => {
    let prefPopulationCopy = prefPopulation.slice(); // 配列コピー

    if (check) {
      // チェックをつけたとき(check===true)
      if (prefPopulationCopy.findIndex((value) => value.prefName === prefName) !== -1) {
        return;
      }
      axios
        .get(
          "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=" +
            String(prefCode),
          {
            headers: { "X-API-KEY": `${process.env.REACT_APP_API_KEY}` },
          }
        )
        .then((res) => {
          prefPopulationCopy.push({
            prefName: prefName,
            data: res.data.result.data[0].data,
          });
          setPrefPopulation(prefPopulationCopy);
        })
        .catch((err) => {
          alert(err);
          return;
        });
    } else {
      // チェックを外したとき(check===false)
      const deleteIndex = prefPopulationCopy.findIndex(
        (value) => value.prefName === prefName
      );
      if (deleteIndex === -1) {
        return;
      }
      prefPopulationCopy.splice(deleteIndex, 1);
      setPrefPopulation(prefPopulationCopy);
    }
  };

  return (
    <main>
      {prefectures && (
        <CheckBox prefectures={prefectures.result} onChanges={handleClickCheck} />
      )}
      <Graph populationdata={prefPopulation} />
    </main>
  );
};
