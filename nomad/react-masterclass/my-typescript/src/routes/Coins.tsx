import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { fetchCoins } from "../api";

const Container = styled.div`
  padding: 0px 20px;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
`;

const CoinsList = styled.ul`
  max-width: 400px;
  margin: 0 auto;
`;

const Coin = styled.li`
  margin-bottom: 12px;
  border-radius: 8px;
  background-color: white;
  color: ${props => props.theme.bgColor};

  a {
    display: flex;
    padding: 12px 16px;
    transition: color .2s ease;
    align-items: center;
  }

  &:hover {
    a {
      color: ${props => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: ${props => props.theme.accentColor};
`;

const Loader = styled.div`
  text-align: center;
`;

const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 8px;
`;

interface ICoin {
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string,
}

function Coins() {
/*   const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async() => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setCoins(json.slice(0, 100));
      setLoading(false);
    })();
  }, []); */

  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);

  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      {isLoading
        ? <Loader>loading...</Loader>
        : <>
            <Header>
              <Title>코인</Title>
            </Header>
            <CoinsList>
              {data?.slice(0, 100).map(coin => (
                <Coin key={coin.id}>
                  <Link to={{
                    pathname: `/${coin.id}`,
                    state: { name: coin.name }
                  }}>
                    <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                    {coin.name} &rarr;
                  </Link>
                </Coin>)
              )}
            </CoinsList>
          </>
      }
    </Container>
  )
}

export default Coins;
