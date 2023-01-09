"use client"
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import { useEffect, useState } from 'react';
import axios from "axios";
import { userStore } from '../../stores/UserStore';
import { useQuery, useMutation, useQueryClient } from "react-query"
import IdeaCard from './IdeaCard';


export default function Ideas() {
    const setUser = userStore(state => state.setUser)
    const user = userStore(state => state.user)
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')

    useEffect(() => {
        if (!user)
            axios.get("http://localhost:3000/api/identifier").then(res => setUser(res.data))

    }, []);


    function handleOpen() {
        setOpen(true)
    }

    function handleClose() {
        setOpen(false)
    }

    function handleTitleChange(e) {

        setTitle(e.target.value)

    }

    function handleDescChange(e) {
        setDesc(e.target.value)
    }
    const queryClient = useQueryClient()
    const ideasAddMutation = useMutation((idea) => axios.post(`http://localhost:3000/api/${user}/ideas`, idea),
    {
        onSuccess: () => {
            queryClient.invalidateQueries("ideas")
            handleClose()
        }
    })
    function postIdea() {
        const idea = {
            user: user,
            title: title,
            desc: desc,
            date: `${new Date().toDateString()} - ${new Date().toLocaleTimeString()}`
        }

        ideasAddMutation.mutate(idea)
        setTitle("")
        setDesc("")

    }


    
    return (
        <>

            <Grid container
                alignItems='center'
                justifyContent='center'
                flexDirection='column'>

                <Grid item xs='auto' sx={{ display: open && "none" }}>
                    <Button variant="outlined" sx={{ margin: 2, borderRadius: 3, minWidth: '80px', minHeight: '50px' }}
                        onClick={handleOpen}>
                        <AddIcon />
                    </Button>

                </Grid>
                <Grid item xs='auto' sx={{ display: !open && "none" }}>
                    <Box
                        sx={{ m: 2, padding: 5, width: "100%", height: "40%", border: 1, borderColor: "#E0E0E0", borderRadius: 3, alignItems: "center" }}>
                        <TextField
                            label="Title"
                            id="Title"
                            variant="outlined"
                            fullWidth
                            onChange={handleTitleChange}
                            value={title}
                        />
                        <TextField
                            label="Description"
                            id="Description"
                            variant="outlined"
                            multiline
                            rows={3}
                            fullWidth
                            sx={{ mt: 3 }}
                            onChange={handleDescChange}
                            value={desc}
                        />

                            <Button variant="text" sx={{ borderRadius: 10, minWidth: '50px', minHeight: '50px', color: "red" }}
                                onClick={postIdea}
                                disabled={!title || !desc}
                            >
                                <SaveIcon sx={{ color: "grey" }} />
                            </Button>

                        <Button variant="text" sx={{ borderRadius: 10, minWidth: '50px', minHeight: '50px', color: "red" }}
                            onClick={handleClose}>
                            <CancelIcon sx={{ color: "red" }} />
                        </Button>
                    </Box>


                </Grid>
                <Grid item xs='auto' sx={{ display: open && "none" }}>
                    <IdeaCard user={user} />

                </Grid>


            </Grid>



        </>


    )

}