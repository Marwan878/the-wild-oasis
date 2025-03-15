import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isLoading: isLogingIn } = useMutation({
    mutationFn: loginApi,
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      navigate("/dashboard", { replace: true });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isLogingIn };
}
