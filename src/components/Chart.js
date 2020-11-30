import React, { useEffect, useState } from "react";
import TradingViewChart from "kaktana-react-lightweight-charts";
import axios from "axios";
import { fromUnixTime, format } from "date-fns";

const chartOptions = {
  alignLabels: true,
  timeScale: {
    rightOffset: 12,
    barSpacing: 3,
    fixLeftEdge: true,
    lockVisibleTimeRangeOnResize: true,
    rightBarStaysOnScroll: true,
    borderVisible: false,
    borderColor: "#fff000",
    visible: true,
    timeVisible: true,
    secondsVisible: false,
  },
};

function Chart() {
  const [data, setData] = useState({ candlestickSeries: [{ data: [] }] });
  useEffect(() => {
    axios
      .get(
        "https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=30",
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Apikey ${process.env.REACT_APP_CRYPTOCOMPARE_API_KEY}`,
          },
        }
      )
      .then((res) => {
        if (res.data.Response === "Success") {
          const chartData = {
            candlestickSeries: [
              {
                data: res.data.Data.Data.map((x) => ({
                  ...x,
                  time: format(fromUnixTime(x.time), "yyyy-MM-dd"),
                })),
              },
            ],
          };
          setData(chartData);
        }
      });
  }, []);

  return (
    <>
      {data.candlestickSeries.length >= 1 ? (
        <TradingViewChart
          options={chartOptions}
          candlestickSeries={data.candlestickSeries}
          
          autoWidth
          height={350}
        />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default Chart;
