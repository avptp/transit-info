import { useEffect, useState } from "react";
import "./DateTime.scss";

function DateTime() {
  const [date, setDate] = useState<Date>(new Date());
  const [language, setLanguage] = useState<string>("ca");

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    const dateInterval = setInterval(() => {
      setLanguage((previous) => (previous === "ca" ? "es" : "ca"));
    }, 5000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(dateInterval);
    };
  }, []);

  return (
    <div className="datetime">
      <div>
        <div className="time">
          {date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
          <small>
            :{date.getSeconds().toLocaleString([], { minimumIntegerDigits: 2 })}
          </small>
        </div>
        <div className="date">
          {date.toLocaleDateString(language, {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
    </div>
  );
}

export default DateTime;
