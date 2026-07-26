"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import HubRoundedIcon from "@mui/icons-material/HubRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

const DRAWER_WIDTH = 248;

const navigationItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: DashboardRoundedIcon,
  },
  {
    label: "Customers",
    href: "/customers",
    icon: PeopleAltRoundedIcon,
  },
] as const;

interface AppShellProps {
  children: ReactNode;
}

function isNavigationItemActive(pathname: string, href: string) {
  if (href === "/dashboard") {
    return pathname === href;
  }

  return pathname.startsWith(href);
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const activeNavigationItem = navigationItems.find((item) =>
    isNavigationItemActive(pathname, item.href),
  );

  const closeMobileDrawer = () => {
    setIsMobileDrawerOpen(false);
  };

  const drawerContent = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        "& .MuiDivider-root": { borderColor: "#3B3E2E" },
      }}
    >
      <Stack
        direction="row"
        spacing={1.5}
        sx={{
          minHeight: 64,
          px: 2.5,
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "grid",
            width: 32,
            height: 32,
            placeItems: "center",
            borderRadius: 2,
            color: "primary.contrastText",
            bgcolor: "primary.main",
          }}
        >
          <HubRoundedIcon fontSize="small" />
        </Box>

        <Typography variant="h3" component="span" sx={{ fontWeight: 700 }}>
          OrbitOps
        </Typography>
      </Stack>

      <Divider />

      <List
        component="nav"
        aria-label="Primary navigation"
        sx={{
          px: 1.5,
          py: 2,
        }}
      >
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = isNavigationItemActive(pathname, item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMobileDrawer}
              style={{
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <ListItemButton
                selected={isActive}
                sx={{
                  mb: 0.5,
                  borderRadius: 2,
                  color: isActive ? "#F5D58A" : "#D4CDBB",

                  "&.Mui-selected": {
                    bgcolor: "rgba(198, 75, 18, 0.18)",
                    boxShadow: "inset 3px 0 0 #EA7A3B",
                  },

                  "&.Mui-selected:hover": {
                    bgcolor: "rgba(198, 75, 18, 0.24)",
                  },

                  "&:hover": {
                    bgcolor: "rgba(255, 251, 243, 0.06)",
                    color: "#FFF7E8",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: "inherit",
                  }}
                >
                  <Icon fontSize="small" />
                </ListItemIcon>

                <ListItemText
                  primary={item.label}
                  slotProps={{
                    primary: {
                      sx: {
                        fontWeight: isActive ? 600 : 500,
                      },
                    },
                  }}
                />
              </ListItemButton>
            </Link>
          );
        })}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <Divider />

      <Box sx={{ p: 2.5 }}>
        <Typography
          variant="caption"
          sx={{ display: "block", mb: 0.5, color: "#A9A18F" }}
        >
          Workspace
        </Typography>

        <Typography variant="body2" sx={{ fontWeight: 600, color: "#FFF7E8" }}>
          OrbitOps Demo
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Drawer
        variant="temporary"
        open={isMobileDrawerOpen}
        onClose={closeMobileDrawer}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: {
            xs: "block",
            md: "none",
          },

          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            bgcolor: "#25291E",
            color: "#FFF7E8",
            borderRightColor: "#3B3E2E",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
          width: DRAWER_WIDTH,
          flexShrink: 0,

          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            bgcolor: "#25291E",
            color: "#FFF7E8",
            borderRightColor: "#3B3E2E",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          flexGrow: 1,
        }}
      >
        <Box
          component="header"
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: 64,
            px: {
              xs: 2,
              md: 3,
            },
            borderBottom: "1px solid",
            borderColor: "divider",
            bgcolor: "rgba(255, 251, 243, 0.94)",
            backdropFilter: "blur(12px)",
          }}
        >
          <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
            <IconButton
              aria-label="Open navigation"
              onClick={() => setIsMobileDrawerOpen(true)}
              sx={{
                display: {
                  xs: "inline-flex",
                  md: "none",
                },
              }}
            >
              <MenuRoundedIcon />
            </IconButton>

            <Typography variant="h3">
              {activeNavigationItem?.label ?? "OrbitOps"}
            </Typography>
          </Stack>

          <Stack direction="row" sx={{ alignItems: "center" }} spacing={1.5}>
            <Box
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                },
                textAlign: "right",
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Vadym Topchieiev
              </Typography>

              <Typography variant="caption" color="text.secondary">
                Operations Manager
              </Typography>
            </Box>

            <Avatar
              sx={{
                width: 36,
                height: 36,
                fontSize: 14,
                fontWeight: 600,
                bgcolor: "#DCC9A2",
                color: "#433A2B",
              }}
            >
              VT
            </Avatar>
          </Stack>
        </Box>

        <Box
          component="main"
          sx={{
            width: "100%",
            maxWidth: 1600,
            mx: "auto",
            p: {
              xs: 2,
              sm: 3,
              lg: 4,
            },
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
