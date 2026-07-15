import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import {
  RECENT_ACTIVITY,
  type ActivityType,
} from "@/features/dashboard/data/dashboard-data";

const ACTIVITY_COLORS: Record<ActivityType, string> = {
  health: "var(--mui-palette-warning-main)",
  renewal: "var(--mui-palette-success-main)",
  support: "var(--mui-palette-error-main)",
  onboarding: "var(--mui-palette-primary-main)",
};

const ACTIVITY_ICONS = {
  health: TrendingDownRoundedIcon,
  renewal: AutorenewRoundedIcon,
  support: SupportAgentRoundedIcon,
  onboarding: AssignmentTurnedInRoundedIcon,
} satisfies Record<ActivityType, typeof TrendingDownRoundedIcon>;

export function RecentActivityCard() {
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
          <Stack spacing={0.5}>
            <Typography variant="h3">Recent activity</Typography>

            <Typography variant="body2" color="text.secondary">
              Latest customer lifecycle events
            </Typography>
          </Stack>

          <Stack>
            {RECENT_ACTIVITY.map((activity, index) => {
              const Icon = ACTIVITY_ICONS[activity.type];
              const color = ACTIVITY_COLORS[activity.type];
              const isLast = index === RECENT_ACTIVITY.length - 1;

              return (
                <Stack
                  key={activity.id}
                  direction="row"
                  sx={{
                    alignItems: "flex-start",
                    gap: 2,
                    py: 2,
                    borderBottom: isLast ? 0 : "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Box
                    sx={{
                      display: "grid",
                      width: 36,
                      height: 36,
                      flexShrink: 0,
                      placeItems: "center",
                      borderRadius: 2,
                      color,
                      bgcolor: `color-mix(in srgb, ${color} 10%, transparent)`,
                    }}
                  >
                    <Icon sx={{ fontSize: 19 }} />
                  </Box>

                  <Stack
                    direction={{
                      xs: "column",
                      sm: "row",
                    }}
                    sx={{
                      flexGrow: 1,
                      justifyContent: "space-between",
                      gap: 1,
                    }}
                  >
                    <Stack spacing={0.25}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {activity.title}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        {activity.description}
                      </Typography>
                    </Stack>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        flexShrink: 0,
                      }}
                    >
                      {activity.occurredAt}
                    </Typography>
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
