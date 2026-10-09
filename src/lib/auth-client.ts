// Browser-side helpers for login, register, logout and reading the session.
import { createAuthClient } from "better-auth/react";

export const { signIn, signUp, signOut, useSession } = createAuthClient();
