"use strict";

//Modules
const https = require("https");
const querystring = require("querystring");

//Helpers
const Utils = require("./helpers/utilities");
const Constants = require("./helpers/constants");
const ReturnObject = require("./helpers/ReturnObject");

class CoinGecko {
  get markets() {
    return {
      /**
       * @description Get the current price of any cryptocurrencies in any other supported currencies that you need
       * @function markets.tokenData()
       * @param {object} params - Parameters to pass through to the request
       * @param {array|string} params.ids - (Required) A single id or a list of coin ids to filter if you want specific results. Use coins.list() for a list of coin ids.
       * @param {array|string} params.vs_currency [default: usd] - A single id or a list of ids. Use simple.supportedVsCurrencies() for a list of vsCurrency ids.
       * @param {boolean} params.include_24hr_vol [default: false] - To include 24hr_vol (true/false)
       * @param {boolean} params.include_last_updated_at [default: false] - To include last_updated_at of price (true/false)
       * @returns {ReturnObject}
       */
      tokenData: (params = {}) => {
        //Must be object
        if (!Utils.isObject(params))
          Utils._WARN_("Invalid parameter", "params must be of type: Object");

        //Check the params.vs_currency
        //If is string, ok. If is array, convert to string
        if (Utils.isArray(params["vs_currency"])) {
          params.vs_currency = params.vs_currency.join(",");
        }

        //If no params.vs_currency, set to default: 'usd'
        if (
          !Utils.isString(params["vs_currency"]) ||
          Utils.isStringEmpty(params["vs_currency"])
        ) {
          params.vs_currency = "usd";
        }

        //Check the params.ids
        //If is string, ok. If is array, convert to string
        if (Utils.isArray(params["ids"])) {
          params.ids = params.ids.join(",");
        }

        //Must have params.ids
        if (
          !Utils.isString(params["ids"]) ||
          Utils.isStringEmpty(params["ids"])
        )
          Utils._WARN_(
            "Invalid parameter",
            "params.ids must be of type: String or Array and greater than 0 characters."
          );

        const path = `coins/markets`;

        return this._request(path, params);
      },
    };
  }

  /**
   * @description Build options for https.request
   * @function _buildRequestOptions
   * @protected
   * @param {string} path - Relative path for API
   * @param {object} params - Object representing query strings for url parameters
   * @returns {Object} - {path, method, host, port} Options for request
   */
  _buildRequestOptions(path, params) {
    //Stringify object params if exist
    if (Utils.isObject(params)) params = querystring.stringify(params);
    else params = undefined;

    //Make relative path
    //Check if has params, append accordingly
    if (params == undefined)
      path = `/api/v${Constants.API_VERSION}/${path}&x_cg_pro_api_key=${process.env.API_KEY}`;
    else
      path = `/api/v${Constants.API_VERSION}/${path}?${params}&x_cg_pro_api_key=${process.env.API_KEY}`;

    //Return options
    return {
      path,
      method: "GET",
      host: Constants.HOST,
      port: 443,
      timeout: CoinGecko.TIMEOUT,
    };
  }

  /**
   * @description Perform https request
   * @function _request
   * @protected
   * @param {string} path - Relative path for API
   * @param {object} params - Object representing query strings for url parameters
   * @returns {Promise} Body of https request data results
   */
  _request(path, params) {
    let options = this._buildRequestOptions(path, params);

    return new Promise((resolve, reject) => {
      //Perform request
      let req = https.request(options, (res) => {
        let body = [];

        //Set body on data
        res.on("data", (chunk) => {
          body.push(chunk);
        });

        //On end, end the Promise
        res.on("end", () => {
          try {
            body = Buffer.concat(body);
            body = body.toString();

            //Check if page is returned instead of JSON
            if (body.startsWith("<!DOCTYPE html>")) {
              Utils._WARN_(
                "Invalid request",
                "There was a problem with your request. The parameter(s) you gave are missing or incorrect."
              );
            } else if (body.startsWith("Throttled")) {
              Utils._WARN_(
                "Throttled request",
                "There was a problem with request limit."
              );
            }

            //Attempt to parse
            body = JSON.parse(body);
          } catch (error) {
            reject(error);
          }

          //Create return object
          resolve(
            ReturnObject(
              !(res.statusCode < 200 || res.statusCode >= 300),
              res.statusMessage,
              res.statusCode,
              body
            )
          );
        });
      });

      //On error, reject the Promise
      req.on("error", (error) => reject(error));

      //On timeout, reject the Promise
      req.on("timeout", () => {
        req.abort();
        reject(
          new Error(
            `CoinGecko API request timed out. Current timeout is: ${Constants.TIMEOUT} milliseconds`
          )
        );
      });

      //End request
      req.end();
    });
  }
}

module.exports = exports = CoinGecko;
