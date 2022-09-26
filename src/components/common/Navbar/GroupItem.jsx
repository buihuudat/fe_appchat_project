import { Avatar, Box, Paper, Typography } from '@mui/material'
import React from 'react'

const GroupItem = () => {
  return (
    <Box>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'start',
          gap: 2,
          alignItems: 'center',
          p: 1
        }}
      >
        <Avatar />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography variant=''h5>Fullname</Typography>
          <Typography variant='body2'>Text Content</Typography>
        </Box>
      </Paper>
    </Box>
  )
}

export default GroupItem