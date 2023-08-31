import bigInt from "big-integer";
import { writable, type Writable } from "svelte/store";

export default class BaseCurrency {
    
    value: bigInt.BigInteger = bigInt(0);

    store: Writable<{formattedValue:string, formattedAndNamedValue: string}>;

    constructor() {
        this.store = writable({formattedValue: this.formattedValue, formattedAndNamedValue: this.formattedAndNamedValue});
    }

    get name(): string {
        return 'BaseCurrency';
    }

    getValue(): bigInt.BigInteger {
        return this.value;
    }

    get formattedValue(): string {
        return this.formatValue(this.value);
    }

    get formattedAndNamedValue(): string {
        return `${this.formattedValue} ${this.name}`;
    }

    formatValue(value: bigInt.BigInteger | number): string {
        const suffixes = ['', 'K', 'M', 'B', 'T', 'Q', 'QQ', 'S', 'SS'];
        let suffixIndex = 0;
        let formattedValue = value.toString();
    
        while (formattedValue.length > 3) {
            formattedValue = formattedValue.slice(0, -3);
            suffixIndex++;
        }
    
        const suffix = suffixes[suffixIndex];
        return `${formattedValue} ${suffix}`;
    }

    updateStore(){
        this.store.set({formattedValue: this.formattedValue, formattedAndNamedValue: this.formattedAndNamedValue});
    }

    add(value: bigInt.BigInteger | number) {
        this.value = bigInt(this.value).add(value);
        this.updateStore();
        return this.value;
    }

    subtract(value: bigInt.BigInteger | number) {
        this.value = bigInt(this.value).subtract(value);
        this.updateStore();
        return this.value;
    }

    multiply(value: bigInt.BigInteger | number) {
        this.value = bigInt(this.value).multiply(value);
        this.updateStore();
        return this.value;
    }

    divide(value: bigInt.BigInteger | number) {
        this.value = bigInt(this.value).divide(value);
        this.updateStore();
        return this.value;
    }



}