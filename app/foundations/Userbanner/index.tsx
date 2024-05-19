import { Card } from '@mui/material'
import React from 'react'
import useSWR from 'swr'
import { fetcher } from '@/app/lib/fetcher';

const Component = () => {

  const { data: user } = useSWR('/auth/users/me', fetcher) 
  console.log(user);
  return (
    <Card>
      Hello User
    </Card>
  )
}

export default Component