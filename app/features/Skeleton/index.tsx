import {
  AppBar,
  Button,
  Container,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

export const AppBarSkeleton = () => {
  return <Skeleton variant="rectangular" height={100} />;
};

export const FiltersSkeleton = () => {
  return (
    <Skeleton sx={{ mt: 4 }} variant="rectangular" height={70} width={200} />
  );
};

export const PostsSkeleton = () => {
  return (
    <>
      <Skeleton sx={{ my: 4 }} variant="rectangular" height={300} />
      <Grid
        mt={2}
        container
        spacing={{
          xs: 2,
          sm: 1,
        }}
      >
        {["item1", "item2", "item3"].map((item) => (
          <Grid key={item} item xs={12} sm={6} md={4}>
            <Skeleton variant="rectangular" height={250} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export const ViewSkeleton = () => {
  return (
    <Container maxWidth="md" disableGutters>
      <Stack spacing={2} mt={2} p={2}>
        <Skeleton variant="rectangular" height={100} />
        <Grid container justifyContent="space-between">
          <Grid item>
            <Skeleton
              sx={{ mb: 2 }}
              variant="rectangular"
              width={100}
              height={50}
            />
          </Grid>
          <Grid item>
            <Stack direction="row" spacing={1}>
              {["item1", "item2", "item3"].map((item) => (
                <Skeleton
                  key={item}
                  sx={{ mb: 2 }}
                  variant="circular"
                  width={50}
                  height={50}
                />
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Typography variant="body1">
          <Skeleton variant="rectangular" height={500} />
        </Typography>
      </Stack>
    </Container>
  );
};

export default function Component() {
  return (
    <Stack spacing={0}>
      <AppBarSkeleton />
      <FiltersSkeleton />
      <PostsSkeleton />
    </Stack>
  );
}
