"use client";
import useRedirectOnUserLogged from "@/customHooks/useRedirectOnUserLogged";

export default function Home() {
  const { user, loading } = useRedirectOnUserLogged();

  return <div></div>;
}
