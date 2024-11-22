{/* Previous imports remain the same */}

export const AdStatsDisplay: React.FC<AdStatsProps> = ({ stats }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium">Advertisement Performance</h2>
        <select className="px-4 py-2 rounded-lg bg-dark-900 border border-white/10 text-white [&>option]:bg-dark-900 [&>option]:text-white focus:border-primary-lighter/50 transition-colors">
          <option value="7" className="text-white">Last 7 days</option>
          <option value="30" className="text-white">Last 30 days</option>
          <option value="90" className="text-white">Last 90 days</option>
        </select>
      </div>

      {/* Rest of the component remains the same */}
    </div>
  );
};