export function debounce(fn,delay) {
  let timeoutID;
  return function () {
    clearTimeout(timeoutID);
    timeoutID = window.setTimeout(() => fn.apply(), delay);
  };
}
// export function debounce<F extends (...params: any[]) => void>(
//   fn: F,
//   delay: number
// ) {
//   let timeoutID: number | undefined;
//   return function (this: any, ...args: any[]) {
//     clearTimeout(timeoutID);
//     timeoutID = window.setTimeout(() => fn.apply(this, args), delay);
//   } as F;
// }