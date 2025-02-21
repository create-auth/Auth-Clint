import { Box, IconButton } from '@mui/material'
import GitHubIcon from '../assets/GitHub.png'
export default function GitHub() {
    return (
        <Box>
            <IconButton
                size="large"
                onClick={() =>  window.location.href = `${import.meta.env.VITE_BASE_BACK_URL}social/github`}
            >
                <img src={GitHubIcon} width={40} />
            </IconButton>
        </Box>
    )
}
