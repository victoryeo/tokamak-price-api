# Tokamak-price-api
It's the price api to deliver token's market price through Coineko paid Api

# Build Setup
```
# install dependencies
npm install

# start the server (GraphiQL is started at http://127.0.0.1:4000)
npm run start

# use nodemon in development to automatically reload the server on changes
npm run dev
```

# How to use
* gql playground: https://coingecko-api.tokamak.network/graphql

#### Query Example
* You can find market datas of a token with a tokenName which is a parameter.
    * If you are in a trouble to find it, you might need to know how to find the api-id of each token [here](https://apiguide.coingecko.com/getting-started/10-min-tutorial-guide/1-get-data-by-id-or-address).

```
query MyQuery {
  getTokenMarketData(tokenName: "ethereum") {
    id
    ath
    ath_change_percentage
    ath_date
    atl
    atl_date
    atl_change_percentage
    circulating_supply
    current_price
    fully_diluted_valuation
    high_24h
    image
    last_updated
    low_24h
    market_cap
    market_cap_change_24h
    market_cap_change_percentage_24h
    market_cap_rank
    max_supply
    name
    price_change_24h
    price_change_percentage_24h
    symbol
    total_supply
    total_volume
  }
}
```

- [models.graphql](https://github.com/tokamak-network/tokamak-price-api/blob/main/src/api/models.graphql)
```
type Token_Data {
  id: String
  symbol: String
  name: String
  image: String
  current_price: Float
  market_cap: Float
  market_cap_rank: Float
  fully_diluted_valuation: Float
  total_volume: Float
  high_24h: Float
  low_24h: Float
  price_change_24h: Float
  price_change_percentage_24h: Float
  market_cap_change_24h: Float
  market_cap_change_percentage_24h: Float
  circulating_supply: Float
  total_supply: Float
  max_supply: Float
  ath: Float
  ath_change_percentage: Float
  ath_date: String
  atl: Float
  atl_change_percentage: Float
  atl_date: String
  last_updated: String
}
```

# Architecture
```
|- /src
  |- /api`           - GraphQL application
  |- /coingecko-api  - general helpers with Coingecko-api  
  |- schema.ts       - make excutable schema to bind a model, types and resolvers below "/api"
  |- app.ts          - application main file
```
