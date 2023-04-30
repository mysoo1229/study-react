import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface IHistoricalData {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Chart({ coinId}: ChartProps) {
  // const params = useParams();
  const { isLoading, data } = useQuery<IHistoricalData[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );

  return <div>
    {isLoading ?
      (
        "Loading chart..."
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "Price",
              data: data?.slice(0, 14).map(price => parseFloat(price.close)) ?? [],
            },
          ]}
          options={{
            theme: {
              mode: "dark"
            },
            chart: {
              width: 500,
              height: 300,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: {
              borderColor: '#666',
              row: {
                colors: undefined,
                opacity: 0.3
              }
            },
            colors: [
              '#4692ff',
            ],
            stroke: {
              width: 4,
            },
            xaxis: {
              labels: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              categories:
                data?.slice(0, 14).map(price => 
                  new Date(price.time_close * 1000).toUTCString()
                ) ?? [],
              type: "datetime",
            },
            yaxis: {
              show: false,
            },
            fill: {
              type: "gradient",
              gradient: {
                gradientToColors: ["#66cc96"],
                stops: [0, 80],
              }
            },
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`
              }
            }
          }}
        />
      )
    }
  </div>;
}

export default Chart;
