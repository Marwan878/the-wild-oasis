import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate: deleteBooking, isLoading: isDeleting } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      toast.success("Cabin has been successfully deleted");
      queryClient.invalidateQueries({ active: true });
    },
    onError: (error) => toast.error(error.message),
  });

  return { deleteBooking, isDeleting };
}

export default useDeleteBooking;
