import { AppBar, Button, Grid, Skeleton, Stack } from "@mui/material";

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

export default function Component() {
  return (
    <Stack spacing={0}>
      <AppBarSkeleton />
      <FiltersSkeleton />
      <PostsSkeleton />
    </Stack>
  );
}
