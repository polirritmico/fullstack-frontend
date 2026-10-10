import { useEffect, useState } from "react";

// adapted from: https://stackoverflow.com/questions/63219753/how-to-show-time-and-date-in-realtime-in-react-js

const INTERVAL_MS = 60_000;
const LOCALE = "es-CL";

const DATETIME_FORMAT = {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: false,
};

const dateTimeFormatter = new Intl.DateTimeFormat(LOCALE, DATETIME_FORMAT);

function useCurrentDateTime() {
  // hook para obtener la fecha y hora actuales. Se inicia con la hora actual
  const [date, setDate] = useState(() => new Date());

  // se configura el timer al INTERVAL_MS para que actualice la fecha y hora
  useEffect(() => {
    const timerId = setInterval(() => setDate(new Date()), INTERVAL_MS);
    return () => clearInterval(timerId);
  }, []);

  const currentDateTime = dateTimeFormatter.format(date);
  return currentDateTime;
}

export default useCurrentDateTime;
