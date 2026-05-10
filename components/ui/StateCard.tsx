const StateCard = ({
  icon: Icon,
  label,
  value,
}: {
  icon: any
  label: string
  value: number
}) => {
  return (
    <div className="
      group flex flex-col gap-3 p-5
      bg-[#131313] border border-[#1f1f1f] rounded-xl
      hover:border-[#2a2a2a] transition-all duration-200 relative overflow-hidden
    ">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-700/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-medium text-[#555] uppercase tracking-widest">{label}</p>
        <Icon size={13} className="text-[#333] group-hover:text-red-600 transition-colors" />
      </div>
      <p className="text-3xl font-semibold text-[#f0f0f0] tracking-tight">{value}</p>
    </div>
  )
}

export default StateCard
