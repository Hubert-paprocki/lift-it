import { useEffect } from "react";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";

const useRedirectOnUserLogged = () => {
  const router = useRouter();
  const { user, loading } = useUserContext();

  useEffect(() => {
    if (!loading) {
      if (user) {
        console.log(user.uid);
        router.push(`/user/${user.uid}`);
      } else {
        router.push(`/welcome`);
      }
    }
  }, [user, loading, router]);

  return { user, loading };
};

export default useRedirectOnUserLogged;