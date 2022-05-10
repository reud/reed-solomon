
let ansArray: string[] = [];
// bekiのあれ。
let times = 0;

const printPoly = (exp: number[]) => {
  const expStrList:string[] = [];
  for (let i = 0; i < exp.length; i++) {
    if (exp[i] == -1) continue;
    if (i == 0) expStrList.push(`a^${exp[i]}`);
    else expStrList.push(`a^${exp[i]}x^${i}`);
  }
  return expStrList.reverse().join(' + ');
}
export const polynomialCalc = (lhs: number[], rhsMod: number[],beki: any) => {

  console.log('lhs: ' + printPoly(lhs));
  console.log('rhs: ' + printPoly(rhsMod));

  const ansLen = lhs.length - 1;
  const answerList = [];
  for(let i = 0; i < ansLen; i++) answerList.push(-1);

  const rhsTimedList = [];
  for(let i = 0; i < ansLen; i++) rhsTimedList.push(-1);

  const lhsTopI = lhs.length - 1;
  const rhsTopI = rhsMod.length - 1;
  const xbeki = lhsTopI - rhsTopI;
  const abeki = lhs[lhsTopI] - rhsMod[rhsTopI];
  ansArray.push(`a^${abeki}x^${xbeki}`);
  for(let i = 0; i < rhsMod.length; i++) {
    rhsTimedList[xbeki + i] = (rhsMod[i] + abeki )% 255;
  }

  console.log('rhsTimes: ' + printPoly(rhsTimedList));
  for(let i = 0; i < answerList.length; i++) {
    if (lhs[i] == -1 && rhsTimedList[i] == -1) continue;
    else if (lhs[i] == -1) answerList[i] = rhsTimedList[i];
    else if (rhsTimedList[i] == -1) answerList[i] = lhs[i];
    else {
      answerList[i] = beki[lhs[i]].xor(beki[rhsTimedList[i]]).exp;
    }
  }
  console.log('result: ' + printPoly(answerList));
  console.log('now ans: ' + ansArray.join(' + '));
  times++;
  if(times > 5) {
    return;
  }
  console.log('\n times = ' + times + ' \n');
  polynomialCalc(answerList,rhsMod,beki);
}