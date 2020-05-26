import { DefaultLocale } from './types'

export const DEFAULT_LOCALE_EN: DefaultLocale = {
  everyText: 'every',
  emptyMonths: 'every month',
  emptyMonthDays: 'every day of the month',
  emptyMonthDaysShort: 'day of the month',
  emptyWeekDays: 'every day of the week',
  emptyWeekDaysShort: 'day of the week',
  emptyHours: 'every hour',
  emptyMinutes: 'every minute',
  emptyMinutesForHourPeriod: 'every',
  minuteOption: 'minute',
  hourOption: 'hour',
  dayOption: 'day',
  weekOption: 'week',
  monthOption: 'month',
  yearOption: 'year',
  prefixPeriod: 'Every',
  prefixMonths: 'in',
  prefixMonthDays: 'on',
  prefixWeekDays: 'on',
  prefixWeekDaysForMonthAndYearPeriod: 'and',
  prefixHours: 'at',
  prefixMinutes: ':',
  prefixMinutesForHourPeriod: 'at',
  suffixMinutesForHourPeriod: 'minute(s)',
  errorInvalidCron: 'Invalid cron expression',
  weekDays: [
    // Order is important, the index will be used as value
    'Sunday', // Sunday must always be first, it's "0"
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  months: [
    // Order is important, the index will be used as value
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
}
