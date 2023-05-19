import type { Actions } from "./$types";

export const actions: Actions = {
  default: async ({ request }) => {
    // TODO: implement
    console.log(request)
    return {
      props: {
        email: request.locals.email,
      },
      some: "page data from signin"
    };
  }
} satisfies Actions;
