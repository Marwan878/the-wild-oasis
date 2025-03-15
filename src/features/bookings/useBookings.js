import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { MAX_NUMBER_OF_ITEMS_PER_PAGE } from "../../utils/constants";

function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("status");
  const filterOptions =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // PAGINATION
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const {
    data: { data: bookings, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", filterOptions, sortBy, page],
    queryFn: () => getBookings(filterOptions, sortBy, page),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count / MAX_NUMBER_OF_ITEMS_PER_PAGE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterOptions, sortBy, page + 1],
      queryFn: () => getBookings(filterOptions, sortBy, page + 1),
    });

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterOptions, sortBy, page - 1],
      queryFn: () => getBookings(filterOptions, sortBy, page - 1),
    });
  }

  return { bookings, isLoading, error, count };
}

export default useBookings;
