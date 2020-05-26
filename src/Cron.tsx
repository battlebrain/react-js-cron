import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react'
import { Button } from 'antd'

import { CronProps, PeriodType } from './types'
import Period from './fields/Period'
import MonthDays from './fields/MonthDays'
import Months from './fields/Months'
import Hours from './fields/Hours'
import Minutes from './fields/Minutes'
import WeekDays from './fields/WeekDays'
import { setCron, getCron, classNames } from './utils'
import { DEFAULT_LOCALE_EN } from './locale'

import './styles.css'

export default function Cron(props: CronProps) {
  const {
    clearButton = true,
    locale = DEFAULT_LOCALE_EN,
    value = '',
    setValue,
    displayError = true,
    setError,
    className,
    defaultPeriod = 'month',
    clearButtonProps = {},
    allowEmpty = 'for-default-value',
    humanizeLabels = true,
    humanizeValue = false,
  } = props
  const internalValueRef = useRef<string>(value)
  const [period, setPeriod] = useState<PeriodType | undefined>()
  const [monthDays, setMonthDays] = useState<number[] | undefined>()
  const [months, setMonths] = useState<number[] | undefined>()
  const [weekDays, setWeekDays] = useState<number[] | undefined>()
  const [hours, setHours] = useState<number[] | undefined>()
  const [minutes, setMinutes] = useState<number[] | undefined>()
  const [error, setInternalError] = useState<boolean>(false)

  useEffect(() => {
    setCron(
      value,
      setInternalError,
      setError,
      allowEmpty,
      internalValueRef,
      true,
      locale,
      setMinutes,
      setHours,
      setMonthDays,
      setWeekDays,
      setMonths,
      setPeriod
    )
  }, []) // eslint-disable-line

  const localeJSON = JSON.stringify(locale)
  useEffect(
    () => {
      if (value !== internalValueRef.current) {
        setCron(
          value,
          setInternalError,
          setError,
          allowEmpty,
          internalValueRef,
          false,
          locale,
          setMinutes,
          setHours,
          setMonthDays,
          setWeekDays,
          setMonths,
          setPeriod
        )
      }
    },
    // eslint-disable-next-line
    [value, internalValueRef, setError, setValue, localeJSON, allowEmpty]
  )

  useEffect(() => {
    // Only change the value if a user touched a field
    if (
      period ||
      minutes ||
      months ||
      monthDays ||
      weekDays ||
      hours ||
      minutes
    ) {
      const cron = getCron(
        period || defaultPeriod,
        months,
        monthDays,
        weekDays,
        hours,
        minutes,
        humanizeValue
      )

      setValue(cron)
      internalValueRef.current = cron

      setError && setError(undefined)
      setInternalError(false)
    }
  }, [
    period,
    monthDays,
    months,
    weekDays,
    hours,
    minutes,
    setValue,
    setError,
    defaultPeriod,
    humanizeValue,
  ])

  const handleClear = useCallback(() => {
    setMonthDays(undefined)
    setMonths(undefined)
    setWeekDays(undefined)
    setHours(undefined)
    setMinutes(undefined)

    const cron = getCron(
      period || defaultPeriod,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      humanizeValue
    )

    setValue(cron)
    internalValueRef.current = cron

    setError && setError(undefined)
    setInternalError(false)
  }, [period, setError, setValue, defaultPeriod, humanizeValue])

  const internalClassName = useMemo(
    () =>
      classNames({
        'react-js-cron': true,
        'react-js-cron-error': !!error && displayError,
        [`${className}`]: !!className,
        [`${className}-error`]: !!error && displayError && !!className,
      }),
    [className, error, displayError]
  )

  const {
    className: clearButtonClassNameProp,
    ...otherClearButtonProps
  } = clearButtonProps
  const clearButtonClassName = useMemo(
    () =>
      classNames({
        'react-js-cron-clear-button': true,
        [`${className}-clear-button`]: !!className,
        [`${clearButtonClassNameProp}`]: !!clearButtonClassNameProp,
      }),
    [className, clearButtonClassNameProp]
  )

  return (
    <div className={internalClassName}>
      <Period
        value={period || defaultPeriod}
        setValue={setPeriod}
        locale={locale}
        className={className}
      />

      {period === 'year' && (
        <Months
          value={months}
          setValue={setMonths}
          locale={locale}
          className={className}
          humanizeLabels={humanizeLabels}
        />
      )}

      {period !== 'minute' &&
        period !== 'hour' &&
        period !== 'day' &&
        period !== 'week' && (
          <MonthDays
            value={monthDays}
            setValue={setMonthDays}
            locale={locale}
            className={className}
            weekDays={weekDays}
          />
        )}

      {period !== 'minute' && period !== 'hour' && period !== 'day' && (
        <WeekDays
          value={weekDays}
          setValue={setWeekDays}
          locale={locale}
          className={className}
          humanizeLabels={humanizeLabels}
          period={period || defaultPeriod}
          monthDays={monthDays}
        />
      )}

      {period !== 'minute' && period !== 'hour' && (
        <Hours
          value={hours}
          setValue={setHours}
          locale={locale}
          className={className}
        />
      )}

      {period !== 'minute' && (
        <Minutes
          value={minutes}
          setValue={setMinutes}
          locale={locale}
          period={period || defaultPeriod}
          className={className}
        />
      )}

      {clearButton && (
        <Button
          className={clearButtonClassName}
          danger
          type='primary'
          {...otherClearButtonProps}
          onClick={handleClear}
        >
          Clear
        </Button>
      )}
    </div>
  )
}
