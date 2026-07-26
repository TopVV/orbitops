import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import { AT_RISK_CUSTOMERS } from "@/features/dashboard/data/dashboard-data";

export function AtRiskCustomersCard() {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent
        sx={{
          p: 0,
          "&:last-child": {
            pb: 0,
          },
        }}
      >
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            px: 3,
            py: 2.5,
          }}
        >
          <Stack spacing={0.5}>
            <Typography variant="h3">Accounts requiring attention</Typography>

            <Typography variant="body2" color="text.secondary">
              Customers with active risk signals
            </Typography>
          </Stack>

          <Button
            href="/customers"
            size="small"
            sx={{ whiteSpace: "nowrap" }}
          >
            View all
          </Button>
        </Stack>

        <TableContainer>
          <Table
            size="small"
            aria-label="Customers requiring attention"
            sx={{ width: "100%", tableLayout: "fixed" }}
          >
            <TableHead>
              <TableRow>
                <TableCell>Customer</TableCell>
                <TableCell>Health</TableCell>

                <TableCell
                  sx={{
                    display: {
                      xs: "none",
                      lg: "table-cell",
                    },
                  }}
                >
                  Renewal
                </TableCell>

                <TableCell
                  sx={{
                    display: "none",
                  }}
                >
                  Owner
                </TableCell>

                <TableCell align="right" />
              </TableRow>
            </TableHead>

            <TableBody>
              {AT_RISK_CUSTOMERS.map((customer) => (
                <TableRow
                  key={customer.id}
                  hover
                  sx={{
                    "&:last-child td": {
                      borderBottom: 0,
                    },
                  }}
                >
                  <TableCell>
                    <Stack
                      direction="row"
                      sx={{
                        alignItems: "center",
                        gap: 1.5,
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 36,
                          height: 36,
                          fontSize: 13,
                          color: "primary.main",
                          bgcolor:
                            "color-mix(in srgb, var(--mui-palette-primary-main) 10%, transparent)",
                        }}
                      >
                        {customer.initials}
                      </Avatar>

                      <Stack spacing={0.25}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {customer.companyName}
                        </Typography>

                        <Typography variant="caption" color="text.secondary">
                          {customer.riskReason}
                        </Typography>
                      </Stack>
                    </Stack>
                  </TableCell>

                  <TableCell>
                    <Chip
                      size="small"
                      label={`${customer.healthScore} / 100`}
                      sx={{
                        color: "error.main",
                        bgcolor:
                          "color-mix(in srgb, var(--mui-palette-error-main) 8%, transparent)",
                        fontWeight: 700,
                      }}
                    />
                  </TableCell>

                  <TableCell
                    sx={{
                      display: {
                        xs: "none",
                        lg: "table-cell",
                      },
                    }}
                  >
                    {customer.renewalDate}
                  </TableCell>

                  <TableCell
                    sx={{
                      display: "none",
                    }}
                  >
                    {customer.owner}
                  </TableCell>

                  <TableCell align="right">
                    <Button href={`/customers/${customer.id}`} size="small">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
