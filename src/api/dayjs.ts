import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const getKST = (): string => {
  return dayjs().tz("Asia/Seoul").format("YYYY-MM-DDTHH:mm:ssZ");
};

export const getUnixTImestamp = (): number => {
  return dayjs().unix();
};
