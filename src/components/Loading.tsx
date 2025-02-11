import LinearProgress from '@mui/material/LinearProgress';
import { Box } from "@mui/material";


const Loading = () => {
  return (
    <Box sx={{ width: '100%', position: 'fixed', top: 0, left: 0, zIndex: 100 }}>
    <LinearProgress />
  </Box>
  )
}

export default Loading
