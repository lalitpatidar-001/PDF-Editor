import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Slide } from '@mui/material';

const ConfirmDialog = ({openDialog ,setOpenDialog}) => {

    const handleClose = () => {
        setOpenDialog(false);
    };

    const Transition = React.forwardRef(function Transition(
        props: TransitionProps & {
            children: React.ReactElement<any, any>;
        },
        ref: React.Ref<unknown>,
    ) {
        return <Slide direction="up" ref={ref} {...props} />;
    });
    return (
        <div>
            <Dialog
                open={openDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle className='text-blue-600'>Instruction</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <div className='flex flex-col gap-2'>
                            <span className='text-xl text-black'>How extracted pdf will be arrange?</span>
                            <div className='flex flex-col gap-2'>
                                <span><h1 className='font-bold'>1. Arrange manualy-</h1>pages will arrange in order of your selection</span>
                                <span><h1 className='font-bold'>2. Arrange In Order-</h1>pages will arrange in order of their sequence</span>
                            </div>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ConfirmDialog