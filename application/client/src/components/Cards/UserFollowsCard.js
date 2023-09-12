import * as React from 'react';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { spacing } from '@mui/system';
import Box from '@mui/material/Box';
import { palette } from '@mui/system';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function UserFollowsCard({data}) {
    console.log('in userfollowingCard: ', data)    

    return (
       <>
            <Container style={{ maxWidth: '80%' }}> 
                <Row style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}> 
                    {data?.users?.map(user => (
                        <Col> 
                            <Card
                                style={{
                                    width: '100%',
                                    margin: '20px 0',
                                    padding: '0px',
                                }}
                            >
                                <Row style={{ padding: '20px' }}>
                                    {/* Title and number of hearts */}
                                    <Col xs={7} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Avatar alt='profile_picture' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} src={user.profile_picture}/>
                                    </Col>
                                    <Col md={5} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{user.username}</Typography>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
       </>
    );
}

export default UserFollowsCard;