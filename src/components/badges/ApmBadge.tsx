import { forwardRef, Ref, useEffect, useImperativeHandle, useRef, useState } from 'react'
import './ApmBadge.css'

export interface ApmBadgeProps {
  rumbleThreshold?: number
  colorThreshold?: number
}

export interface ApmBadgeRef {
  trigger: () => void
}

const RECALC_INTERVAL = 500
const UPDATE_INTERVAL = 50

/**
 * Actions per minute = APM.
 * APM counter based on frequency of (for example) input text changing.
 *
 * Create a reference in the parent:
 *
 *  const apmRef = useRef<ApmBadgeRef>(null)
 *
 * Link some handler (for ex. an input's onKeyDown()) to this child component's trigger()
 *  function via the ref:
 *
 *  function onKeyDown() {
 *    apmRef.current?.trigger()
 *  }
 *
 * In parent render function, pass the ref:
 *
 * render() {
 *   <ApmBadge ref={apmRef} />
 * }
 */
export const ApmBadge = forwardRef(function ApmBadge(props: ApmBadgeProps, ref: Ref<ApmBadgeRef>) {
  const { rumbleThreshold = 500, colorThreshold = 300 } = props
  const changeCount = useRef(0)
  const [apm, setApm] = useState(0)
  const color = apmToColor(apm)
  const animation = apm > rumbleThreshold ? ' apm-badge-rumble' : ''
  const classes = 'flex gap-1 items-center justify-center rounded-xl text-primary' + animation

  function apmToColor(apm: number) {
    let color
    if (apm > colorThreshold) {
      color = '#f00'
    } else if (apm === 0) {
      color = '#000'
    } else {
      color = `hsl(0, 100%, ${Math.round((apm / colorThreshold) * 50)}%)`
    }
    return color
  }

  function timeAveraged(prevValue: number, newValue: number) {
    return Math.floor(
      (prevValue * (RECALC_INTERVAL - UPDATE_INTERVAL)) / RECALC_INTERVAL +
        (newValue * UPDATE_INTERVAL) / RECALC_INTERVAL
    )
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      const newApm = changeCount.current * (60000 / UPDATE_INTERVAL)
      setApm((apm) => timeAveraged(apm, newApm))
      changeCount.current = 0
    }, UPDATE_INTERVAL)

    return () => clearTimeout(timer)
  })

  useImperativeHandle(ref, () => {
    return {
      trigger() {
        changeCount.current++
      },
    }
  }, [])

  return (
    <div
      className={classes}
      style={{
        color: color,
      }}
    >
      <div>{apm}</div>
      <div className="font-thin text-xs text-bg-200">APM</div>
    </div>
  )
})
