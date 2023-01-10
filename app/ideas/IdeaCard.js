"use client"
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useQuery, useMutation, useQueryClient } from "react-query"
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';

export default function IdeaCard({ user }) {
    const port = env.port
    const ideas = useQuery(['ideas', user], () => axios.get(`sulafa1907099-asn04-39ar740ud-sulafa-sa1907099/${user}/ideas`))
    const queryClient = useQueryClient()

    const ideasDeleteMutation = useMutation((id) => axios.delete(`sulafa1907099-asn04-39ar740ud-sulafa-sa1907099/${user}/ideas?id=${id}`),
        {
            onSuccess: () => {
                queryClient.invalidateQueries("ideas")
            }
        })




    return (
        <>
            {ideas.isLoading ? <CircularProgress /> :
                ideas.data?.data.map((idea, i) =>
                    <Box key={i} sx={{ minWidth: 800 }}>
                        <Card variant="outlined" sx={{ margin: 2 }}>
                            <CardContent>
                                <Typography sx={{ m: 0.5}} variant="h5" component="div">
                                    {idea.title}
                                </Typography>
                                <Typography variant="body1" sx={{margin: 0.5}} color="text.secondary">
                                    {idea.desc}
                                </Typography>
                                <Typography variant="body2" sx={{ m: 0.5, fontSize:13}} color="text.secondary">
                                    {idea.date}
                                </Typography>
                                <Button variant="text" sx={{ borderRadius: 10, minWidth: '50px', minHeight: '50px', color: "red" }}>
                                    <DeleteIcon sx={{ color: "red",  minWidth: '25px', minHeight: '30px' }} onClick={()=>ideasDeleteMutation.mutate(idea.id)}/>
                                </Button>
                            </CardContent>
                        </Card>
                    </Box>)}

        </>

    )

}
