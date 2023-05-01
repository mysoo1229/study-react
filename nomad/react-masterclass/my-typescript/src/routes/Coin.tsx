import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import {
  Switch,
  Route,
  useParams,
  useLocation,
  useRouteMatch,
  Link
} from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import LineChart from "./LineChart";
import CandleChart from "./CandleChart";
import Price from "./Price";

const Container = styled.div`
  max-width: 460px;
  padding: 0px 20px;
  margin: 0 auto;
`;

const Header = styled.header`
  display: flex;
  position: relative;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 10vh;
`;

const BackBtnWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translate3D(0, -50%, 0) rotate(45deg);

  a {
    display: block;
    width: 20px;
    height: 20px;
    border-top: transparent;
    border-right: transparent;
    border-bottom: 3px solid #666;
    border-left: 3px solid #666;
    cursor: pointer;
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

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 25px 0px;
  gap: 10px;
  background: #f3f3f3;
  border-radius: 10px;
`;

const Tab = styled.span<{ isActive : boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  color: ${props => props.isActive ? props.theme.accentColor : props.theme.bgColor};

  a {
    display: block;
    padding: 10px 0px;
    font-weight: bold;
  }
`;

interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
}

interface ITag {
  coin_counter: number;
  ico_counter: number;
  id: string;
  name: string;
}
interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  tags: ITag[];
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
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

function Coin() {
  // const [loading, setLoading] = useState(true);
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  // const [info, setInfo] = useState<InfoData>();
  // const [priceInfo, setPriceInfo] = useState<PriceData>();
  const priceMatch = useRouteMatch("/:coinId/price");
  const lineChartMatch = useRouteMatch("/:coinId/linechart");
  const candleChartMatch = useRouteMatch("/:coinId/candlechart");

/*   useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();

      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();

      setInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false);
    })();
  }, [coinId]); */

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
  );

  const loading = infoLoading || tickersLoading;

  return (
    <Container>
      <Helmet>
        <title>{state?.name ? state.name : loading ? "loading..." : infoData?.name}</title>
      </Helmet>
      <Header>
        <BackBtnWrap>
          <Link to={"/"} />
        </BackBtnWrap>
        <Title>{state?.name ? state.name : loading ? "loading..." : infoData?.name}</Title>
      </Header>
      {loading
        ? <Loader>loading...</Loader>
        : <>
            <Overview>
              <OverviewItem>
                <span>Rank:</span>
                <span>{infoData?.rank}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Symbol:</span>
                <span>${infoData?.symbol}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Price:</span>
                <span>${tickersData?.quotes.USD.price.toFixed(2)}</span>
              </OverviewItem>
            </Overview>
            <Description>{infoData?.description}</Description>
            <Overview>
              <OverviewItem>
                <span>Total Suply:</span>
                <span>{tickersData?.total_supply}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Max Supply:</span>
                <span>{tickersData?.max_supply}</span>
              </OverviewItem>
            </Overview>

            <Tabs>
              <Tab isActive={lineChartMatch !== null}>
                <Link to={`/${coinId}/linechart`}>
                  Line Chart
                </Link>
              </Tab>
              <Tab isActive={candleChartMatch !== null}>
                <Link to={`/${coinId}/candlechart`}>
                  Candlestick Chart
                </Link>
              </Tab>
              <Tab isActive={priceMatch !== null}>
                <Link to={`/${coinId}/price`}>
                  price
                </Link>
              </Tab>
            </Tabs>

            <Switch>
              <Route path={`/${coinId}/linechart`}>
                <LineChart coinId={coinId} />
              </Route>
              <Route path={`/${coinId}/candlechart`}>
                <CandleChart coinId={coinId} />
              </Route>
              <Route path={`/${coinId}/price`}>
                <Price coinId={coinId} />
              </Route>
            </Switch>
          </>
      }
    </Container>
  );
}

export default Coin;
