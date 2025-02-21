import { Box, IconButton } from '@mui/material'
import GoogleIcon from '../assets/google.png'
export default function Google() {
    return (
        <Box>
            <IconButton
                size="large"
                onClick={() =>  window.location.href = `${import.meta.env.VITE_BASE_BACK_URL}social/google`}
            >
                <img src={GoogleIcon} width={40} />
            </IconButton>
        </Box>
    )
}
