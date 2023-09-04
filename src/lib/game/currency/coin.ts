import bigInt from "big-integer";
import BaseCurrency from "./base";

export default class CoinCurrency extends BaseCurrency {
    get name(): string {
        return 'Coins';
    }
}