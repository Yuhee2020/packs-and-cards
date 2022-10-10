import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {IconButton, Stack} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {ReactNode} from "react";

type PropsType = {
    title: string
    children: ReactNode
    button: ReactNode
    open: boolean,
    handleOpen: () => void
    handleClose: () => void
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    padding: 'none',
}

export const BasicModal = ({title, children, button, open, ...props}: PropsType) => {


    return (
        <div>
            <button style={{background: 'none', border: 'none', margin: '0px', padding: '0px'}} onClick={props.handleOpen}>
                {button}
            </button>
            <Modal
                open={open}
                onClose={props.handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack direction="row" spacing={2} alignItems={'center'}
                           justifyContent={'space-between'} borderBottom={'1px solid #D9D9D9'}
                           marginBottom={'16px'} padding={'6px'}>
                        <Typography id="modal-modal-title" variant="h5" component="h2" fontWeight={'bold'}
                                    justifyContent={'center'} marginLeft={'8px'}>
                            {title}
                        </Typography>
                        <IconButton onClick={props.handleClose} style={{padding: 'none'}}>
                            <CloseIcon/>
                        </IconButton>
                    </Stack>
                    <div style={{margin: '0 8px 38px 8px', padding: '6px'}}>
                        {children}
                    </div>
                </Box>
            </Modal>
        </div>
    )
}