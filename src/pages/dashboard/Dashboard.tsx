import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';

import { UsersService } from '../../shared/services/api/users/UsersService';
import { ListsComponent } from '../../shared/components';
import { BaseLayout } from '../../shared/layouts';

export const Dashboard = () => {
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [countUsers, setCountUsers] = useState(0);

  useEffect(() => {
    setIsLoadingUsers(true);

    UsersService.getAll(1)
      .then((result) => {
        setIsLoadingUsers(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          setCountUsers(result.count);
        }
      });
  }, []);

  return (
    <BaseLayout
      title='Home'
      toolbar={<ListsComponent showNewButton={false} />}
    >
      <Box width='100%' display='flex'>
        <Grid container margin={2}>
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card style={{height:'100%'}}>
                <CardContent>
                  <Typography variant='h5' align='center' marginTop={3}>
                    Users
                  </Typography>

                  <Box padding={3} display='flex' justifyContent='center' alignItems='center'>
                    {!isLoadingUsers && (
                      <Typography variant='h1'>
                        {countUsers}
                      </Typography>
                    )}
                    {isLoadingUsers && (
                      <Typography variant='h6'>
                        Loading...
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

          </Grid>
        </Grid>
      </Box>
    </BaseLayout>
  );
};
