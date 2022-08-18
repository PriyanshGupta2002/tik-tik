import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: 'gf086dft',
  dataset: 'production',
  apiVersion: '2022-03-10',
  useCdn:process.env.NODE_ENV==="production",
  token: process.env.NEXT_PUBLIC__SANITY_TOKEN,
});
