export interface CardListProps {
  cards?: React.ReactNode[]
}

export function CardList(props: CardListProps) {
  const { cards = [] } = props

  return (
    <div className="flex flex-wrap">
      {cards?.map((c, idx) => (
        <div key={'card' + idx} className="md:px-2 mt-4 w-full md:w-1/2">
          {c}
        </div>
      ))}
    </div>
  )
}
