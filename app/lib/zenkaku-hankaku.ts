export function ZenkakuToHankaku(str: string) {
  return str
    .replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) =>
      String.fromCharCode(s.charCodeAt(0) - 0xfee0),
    )
    .replace(/　/g, ' ');
}
