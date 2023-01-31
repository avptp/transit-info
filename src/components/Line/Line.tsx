import l1 from "images/metrovalencia/lines/1.svg";
import l2 from "images/metrovalencia/lines/2.svg";
import l3 from "images/metrovalencia/lines/3.svg";
import l4 from "images/metrovalencia/lines/4.svg";
import l5 from "images/metrovalencia/lines/5.svg";
import l6 from "images/metrovalencia/lines/6.svg";
import l7 from "images/metrovalencia/lines/7.svg";
import l8 from "images/metrovalencia/lines/8.svg";
import l9 from "images/metrovalencia/lines/9.svg";
import l10 from "images/metrovalencia/lines/10.svg";

const map = new Map<number, string>([
  [1, l1],
  [2, l2],
  [3, l3],
  [4, l4],
  [5, l5],
  [6, l6],
  [7, l7],
  [8, l8],
  [9, l9],
  [10, l10],
]);

type Props = {
  id: number;
};

function Line(props: Props) {
  return <img src={map.get(props.id)} alt={`Line ${props.id}`} />;
}

export default Line;
