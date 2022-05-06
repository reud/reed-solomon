import {RSCSymbol, Tuple} from './index';


let reedSolomonPattern: Tuple<RSCSymbol, 256>
export let initialized = false;
// 多項式 x^8 + x^4 + x^3 + x^2 + 1 = 0から冪乗とビットの対応関係を作る。
const initialize = () => {
  // exp -> RSCSymbolのdict
  const innerReedSolomonPattern = [...Array(256)].map((_) => new RSCSymbol()) as Tuple<RSCSymbol, 256>;
  // 初期値
  for (let i = 0; i < 8; i++) {
    innerReedSolomonPattern[i+1].exp = i;
    innerReedSolomonPattern[i+1].changeValueByBit(true,i);
  }
  innerReedSolomonPattern[9].exp = 8;
  innerReedSolomonPattern[9].changeValueByBit(true,0);
  innerReedSolomonPattern[9].changeValueByBit(true,2);
  innerReedSolomonPattern[9].changeValueByBit(true,3);
  innerReedSolomonPattern[9].changeValueByBit(true,4);
  for (let i = 10; i < 256; i++) {
    innerReedSolomonPattern[i] = innerReedSolomonPattern[i-1].mulAlpha();
    innerReedSolomonPattern[i].exp = i-1;
  }
  // byte ->  RSCSymbolのdict
  reedSolomonPattern =  [...Array(256)].map((_) => new RSCSymbol()) as Tuple<RSCSymbol, 256>;
  for (let i = 0; i < 256; i++) {
    reedSolomonPattern[innerReedSolomonPattern[i].value] = innerReedSolomonPattern[i];
  }
  initialized = true;
}

initialize();

export const byteToSymbol = (n: number): RSCSymbol => {
  return reedSolomonPattern[n];
}