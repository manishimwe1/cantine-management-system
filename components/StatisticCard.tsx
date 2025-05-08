import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

type StatisticCardProps = {
  title: string;
  value: number | string | undefined;
  subtitle?: string;
  footer?: React.ReactNode;
  className?: string;
};

const StatisticCard = ({
  title,
  value,
  subtitle,
  footer,
  className = "",
}: StatisticCardProps) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="mt-2 text-3xl font-bold text-gray-900">
        {value ? (
          value
        ) : (
          <Skeleton className="w-[30px] h-[28px] rounded-full bg-indigo-200" />
        )}
      </div>
      {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
      {footer && (
        <div className="mt-4 pt-4 border-t border-gray-200">{footer}</div>
      )}
    </div>
  );
};

export default StatisticCard;
