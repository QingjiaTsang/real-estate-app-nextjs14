
type AttributeProps = {
  title: string
  value: string | number
}

const Attribute = ({ title, value }: AttributeProps) => {
  return (
    <div className='flex flex-col text-sm'>
      <p className='text-slate-500 font-semibold'>{title}</p>
      <p className='text-slate-600'>{value}</p>
    </div>
  )
}

export default Attribute