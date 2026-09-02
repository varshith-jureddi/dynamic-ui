"use client";

type ActivityItem = {
  title: string;
  description?: string;
  timestamp?: string;
};

type ActivityFeedProps = {
  items?: ActivityItem[];
};

export default function ActivityFeed({
  items = [],
}: ActivityFeedProps) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={`${item.title}-${index}`}
          className="flex gap-3"
        >
          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-slate-900" />

          <div className="min-w-0">
            <p className="text-sm font-medium text-slate-900">
              {item.title}
            </p>

            {item.description && (
              <p className="mt-0.5 text-xs leading-5 text-slate-500">
                {item.description}
              </p>
            )}

            {item.timestamp && (
              <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-slate-400">
                {item.timestamp}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}