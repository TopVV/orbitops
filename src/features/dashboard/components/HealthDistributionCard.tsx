import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import {
  HEALTH_DISTRIBUTION,
  type HealthTone,
} from "@/features/dashboard/data/dashboard-data";

const TONE_COLORS: Record<HealthTone, string> = {
  success: "var(--mui-palette-success-main)",
  warning: "var(--mui-palette-warning-main)",
  error: "var(--mui-palette-error-main)",
};

export function HealthDistributionCard() {
  return (
    <Card sx={{ height: "100%" }}>
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
            direction="row"
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h3">Customer health</Typography>

            <Typography variant="body2" color="text.secondary">
              128 total
            </Typography>
          </Stack>

          <Stack spacing={2.5}>
            {HEALTH_DISTRIBUTION.map((item) => {
              const color = TONE_COLORS[item.tone];

              return (
                <Stack key={item.label} spacing={1}>
                  <Stack
                    direction="row"
                    sx={{
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {item.label}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {item.count} · {item.percentage}%
                    </Typography>
                  </Stack>

                  <LinearProgress
                    variant="determinate"
                    value={item.percentage}
                    aria-label={`${item.label} customers`}
                    sx={{
                      height: 8,
                      borderRadius: 999,
                      bgcolor: "#EEF2F6",

                      "& .MuiLinearProgress-bar": {
                        borderRadius: 999,
                        bgcolor: color,
                      },
                    }}
                  />
                </Stack>
              );
            })}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
