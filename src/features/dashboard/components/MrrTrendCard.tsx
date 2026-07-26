"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { LineChart } from "@mui/x-charts/LineChart";

import { MRR_TREND_DATA } from "@/features/dashboard/data/mrr-trend-data";

const compactCurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});

export function MrrTrendCard() {
  return (
    <Card>
      <CardContent
        sx={{
          p: 3,

          "&:last-child": {
            pb: 3,
          },
        }}
      >
        <Stack spacing={3}>
          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            sx={{
              justifyContent: "space-between",
              gap: 1,
            }}
          >
            <Stack spacing={0.5}>
              <Typography variant="h3">MRR trend</Typography>

              <Typography variant="body2" color="text.secondary">
                Monthly recurring revenue over the last six months.
              </Typography>
            </Stack>

            <Stack
              spacing={0.25}
              sx={{
                textAlign: {
                  xs: "left",
                  sm: "right",
                },
              }}
            >
              <Typography variant="h3" component="p" sx={{ fontWeight: 700 }}>
                $184.6K
              </Typography>

              <Typography
                variant="caption"
                color="success.main"
                sx={{ fontWeight: 700 }}
              >
                +12.4% vs previous month
              </Typography>
            </Stack>
          </Stack>

          <LineChart
            height={300}
            skipAnimation
            sx={{
              "& .MuiLineChart-area": { fillOpacity: 0.12 },
              "& .MuiLineChart-line": { strokeWidth: 2.5 },
            }}
            margin={{
              top: 10,
              right: 20,
              bottom: 20,
              left: 60,
            }}
            hideLegend
            xAxis={[
              {
                scaleType: "point",
                data: MRR_TREND_DATA.map((item) => item.month),
              },
            ]}
            yAxis={[
              {
                min: 130_000,
                valueFormatter: (value: number) =>
                  compactCurrencyFormatter.format(value),
              },
            ]}
            series={[
              {
                id: "mrr",
                label: "MRR",
                data: MRR_TREND_DATA.map((item) => item.value),
                area: true,
                curve: "linear",
                color: "var(--mui-palette-primary-main)",
                valueFormatter: (value) =>
                  value === null ? "" : compactCurrencyFormatter.format(value),
              },
            ]}
            grid={{
              horizontal: true,
            }}
          />
        </Stack>
      </CardContent>
    </Card>
  );
}
