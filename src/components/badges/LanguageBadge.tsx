export interface LanguageBadgeProps {
  name: string
  color: string
}

/**
 * A badge for programming languages with colours similar to GitHub's.
 */
export function LanguageBadge(props: LanguageBadgeProps) {
  const { name, color } = props

  return (
    <div className="flex align-text-bottom items-center gap-1">
      <div
        style={{
          borderColor: color,
          backgroundColor: color,
        }}
        className="badge badge-sm border-1"
      />
      {name}
    </div>
  )
}
