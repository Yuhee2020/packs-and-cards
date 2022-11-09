import React, {useEffect} from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {Container, ListItemButton} from "@mui/material";
import {useAppDispatch, useAppSelector, useDebounce} from "../../../utils/hooks";
import {getUsersTC} from "../../../store/reducers/users-reducer";
import {UsersPagination} from "./usersPagination/UsersPagination";
import {UserSearch} from "./UserSearch/UserSearch";


export const Users = () => {

    const dispatch = useAppDispatch();
    const page=useAppSelector(state =>state.users.page)
    const pageCount=useAppSelector(state =>state.users.pageCount)
    const userName=useAppSelector(state => state.users.userName)
    const debouncedUserName=useDebounce(userName)
    const users=useAppSelector(state => state.users.users)
    useEffect(() => {
        dispatch(getUsersTC())
    }, [page, pageCount, debouncedUserName])

    return (
        <Container style={{marginTop:"20px", marginBottom:"50px"}} maxWidth={"md"}>
            <UserSearch/>
            {users.map(user=>{
                return <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                    <ListItemButton alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar src={user.avatar}/>
                        </ListItemAvatar>
                        <ListItemText
                            primary={user.name}
                            secondary={<>
                                <div>{user.email}</div>
                                <div>Packs count: {user.publicCardPacksCount}</div>
                            </>
                            }
                        />
                    </ListItemButton>
                    <Divider variant="inset" component="li"/>
                </List>
            })}
          <UsersPagination/>
        </Container>
    )

};

