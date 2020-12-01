import { useState, useEffect } from 'react'
import axios from 'axios'
import { format, fromUnixTime } from 'date-fns'

export default function useCandlestickChart() {
  const [data, setData] = useState({ candlestickSeries: [{ data: [] }] });
  const [ceqData, setCeqData] = useState([])

  useEffect(() => {
    axios
      .get(
        "https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=10",
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

  useEffect(() => {
    axios.get('http://localhost:8080/api/get/assets')
      .then(res => {
        const assets = res.data.assets
        const bitcoin = assets.filter(a => a.ticker === 'BTC')
        console.log("🚀 ~ file: useCandlestickChart.js ~ line 42 ~ useEffect ~ bitcoin", bitcoin)
        setCeqData(res.data.assets)
      })
  },[])

  // console.log('assets', ceqData)

  return { data }
}