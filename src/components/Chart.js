import React, { useEffect, useState } from "react";
import TradingViewChart from "kaktana-react-lightweight-charts";
import axios from "axios";
import { fromUnixTime, format } from "date-fns";
import useCandlestickChart from "../hooks/useCandlestickChart";

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

// TODO: pull in the sentiment data from the CryptoEq API.

function Chart() {
  const { data } = useCandlestickChart()
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
