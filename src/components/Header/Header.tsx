import DateTime from "components/DateTime/DateTime";
import logo from "images/metrovalencia/isologo.svg";
import { Station } from "types/station";
import "./Header.scss";

type Props = {
  station: Station;
};

function Header(props: Props) {
  return (
    <header>
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="title">{props.station.name}</div>
      <DateTime />
    </header>
  );
}

export default Header;
