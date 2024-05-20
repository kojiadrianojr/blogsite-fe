import { Card, Typography } from '@mui/material'
import React from 'react'
import useSWR from 'swr'
import { fetcher } from '@/app/lib/fetcher';

const Component = () => {

  const { data: user } = useSWR('/auth/users/me', fetcher) 
  return (
    <Card square>
      <Typography>Hello {user?.username}</Typography>
    </Card>
  )
}

export default Component