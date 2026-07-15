import type { ReactNode } from "react";

import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type TrendDirection = "up" | "down";
type TrendTone = "positive" | "negative";
type IconTone = "primary" | "success" | "warning" | "error";

const TONE_COLOR_VARIABLES: Record<IconTone, string> = {
  primary: "var(--mui-palette-primary-main)",
  success: "var(--mui-palette-success-main)",
  warning: "var(--mui-palette-warning-main)",
  error: "var(--mui-palette-error-main)",
};

export interface KpiCardProps {
  label: string;
  value: string;
  change: string;
  changeLabel: string;
  trendDirection: TrendDirection;
  trendTone: TrendTone;
  icon: ReactNode;
  iconTone: IconTone;
}

export function KpiCard({
  label,
  value,
  change,
  changeLabel,
  trendDirection,
  trendTone,
  icon,
  iconTone,
}: KpiCardProps) {
  const TrendIcon =
    trendDirection === "up" ? ArrowUpwardRoundedIcon : ArrowDownwardRoundedIcon;

  const iconColor = TONE_COLOR_VARIABLES[iconTone];

  const trendColor =
    trendTone === "positive"
      ? "var(--mui-palette-success-main)"
      : "var(--mui-palette-error-main)";

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
        <Stack spacing={2.5}>
          <Stack
            direction="row"
            sx={{
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontWeight: 500 }}
            >
              {label}
            </Typography>

            <Box
              sx={{
                display: "grid",
                width: 40,
                height: 40,
                flexShrink: 0,
                placeItems: "center",
                borderRadius: 2,
                color: iconColor,
                bgcolor: `color-mix(in srgb, ${iconColor} 10%, transparent)`,
              }}
            >
              {icon}
            </Box>
          </Stack>

          <Typography
            variant="h2"
            component="p"
            sx={{
              fontSize: "1.75rem",
              fontWeight: 700,
              lineHeight: 1.2,
            }}
          >
            {value}
          </Typography>

          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              gap: 1,
              flexWrap: "wrap",
            }}
          >
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.25,
                px: 0.75,
                py: 0.25,
                borderRadius: 999,
                color: trendColor,
                bgcolor: `color-mix(in srgb, ${trendColor} 8%, transparent)`,
              }}
            >
              <TrendIcon sx={{ fontSize: 14 }} />

              <Typography
                variant="caption"
                sx={{
                  color: "inherit",
                  fontWeight: 700,
                }}
              >
                {change}
              </Typography>
            </Box>

            <Typography variant="caption" color="text.secondary">
              {changeLabel}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
