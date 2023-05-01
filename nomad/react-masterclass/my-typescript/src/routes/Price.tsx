import { useQuery } from "react-query";
import { fetchCoinTickers } from "../api";
import styled from "styled-components";

const PriceList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const PriceItem = styled.li`
  flex-shrink: 0;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`;

const PriceType = styled.h3`
  margin-bottom: 10px;
  font-size: 12px;
`;

const PriceValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #66cc96;

  &.negative {
    color: #4692ff;
  }
`;

interface PriceProps {
  coinId: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  }
}

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 10000,
    }
  );

  const checkUpDown = (value: any) => {
    if (value < 0) {
      return 'negative';
    }
  };

  return (
    <>
      {
        isLoading ? (
          "Price Loading..."
        ) : (
          <PriceList>
          <PriceItem>
            <PriceType>Since 15 min ago</PriceType>
            <PriceValue className={checkUpDown(data?.quotes.USD.percent_change_15m)}>{data?.quotes.USD.percent_change_15m}%</PriceValue>
          </PriceItem>
          <PriceItem>
            <PriceType>Since 1 hour ago</PriceType>
            <PriceValue className={checkUpDown(data?.quotes.USD.percent_change_1h)}>{data?.quotes.USD.percent_change_1h}%</PriceValue>
          </PriceItem>
          <PriceItem>
            <PriceType>Since 1 week ago</PriceType>
            <PriceValue className={checkUpDown(data?.quotes.USD.percent_change_7d)}>{data?.quotes.USD.percent_change_7d}%</PriceValue>
          </PriceItem>
          <PriceItem>
            <PriceType>Since 1 year ago</PriceType>
            <PriceValue className={checkUpDown(data?.quotes.USD.percent_change_1y)}>{data?.quotes.USD.percent_change_1y}%</PriceValue>
          </PriceItem>
        </PriceList>
        )
      }
    </>
  );
}

export default Price;
