import bigInt from "big-integer";
import BaseCurrency from "./base";

export default class WheatCurrency extends BaseCurrency {
    get name(): string {
        return 'Wheat';
    }

    get initialCost(): bigInt.BigInteger {
        return bigInt(10);
    }
    
}