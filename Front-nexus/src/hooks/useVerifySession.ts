import { useEffect } from "react";
import { useRouter } from "next/router";
import { enqueueSnackbar } from "notistack";

const useVerifySession = () => {
  const router = useRouter();

  useEffect(() => {
    const protectedRoutes = ["/consulter", "/carte"];

    if (protectedRoutes.includes(router.pathname)) {
      const userSession = localStorage.getItem("user");

      if (!userSession) {
        enqueueSnackbar("Veuillez vous connectez d'abord", {
          variant: "warning",
        });
        router.push("/login");
      }
    }
  }, [router.pathname]);
};

export default useVerifySession;
