import React, {useEffect} from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import {Container, ListItemButton} from "@mui/material";
import {useAppDispatch, useAppSelector, useDebounce} from "../../../utils/hooks";
import {getUsersTC} from "../../../store/reducers/users-reducer";
import {UsersPagination} from "./usersPagination/UsersPagination";
import {UserSearch} from "./UserSearch/UserSearch";
import {Navigate, useNavigate} from "react-router-dom";
import {LOGIN} from "../../routing/Routing";


export const Users = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    const page = useAppSelector(state => state.users.page)
    const pageCount = useAppSelector(state => state.users.pageCount)
    const userName = useAppSelector(state => state.users.userName)
    const debouncedUserName = useDebounce(userName)
    const users = useAppSelector(state => state.users.users)
    useEffect(() => {
        dispatch(getUsersTC())
    }, [page, pageCount, debouncedUserName,dispatch])

    if (!isLoggedIn) {
        return <Navigate to={LOGIN}/>
    }

    return (
        <Container style={{marginTop: "20px", marginBottom: "50px"}} maxWidth={"md"}>
            <UserSearch/>
            {users.map(user => {
                return <List key={user._id} sx={{width: '100%', bgcolor: 'background.paper'}}>
                    <ListItemButton onClick={()=>{navigate(`${user._id}`)}} alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar src={user.avatar}/>
                        </ListItemAvatar>
                        <ListItemText
                            primary={user.name}
                            secondary={
                                <>Packs count: {user.publicCardPacksCount}</>
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

