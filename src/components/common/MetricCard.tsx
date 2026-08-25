import React from "react";

export type Metric = {
  title: string;
  value: string | number;
  description?: string;
};

export interface MetricCardProps {
  metrics: Metric[];
}

const MetricCard = ({ metrics }: MetricCardProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center rounded-xl bg-card border border-border/60 p-6 text-center shadow-xs transition-all duration-200 hover:shadow-md hover:border-primary/40"
        >
          <h2 className="text-3xl font-extrabold text-foreground tracking-tight">
            {metric.value}
          </h2>
          <p className="mt-2 text-sm font-medium text-muted-foreground">
            {metric.title}
          </p>
          {metric.description && (
            <span className="mt-1 text-xs text-muted-foreground/80">
              {metric.description}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export { MetricCard };
export default MetricCard;
