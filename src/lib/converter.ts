import moment from "moment";

export function currencyNumber(value: number): string {
  return new Intl.NumberFormat("en-ID", {
    style: "currency",
    currency: "IDR",
  }).format(Math.floor(value));
}

export function dateToUtc(date: string) {
  return moment(date).utc().format();
}

export function utcToDate(utc: string, format = "YYYY-MM-DD") {
  return moment.utc(utc).local().format(format);
}
