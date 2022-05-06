
// 固定長配列を作るための儀式
import {byteToSymbol, initialized} from './convert';

export type Tuple<TItem, TLength extends number> = [TItem, ...TItem[]] & { length: TLength };
// 多項式を表す型。8個のboolを持つ配列で表す。(Byte型)
type RSCByte = Tuple<boolean, 8>


export class RSCSymbol {
  private _value: RSCByte;
  private _exp: number;
  public changeValueByBit(val: boolean,pos: number) {
    this._value[pos] = val;
  }
  constructor() {
    this._value = [...Array(8)].map((_) => false) as RSCByte;
    this._exp = -1;
  }
  set exp(v: number) {
    if (v < -1 || v > 255) throw new Error('Error: BadExp inserted.');
    this._exp = v;
  }
  get exp() {
    return this._exp
  }

  // 事実上の右シフト
  public mulAlpha(): RSCSymbol {
    const retSym = new RSCSymbol();
    // 右シフト
    for (let i = 0; i < 7; i++ ) retSym.changeValueByBit(this._value[i],i+1);
    // 最も後ろにbitが立っているなら分解してxor
    // 00011101
    if(this._value[7]) {
      const up = [true, false, true, true, true, false, false, false] as RSCByte;
      const upSym = new RSCSymbol();
      upSym._value = up;
      return retSym.xor(upSym);
    }
    return retSym;
  }

  public xor(rhs: RSCSymbol): RSCSymbol {
    const v = [...Array(8)].map((_) => false) as RSCByte;
    for (let i = 0; i < 255; i++) {
      v[i] = this._value[i] !== rhs._value[i];
    }
    const ret = new RSCSymbol();
    ret._value = v;
    if (initialized) {
      return byteToSymbol(ret.value);
    }
    return ret;
  }

  get value(): number {
    let v = 0;
    for(let i = 0 ; i < 8; i++) {
      if(this._value[i]) v += 1 << i;
    }
    return v;
  }


  public toByteString(): string {
    let v = "";
    for (let i = 0; i < 8; i++) {
      v += this._value[i] ? "1" : "0";
    }
    return v.split("").reverse().join("");
  }

  public toString():string {
    return this.toByteString();
  }
}
