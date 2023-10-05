import { isSupportedTokenName } from "utils/isSupportedToken";
import CoinGecko from "../../coingecko-api/lib/CoinGecko";
import { GetTokenMarketData } from "../../types/query";
import { SupportedTokenNames } from "types/supportedTokens";
import axios from "axios";

const defaultTokenData = {
  id: "",
  symbol: "",
  name: "",
  image: "",
  current_price: 0,
  market_cap: 0,
  market_cap_rank: 0,
  fully_diluted_valuation: 0,
  total_volume: 0,
  high_24h: 0,
  low_24h: 0,
  price_change_24h: 0,
  price_change_percentage_24h: 0,
  market_cap_change_24h: 0,
  market_cap_change_percentage_24h: 0,
  circulating_supply: 0,
  total_supply: 0,
  max_supply: 0,
  ath: 0,
  ath_change_percentage: 0,
  ath_date: "",
  atl: 0,
  atl_change_percentage: 0,
  atl_date: "",
  last_updated: "",
};

async function fetchSupportedTokenPrice(tokenName: SupportedTokenNames) {
  switch (tokenName) {
    case "tonstarter":
      const tosPrice = await axios.get(
        "https://price-api.tokamak.network/tosprice"
      );
      return { ...defaultTokenData, current_price: tosPrice.data };
    case "dooropen":
      const dooropenPrice = await axios.get(
        "https://price-api.tokamak.network/docprice"
      );
      return { ...defaultTokenData, current_price: dooropenPrice.data };
    case "aura":
      const auraPrice = await axios.get(
        "https://price-api.tokamak.network/auraprice"
      );
      return { ...defaultTokenData, current_price: auraPrice.data };
    case "lyda":
      const lydaPrice = await axios.get(
        "https://price-api.tokamak.network/lydaprice"
      );
      return { ...defaultTokenData, current_price: lydaPrice.data };
    default:
      break;
  }
}

export default {
  Query: {
    async getTokenMarketData(_: any, args: GetTokenMarketData) {
      try {
        const { tokenName } = args;
        const isSupportedToken = isSupportedTokenName(tokenName);
        if (isSupportedToken) {
          const result = await fetchSupportedTokenPrice(
            tokenName as SupportedTokenNames
          );
          return result;
        }

        const CoinGeckoClient = new CoinGecko();
        const result = await CoinGeckoClient.markets
          .tokenData({
            ids: [tokenName],
            vs_currency: ["usd"],
          })
          .then((res: any) => {
            const data = res.data;
            return data[0];
          });
        return result;
      } catch (e) {
        console.log("**getTokenPrice err**");
        console.log(e);
      }
    },
  },
};
