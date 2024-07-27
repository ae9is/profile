import React, { useRef } from 'react'
import { ApmBadge, ApmBadgeRef } from './badges/ApmBadge'

export interface SearchInputProps {
  placeholder?: string
  value?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

export function SearchInput(props: SearchInputProps) {
  const { placeholder = 'Search', value, onChange } = props
  const apmRef = useRef<ApmBadgeRef>(null)

  function onKeyDown() {
    apmRef.current?.trigger()
  }

  return (
    <label className="input input-bordered flex items-center gap-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="h-4 w-4 opacity-70 mb-0.5"
      >
        <path
          fillRule="evenodd"
          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
          clipRule="evenodd"
        />
      </svg>
      <input
        type="text"
        className="grow text-black dark:text-white"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <ApmBadge ref={apmRef} />
    </label>
  )
}
