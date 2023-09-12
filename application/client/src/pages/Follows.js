import React, {useEffect, useState} from 'react'
import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { spacing } from '@mui/system';

import UserFollowsCard from "../components/Cards/UserFollowsCard";
import ProfileCard from '../components/ProfileCard/ProfileCard';
// import components


function Follows() {
    const { userID } = useParams();
    const [followingRes, setFollowingRes] = useState([]);
    const [followersRes, setFollowersRes] = useState([]);
    const [value, setValue] = useState(0);
    const [gottenData, setGottenData] = useState(false);

    useEffect(() => {
        const fetchResults = async () => {
          try {
            const followersRes = await fetch(`${process.env.REACT_APP_REQ_URL}/user/followers/${userID}`);
            const followingRes = await fetch(`${process.env.REACT_APP_REQ_URL}/user/following/${userID}`);

            const followersData = await followersRes.json();
            const followingData = await followingRes.json();
    
            if (followingRes.ok && followingRes.ok) {
                setFollowingRes(followingData);
                setFollowersRes(followersData);
                console.log("followersData " +JSON.stringify(followingData.users));
                setGottenData(true);
              } else {
                console.log('bad request');
              }
          } catch (err) {
            console.error(err.message);
          }
        };
    
        fetchResults();
      }, [userID]);

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
              <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-around' }}>
                <Typography>{children}</Typography>
              </Box>
            )}
          </div>
        );
      }

      function a11yProps(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      }

      const handleChange = (event, newValue) => {
        setValue(newValue);
      };
      
  return (
    <>
      <Box>
        {/* <UserFollowsCard/> */}
        {/* <ProfileCard /> */}
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-around'}}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Following" {...a11yProps(1)} />
              <Tab label="Followers" {...a11yProps(0)} />
            </Tabs>
          </Box>
          <Box sx={{ ml: '20%', mr: '20%'}}>
            <TabPanel value={value} index={1}>
              {/* followers */}
              {followersRes ?
                  <>
                    <UserFollowsCard data={followersRes}/>
                  </>
                : 
                  <>
                    <h4>You are not following any users.</h4>
                  </>
              }
            </TabPanel>
            <TabPanel value={value} index={0}>
              {/* following */}
              {followingRes ?
                  <>
                    <UserFollowsCard data={followingRes}/>
                  </>
                : 
                  <>
                    <h4>You are not following any users.</h4>
                  </>
              }
            </TabPanel>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Follows