export interface TopicBadgeProps {
  name: string
  url: string
}

/**
 * A badge for topics similar to GitHub's.
 */
export function TopicBadge(props: TopicBadgeProps) {
  const { name, url } = props

  return (
    <div className="flex-none">
      <a href={url}>
        <div className="items-center justify-center rounded-xl bg-opacity-15 hover:bg-opacity-100 badge-primary text-primary hover:text-white badge-lg border-0">
          {name}
        </div>
      </a>
    </div>
  )
}
