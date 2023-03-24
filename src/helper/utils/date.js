import momentJalaali from "moment-jalaali";

export const convertToInteger = (date = "") => {
  if (date.length > 0) {
    return Number(date.replaceAll("/", ""));
  }
  return 0;
};

export const convertToString = (date = 0) => {
  if (date.length() < 8) return date;

  const day = String(date).substring(6, 8);
  const month = String(date).substring(4, 6);
  const year = String(date).substring(0, 4);

  return year + "/" + month + "/" + day;
};

export const convertStringToDateObject = (date = "") => {
  if (date.length > 0) {
    const dateStr = date.replaceAll("/", "");
    if (dateStr.length < 8) return dateStr;

    const day = String(dateStr).substring(6, 8);
    const month = String(dateStr).substring(4, 6);
    const year = String(dateStr).substring(0, 4);

    return { year: Number(year), month: Number(month), day: Number(day) };
  }
  return null;
};

export const convertDateObjectToString = (date = {}) => {
  if (date === {}) return "";
  return String(date.year) + "/" + date.month.length === 1
    ? "0" + String(date.month)
    : String(date.month) + "/" + date.day.length === 1
    ? "0" + String(date.day)
    : String(date.day);
};

export const convertIntegerToDateObject = (date = 0) => {
  if (date.length() < 8) return date;
  convertStringToDateObject(String.valueOf(date));
};

export const convertDateObjectToInteger = (date = {}) => {
  if (date === {}) return 0;
  return date.year * 10000 + date.month * 100 + date.day;
};

export const getCurrentDate = (isMoment = false) => {
  const toDay = momentJalaali();
  if (isMoment) return toDay;
  else
    return {
      year: toDay.jYear(),
      month: toDay.jMonth() + 1,
      day: toDay.jDate(),
    };
};

export const getMilladyCurrentDate = (isDate = false) => {
  const toDay = new Date();
  if (isDate) return toDay;
  else
    return {
      year: toDay.getFullYear(),
      month: toDay.getMonth() + 1,
      day: toDay.getDate(),
    };
};
