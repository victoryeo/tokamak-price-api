import CoinGecko from "../../coingecko-api/lib/CoinGecko";

export default {
  Query: {
    async getTokenMarketData(_: any, args: any) {
      try {
        const { tokenName } = args;

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
