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
      bg-white dark:bg-[#111] border border-gray-200 dark:border-[#1f1f1f] rounded-xl
      hover:border-gray-300 dark:hover:border-[#2a2a2a] transition-all duration-200 relative overflow-hidden
    ">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-medium text-gray-500 dark:text-[#555] uppercase tracking-widest">{label}</p>
        <Icon size={13} className="text-gray-400 dark:text-[#333] group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors" />
      </div>
      <p className="text-3xl font-semibold text-gray-900 dark:text-[#f0f0f0] tracking-tight">{value}</p>
    </div>
  )
}

export default StateCard
