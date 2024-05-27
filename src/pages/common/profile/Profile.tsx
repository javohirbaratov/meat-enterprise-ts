import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import React from "react";
import { IUser } from "../../../app/services/auth/auth";
import { useTypedSelector } from "../../../app/store";
import PageTitle from "../../../components/common/ui/typography/pageTitle/PageTitle";
import { logout, selectedUser } from "../../../features/auth/authSlice";
import { useDispatch } from "react-redux";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: 8,
}));

const Profile: React.FC = () => {
  // Dispatch
  const dispatch = useDispatch()
  
  // User
  const { ism, familya } = useTypedSelector<IUser>(selectedUser);

  // handle logout
  const handleLogout = () => dispatch(logout())
  
  return (
    <div>
      <Stack justifyContent={"center"} alignItems={"center"}>
        <Avatar
          sx={{ bgcolor: deepPurple[500], width: 100, height: 100 }}
          sizes="100px"
        >
          <Typography variant="h3" component="div">
            {familya.slice(0, 1)}
            {ism.slice(0, 1)}
          </Typography>
        </Avatar>
      </Stack>

      <PageTitle title="Kabinet" />
      <Stack justifyContent={'space-between'} height={'calc(100vh - 300px)'}>
        <Demo>
          <List>
            <ListItem>
              <ListItemText primary={ism} />
            </ListItem>
            <ListItem>
              <ListItemText primary={familya} />
            </ListItem>
          </List>
        </Demo>

        <Demo>
          <Button color="error" variant="contained" fullWidth onClick={handleLogout}>
            Chiqish
          </Button>
        </Demo>
      </Stack>
    </div>
  );
};

export default Profile;
