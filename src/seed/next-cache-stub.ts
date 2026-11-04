// Stand-in for 'next/cache' in the bundled seed script (see Dockerfile): the seed runs outside
// Next.js and turns page revalidation off anyway, and the standalone build has no next/cache.js.
export const revalidatePath = () => {}
