/* eslint-disable react/prop-types */

export default function DevnetBanner({
  backgroundColor = 'bg-yellow-200',
  textColor = 'text-yellow-800',
  className = ''
} = {}) {
  return (
    <div className={`overflow-hidden ${backgroundColor} ${className}`}>
      <div className={`whitespace-nowrap ${textColor} text-lg font-bold py-1 animate-marquee-rtl`}>
        <span className="inline-block px-4">DEVNET MODE ● DEVNET MODE ● DEVNET MODE ● DEVNET MODE ● DEVNET MODE ● DEVNET MODE ● DEVNET MODE ● DEVNET MODE ● DEVNET MODE ● DEVNET MODE ● DEVNET MODE ● DEVNET MODE ● DEVNET MODE ● DEVNET MODE ● DEVNET MODE ● DEVNET MODE ● DEVNET MODE ● DEVNET MODE ● DEVNET MODE ● DEVNET MODE ● DEVNET MODE ● DEVNET MODE ● DEVNET MODE ● DEVNET MODE ● DEVNET MODE ● DEVNET MODE ● DEVNET MODE ● DEVNET MODE ● DEVNET MODE ● DEVNET MODE ● DEVNET MODE ● DEVNET MODE ● DEVNET MODE ● DEVNET MODE ● DEVNET MODE ● DEVNET MODE ● DEVNET MODE</span>
      </div>
    </div>
  )
}
