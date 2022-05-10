import {byteToSymbol} from './reed-solomon/convert';
import {RSCSymbol} from './reed-solomon';
import {polynomialCalc} from './reed-solomon/polynomial';

function spacePadding(val: string, len: number){
  for(let i = 0; i < len; i++){
    val = "0" + val;
  }

  return val.slice((-1)*len);
}

const toASCII = (s: string):number[] => {
  return s.split('').map(v => v.charCodeAt(0));
}

const main = async () => {
  const asciiCodes = toASCII('Hello!');
  console.log(asciiCodes);
  for (const e of asciiCodes) {
    const s = byteToSymbol(e);
    console.log(`${spacePadding((e).toString(),3)} <-> ${s} (a^${s.exp})`);
  }

  console.log('list:');
  const beki = (() => {
    const v: RSCSymbol[] = [];
    for (let i = 0 ; i < 256 ; i++) {
      v.push(byteToSymbol(i));
    }
    return Object.assign({}, ...v.map((x) => ({[x.exp]: x})));
  })();

  for (let i = 0 ; i < 255 ; i++) {
    console.log(`${spacePadding((i).toString(),3)} <-> ${beki[i]} (a^${beki[i].exp})`);
  }


  // beliはexpがkeyなので-1する必要はない
  console.log('a^223 + a^26 -> ', beki[223].xor(beki[26]).exp);
  console.log('a^249 + a^3 + a^3 -> ', beki[249].xor(beki[3]).xor(beki[3]).exp);
  console.log('a^29 + a^226 -> ', beki[29].xor(beki[226]).exp);
  console.log('a^61 + a^182 -> ', beki[61].xor(beki[182]).exp);
  console.log('a^61 + a^182 -> ', beki[61].xor(beki[182]).exp);
  console.log('a^43 + a^100 -> ', beki[43].xor(beki[100]).exp);
  console.log('a^195 + a^185 -> ', beki[195].xor(beki[185]).exp);
  console.log('a^212 + a^113 -> ', beki[212].xor(beki[113]).exp);
  console.log('a^217 + a^29 -> ', beki[217].xor(beki[29]).exp);

  // 0はべき乗表現で使っているので、項がない時は-1を入れる
  const lhs = [-1,-1,-1,-1,138,212,195,43,61,107];
  const rhs = [6,78,249,75,0];
  polynomialCalc(lhs,rhs,beki);

}


main().catch((e) => {
  console.error(e);
});

