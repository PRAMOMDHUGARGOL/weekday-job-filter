import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function ResponsiveAppBar({ showBackToTop }) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleBackToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}
        >
          <Typography
            variant="h6"
            noWrap
            component="a"
            // href="#"
            sx={{
              mr: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Weekday.
          </Typography>
        </Typography>

        {showBackToTop && (
          <button
            className="back-to-top"
            onClick={handleBackToTop}
            style={{
              display: "flex", // Make the button a flex container
              alignItems: "center", // Center align items vertically
              padding: "10px", // Adjust padding as needed
              backgroundColor: "white", // Button background color
              color: "black", // Text color
              border: "none", // No border
              cursor: "pointer", // Cursor pointer on hover
            }}
          >
            <KeyboardArrowUpIcon />
            <span style={{ marginLeft: "5px" }}>Back to Top</span>
          </button>
        )}

        <Tooltip title="Open settings">
          <Button onClick={handleOpenUserMenu} sx={{ p: 0, color: "inherit" }}>
            <Avatar alt="Jobs" src="/static/images/avatar/2.jpg" />
          </Button>
        </Tooltip>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>
          <MenuItem onClick={handleCloseUserMenu}>Account</MenuItem>
          <MenuItem onClick={handleCloseUserMenu}>Dashboard</MenuItem>
          <MenuItem onClick={handleCloseUserMenu}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default ResponsiveAppBar;
