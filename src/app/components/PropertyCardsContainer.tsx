const PropertyCardsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mt-2 md:mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 auto-rows-fr place-items-center"
      style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(288px, 1fr))' }}
    >
      {children}
    </div>
  )
}

export default PropertyCardsContainer