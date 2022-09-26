import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Chip, Divider } from "@mui/material";
import UserItem from "./UserItem";
import DMsItem from "./DMsItem";
import GroupItem from "./GroupItem";
import { useDispatch, useSelector } from "react-redux";
import { set1n } from "../../../redux/reducers/handlerReducer";
import messageApi from "../../../api/messageApi";
import { setMessage } from "../../../redux/reducers/messageReduce";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            cursor: "pointer",
          }}
        >
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Tabbar() {
  const [value, setValue] = React.useState(0);

  const users = useSelector((state) => state.user.allUser);
  const user = useSelector((state) => state.user.data);
  const userState = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSelect1N = async (e) => {
    const messageData = await messageApi.get({ from: user._id, to: e._id });
    dispatch(setMessage(messageData));
    dispatch(
      set1n({
        status: true,
        data: e,
      })
    );
  };

  const handleSelectGrounp = () => {
    dispatch(setMessage({}));
    dispatch(
      set1n({
        status: false,
        data: {},
      })
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab
            label={<Chip sx={{ cursor: "pointer" }} label="All" />}
            {...a11yProps(0)}
          />
          <Tab
            label={<Chip sx={{ cursor: "pointer" }} label="DMs" />}
            {...a11yProps(1)}
          />
          <Tab
            label={<Chip sx={{ cursor: "pointer" }} label="Group" />}
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {users.map(
          (user) =>
            userState._id !== user._id && (
              <Box key={user._id} onClick={() => handleSelect1N(user)}>
                <UserItem {...user} />
                <Divider />
              </Box>
            )
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DMsItem />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Box onClick={handleSelectGrounp}>
          <GroupItem />
        </Box>
      </TabPanel>
    </Box>
  );
}
