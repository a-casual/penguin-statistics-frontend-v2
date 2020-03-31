import dayjs from 'dayjs'
import 'dayjs/locale/zh'
import 'dayjs/locale/ja'
import 'dayjs/locale/ko'
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const FORMATS = {
  MD: "M.D",
  YMD: "YY.M.D",
  HM: "H:mm",
  HMS: "H:mm:ss",
};

function needYear(moments) {
  for (let index in moments) {
    if (index === "0") continue;
    if (!dayjs().isSame(moments[index], 'year') || !(moments[index].isSame.apply(moments[index], [moments[index - 1], 'year']))) {
      return true
    }
  }
  return false
}

export default {
  dayjs,
  isOutdated(rangeEnd) {
    return dayjs().isAfter(rangeEnd)
  },
  dates (times) {
    times = times.map(ts => {
      return dayjs(ts)
    });
    let needsYear = needYear(times);
    times = times.map(time => {
      return time.format(`${needsYear ? FORMATS.YMD : FORMATS.MD} ${FORMATS.HM}`)
    });
    return times
  },
}
