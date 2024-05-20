import {
  AppBar,
  Box,
  Button,
  Card,
  Container,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import useSWR from "swr";
import { fetcher } from "@/app/lib/fetcher";
import { PersonRounded, SendRounded } from "@mui/icons-material";
import authActions from "@/app/auth/utils";
import { useRouter } from "next/navigation";

const Component = () => {
  const router = useRouter();
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

  // const { data: user } = useSWR("/auth/users/me", fetcher);

  const handleLogout = () => {
    logout().then((res) => {
      removeTokens();
      console.log("logged out successfully");
      router.push('/auth/login');
    }).catch((e) => console.error(e))
  }

  return (
    <AppBar color="transparent">
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
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              flexGrow: 1,
              textDecoration: "none",
            }}
          >
            PAPERS
          </Typography>
          {/* Render mobile view  */}
          <Box>
            <Tooltip title="user settings">
              <IconButton onClick={handleOpenUserMenu}>
                <PersonRounded />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem>
                <Button onClick={handleLogout} color="error">Disconnect</Button>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Component;