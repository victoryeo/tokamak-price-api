/**
 * Simple
 */
interface SimplePriceParams {
  /**
   * A single id or a list of coin ids to filter if you want specific results. Use coins.list() for a list of coin ids.
   */
  ids: string | string[];
  /**
   * A single id or a list of ids. Use simple.supportedVsCurrencies() for a list of vsCurrency ids.
   */
  vs_currency: string | string[];
  /**
   * To include 24hr_vol.
   */
  // tslint:disable-next-line no-redundant-undefined
  include_24hr_vol?: boolean | undefined;
  /**
   * To include 24hr_change of price.
   */
  // tslint:disable-next-line no-redundant-undefined
  include_24hr_change?: boolean | undefined;
  /**
   * To include last_updated_at of price.
   */
  // tslint:disable-next-line no-redundant-undefined
  include_last_updated_at?: boolean | undefined;
  /**
   * To include market_cap, default: false.
   */
  // tslint:disable-next-line no-redundant-undefined
  include_market_cap?: boolean | undefined;
}

declare class CoinGecko {
  /**
   * Check API server status
   */
  ping(): Promise<Response>;

  /**
   * Get cryptocurrency global data
   */
  global(): Promise<Response>;

  markets: {
    /**
     * Get the current price of any cryptocurrencies in any other supported currencies that you need
     * @param params - Parameters to pass through to the request
     */
    tokenData(params: SimplePriceParams): Promise<Response>;
  };
}

export = CoinGecko;
