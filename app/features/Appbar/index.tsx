"use client";

import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { Logout, PersonRounded, SendRounded } from "@mui/icons-material";
import authActions from "@/app/auth/utils";
import { useRouter } from "next/navigation";
import { isValidToken } from "@/app/lib/verifyToken";
import useToast from "../Toasts";
import useAuth from "@/app/lib/auth/AuthContextProvider";
import { delays } from "@/app/config";

const Component = () => {
  const router = useRouter();
  const { sendSuccess } = useToast();
  const { isLoggedIn, handleIsLoggedIn, currUser } = useAuth();
  const { logout, removeTokens } = authActions();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout()
      .then((res) => {
        sendSuccess("See you again!");
        setTimeout(() => {
          removeTokens();
          handleIsLoggedIn(false);
          router.refresh();
        }, delays.auth);
      })
      .catch((e) => console.error(e));
  };

  return (
    <AppBar color="transparent" position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <SendRounded sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              fontFamily: "Major Mono Display",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              flexGrow: 1,
              textDecoration: "none",
            }}
          >
            PAPERS
          </Typography>
          {!isLoggedIn ? (
            <Box>
              <Button onClick={() => router.push("/auth/login")} variant="text">
                Sign in!
              </Button>
            </Box>
          ) : (
            <Box>
              <Tooltip title="user menu">
                <Button
                  id="user-menu-button"
                  onClick={handleOpenUserMenu}
                  aria-controls={
                    Boolean(anchorElUser) ? "user-options" : undefined
                  }
                  aria-haspopup={Boolean(anchorElUser) ? true : undefined}
                  aria-expanded={Boolean(anchorElUser) ? true : undefined}
                  startIcon={<PersonRounded color="action"/>}
                >
                  {currUser?.username}
                </Button>
              </Tooltip>
              <Menu
                id="user-options"
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                MenuListProps={{
                  "aria-labelledby": "user-menu-button",
                }}
              >
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Component;
