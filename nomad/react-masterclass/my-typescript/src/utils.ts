export function makeImagePath(fileName: string, format?:string) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${fileName}`;
}
