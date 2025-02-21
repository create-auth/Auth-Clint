import { Box, IconButton } from '@mui/material'
import FaceBookIcon from '../assets/facebook.jpeg'
export default function FaceBook() {
    return (
        <Box>
            <IconButton
                size="large"
                onClick={() =>  window.location.href = `${import.meta.env.VITE_BASE_BACK_URL}social/facebook`}
            >
                <img src={FaceBookIcon} width={40} />
            </IconButton>
        </Box>
    )
}
