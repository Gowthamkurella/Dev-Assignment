import { AppBar, Avatar, Toolbar } from "@mui/material";
const Navbar = () => (
  <>
    <style>
      {` @import url('https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&display=swap');`}
    </style>
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#FFFFFF",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", paddingX: 2 }}>
        <img
          src={`${process.env.PUBLIC_URL}/navimg.png`}
          alt="Starlight Surveyor"
          style={{ height: "50px" }}
        />
        <Avatar
          alt="User Avatar"
          src={`${process.env.PUBLIC_URL}/avatar.png`}
        />
      </Toolbar>
    </AppBar>
  </>
);

export default Navbar;
