import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface ProgressChartProps {
  points: number;
  target: number;
  tierName: string;
}

export function ProgressChart({ points, target, tierName }: ProgressChartProps) {
  const percentage = Math.min((points / target) * 100, 100);
  const remaining = Math.max(target - points, 0);

  const data = [
    { name: "Earned", value: points },
    { name: "Remaining", value: remaining },
  ];

  const COLORS = ["#059669", "#e2e8f0"]; // emerald-600 and slate-200

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
      <h3 className="text-lg font-semibold text-slate-800 mb-2">Progress to {tierName}</h3>
      <div className="relative w-48 h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              stroke="none"
              cornerRadius={4}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`${value} pts`, ""]} 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-bold text-slate-900">{Math.round(percentage)}%</span>
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{points} / {target}</span>
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-600 text-center max-w-[200px]">
        You are <strong className="text-emerald-600">{remaining} points</strong> away from unlocking {tierName} tier perks!
      </p>
    </div>
  );
}
