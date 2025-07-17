"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, LineChart, Line, AreaChart, Area, ComposedChart, Rectangle } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface ChartData {
  name?: string;
  date?: string;
  value?: number;
  amount?: number;
  q1?: number;
  q3?: number;
  median?: number;
  min?: number;
  max?: number;
  [key: string]: string | number | undefined;
}

interface ChartProps {
  data: ChartData[];
  height?: number;
  className?: string;
}

export function BarChartComponent({ data, height = 300, className }: ChartProps) {
  const chartConfig = {
    value: {
      label: "Result",
      color: "var(--chart-4)",
    },
  } satisfies ChartConfig;

  return (
    <div className={className} style={{ height, width: '100%' }}>
      <ChartContainer config={chartConfig} className="w-full h-full">
        <BarChart accessibilityLayer data={data}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="name"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar dataKey="value" fill="var(--color-value)" radius={8} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

export function LineChartComponent({ data, height = 300, className }: ChartProps) {
  const chartConfig = {
    amount: {
      label: "Amount",
      color: "var(--primary)",
    },
  } satisfies ChartConfig;

  return (
    <div className={className} style={{ height, width: '100%' }}>
      <ChartContainer config={chartConfig} className="w-full h-full">
        <LineChart accessibilityLayer data={data}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="var(--color-amount)"
            strokeWidth={3}
            dot={{
              fill: "var(--color-amount)",
              strokeWidth: 2,
              r: 5,
              stroke: "hsl(var(--background))"
            }}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}

export function AreaChartComponent({ data, height = 300, className }: ChartProps) {
  const chartConfig = {
    amount: {
      label: "Amount",
      color: "var(--chart-4)",
    },
  } satisfies ChartConfig;

  return (
    <div className={className} style={{ height, width: '100%' }}>
      <ChartContainer config={chartConfig} className="w-full h-full">
        <AreaChart accessibilityLayer data={data}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="var(--color-amount)"
            fill="var(--color-amount)"
            fillOpacity={0.6}
            strokeWidth={2}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}

export function BoxPlotComponent({ data, height = 300, className }: ChartProps) {
  const chartConfig = {
    q1: {
      label: "Q1",
      color: "var(--chart-2)",
    },
    q3: {
      label: "Q3", 
      color: "hsl(var(--primary))",
    },
    median: {
      label: "Median",
      color: "hsl(var(--primary))",
    },
  } satisfies ChartConfig;

  return (
    <div className={className} style={{ height, width: '100%' }}>
      <ChartContainer config={chartConfig} className="w-full h-full">
        <ComposedChart accessibilityLayer data={data}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="name"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          {/* Box plot rectangles */}
          {data.map((entry, index) => {
            const q1 = entry.q1 ?? 0;
            const q3 = entry.q3 ?? 0;
            const median = entry.median ?? 0;
            const min = entry.min ?? 0;
            const max = entry.max ?? 0;
            
            return (
              <g key={`box-${index}`}>
                <Rectangle
                  x={index * 100 + 20}
                  y={q3}
                  width={60}
                  height={q1 - q3}
                  fill="var(--color-q1)"
                  fillOpacity={0.3}
                  stroke="var(--color-q1)"
                  strokeWidth={2}
                />
                <Rectangle
                  x={index * 100 + 20}
                  y={median - 1}
                  width={60}
                  height={2}
                  fill="var(--color-median)"
                  stroke="var(--color-median)"
                  strokeWidth={2}
                />
                <Rectangle
                  x={index * 100 + 45}
                  y={min}
                  width={10}
                  height={max - min}
                  fill="none"
                  stroke="var(--color-q3)"
                  strokeWidth={2}
                />
              </g>
            );
          })}
        </ComposedChart>
      </ChartContainer>
    </div>
  );
} 