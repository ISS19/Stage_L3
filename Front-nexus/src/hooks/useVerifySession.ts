import { useEffect } from "react";
import { useRouter } from "next/router";
import { enqueueSnackbar } from "notistack";

const useVerifySession = () => {
  const router = useRouter();

  useEffect(() => {
    
    const protectedRoutes = ["/consulter", "/carte"];

 
    if (protectedRoutes.includes(router.pathname)) {
      const userSession = localStorage.getItem("userSession"); 

      if (!userSession) {
        enqueueSnackbar("Veuillez remplir tous les champs.", {
            variant: "warning",
          });
        router.push("/login");
      }
    }
  }, [router.pathname]);
};

export default useVerifySession;
