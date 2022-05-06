import {byteToSymbol} from './reed-solomon/convert';
import {RSCSymbol} from './reed-solomon';

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
  const asciiCodes = toASCII('howdy!');
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

}


main().catch((e) => {
  console.error(e);
});

