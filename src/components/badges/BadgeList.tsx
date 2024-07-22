export interface BadgeListProps {
  badges?: React.ReactNode[]
}

export function BadgeList(props: BadgeListProps) {
  const { badges = [] } = props

  return (
    <div
      className="flex grow gap-2 overflow-hidden"
      style={{
        maskImage: 'linear-gradient(90deg, #000 80%, transparent)',
      }}
    >
      {badges}
    </div>
  )
}
