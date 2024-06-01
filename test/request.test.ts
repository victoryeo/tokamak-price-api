import chai from "chai";
import supertest from "supertest";
//import chaiHttp from "chai-http";
//import app from "../src/app";
//chai.use(chaiHttp)

const url = `http://localhost:4000/`;

describe('Status and content', () => {
  const request = supertest('http://localhost:4000');

  it('root path', async () => {
    const result = await request.get('/')
    //console.log(result)
    chai.expect(result.statusCode).to.equal(404);
  });
  it('Graphql path', async () => {
    const result = await request.get('/graphql')
    //console.log(result.text)
    chai.expect(result.statusCode).to.equal(200);
  });
  it('Graphql query valid token name: aura', async () => {
    let queryData = {
      query: `query MyQuery {
  getTokenMarketData(tokenName: "aura") {
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
}`
    };

    const result = await request.get('/graphql')
      .query(queryData)
    //console.log(result.text)
    chai.expect(result.statusCode).to.equal(200);
    chai.expect(result.text).to.include('current_price');
  });

  it('Graphql query INVALID token name', async () => {
    let queryData = {
      query: `query MyQuery {
  getTokenMarketData(tokenName: "noname") {
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
}`
    };

    const result = await request.get('/graphql')
      .query(queryData)
    //console.log(result.text)
    chai.expect(result.statusCode).to.equal(200);
    chai.expect(result.text).to.not.include('current_price');
  });

  it('Graphql query valid token name: tonstarter', async () => {
    let queryData = {
      query: `query MyQuery {
  getTokenMarketData(tokenName: "tonstarter") {
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
}`
    };

    const result = await request.get('/graphql')
      .query(queryData)
    //console.log(result.text)
    chai.expect(result.statusCode).to.equal(200);
    chai.expect(result.text).to.include('current_price');
  });
});