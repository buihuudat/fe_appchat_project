import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setAddChat } from "../../../redux/reducers/handlerReducer";
import { Avatar, Chip, Divider, TextField } from "@mui/material";
import _ from "lodash";
import messageApi from "../../../api/messageApi";
import { setGroup } from "../../../redux/reducers/groupReducer";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddChat() {
  const open = useSelector((state) => state.handler.addChat);
  const users = useSelector((state) => state.user.allUser);
  const userState = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const [name, setName] = React.useState("");

  let userAssign = [...users];

  const handleClose = () => {
    dispatch(setAddChat(false));
  };

  const [ids, setIds] = React.useState([]);
  const UserItem = ({ props }) => {
    const handleSelect = (e) => {
      if (
        _.find(ids, {
          id: e._id,
        })
      )
        return;
      setIds([
        ...ids,
        {
          name: e.fullname,
          id: e._id,
        },
      ]);
    };
    return (
      <Box
        component={Button}
        fullWidth
        onClick={() => handleSelect(props)}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 2,
          alignItems: "center",
          p: 1,
          pt: 3,
        }}
      >
        <Avatar alt={props.fullname} src={props.avatar} />
        <Typography variant="h5">{props.fullname}</Typography>
      </Box>
    );
  };

  const handleCreate = async () => {
    const data = {
      groupName: name,
      from: userState._id,
      to: ids,
      group: true,
      message: {
        text: "",
      },
    };
    console.log(data);
    const userGr = await messageApi.add(data);
    console.log(userGr);
    dispatch(setGroup(userGr));
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              pb: 3,
            }}
          >
            <TextField
              placeholder="Group name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button
              onClick={handleCreate}
              size="large"
              sx={{
                height: "100%",
              }}
            >
              Create
            </Button>
          </Box>
          <Box>
            {ids?.map((id) => (
              <Chip key={id.id} label={id.name} />
            ))}
          </Box>
          <Divider>
            <Chip label="List" />
          </Divider>
          <Box
            bt={3}
            sx={{
              maxHeight: 800,
              overflowY: "auto",
            }}
          >
            {userAssign?.map((user) => {
              if (user._id !== userState._id) {
                return <UserItem key={user._id} props={user} />;
              }
            })}
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
