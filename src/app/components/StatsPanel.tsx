interface StatsPanelProps {
  completionRate: number;
  pendingCount: number;
}

export function StatsPanel({ completionRate, pendingCount }: StatsPanelProps) {
  return (
    <div className="flex gap-6">
      {/* 完成率 */}
      <div className="flex-1 bg-white rounded-xl p-6 border border-slate-200">
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20">
            <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
              {/* 背景圆环 */}
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="3"
              />
              {/* 进度圆环 */}
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="#2563eb"
                strokeWidth="3"
                strokeDasharray={`${completionRate * 100.53 / 100} 100.53`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-semibold text-slate-900">{completionRate}%</span>
            </div>
          </div>
          <div>
            <div className="text-sm text-slate-500 mb-1">完成率</div>
            <div className="text-2xl font-semibold text-slate-900">{completionRate}% 完成</div>
          </div>
        </div>
      </div>

      {/* 待办数量 */}
      <div className="flex-1 bg-white rounded-xl p-6 border border-slate-200">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center">
            <span className="text-3xl font-bold text-blue-600">{pendingCount}</span>
          </div>
          <div>
            <div className="text-sm text-slate-500 mb-1">待办事项</div>
            <div className="text-2xl font-semibold text-slate-900">{pendingCount} 项待办</div>
          </div>
        </div>
      </div>
    </div>
  );
}
