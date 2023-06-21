import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration)

const DEFAULT_DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm'

type WithOptions = (val: number, timestamp: number) => string
type WithTimeOptions = (val: number, timestamp: number) => string

export function toFixed(fractionDigit: number, divider = 1): WithOptions {
  return (val) => (val / divider).toFixed(fractionDigit)
}

// pretty bytes for human readable
export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function dateFormatter(format: string =  DEFAULT_DATE_TIME_FORMAT ): WithTimeOptions {
  return (timestamp) => dayjs(timestamp).format(format)
}

export function formatDuration(
  value: number,
  unit: 'seconds' | 'minutes' | 'days' = "seconds"
) {
  return dayjs.duration(value, unit).format('HH:mm:ss')
}

export function duration2Secends(duration: string) {
  return dayjs.duration(duration).asSeconds()
}
