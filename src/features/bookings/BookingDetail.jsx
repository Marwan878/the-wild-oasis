import styled from "styled-components";

import { useMoveBack } from "../../hooks/useMoveBack";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";
import Heading from "../../ui/Heading";
import Modal from "../../ui/Modal";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import Tag from "../../ui/Tag";
import BookingDataBox from "./BookingDataBox";

import { HiArrowUpOnSquare, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import useBooking from "./useBooking";
import useDeleteBooking from "./useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

const statusToTagName = {
  unconfirmed: "blue",
  "checked-in": "green",
  "checked-out": "silver",
};

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const { checkout, isCheckingOut } = useCheckout();
  const { isDeleting, deleteBooking } = useDeleteBooking();
  const navigate = useNavigate();
  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;

  if (booking === undefined) return <Empty resource="booking" />;

  const { id: bookingId, status } = booking;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      <Modal>
        <ButtonGroup>
          <Modal.Open opens={"delete"}>
            <Button variation="danger" disabled={isDeleting} icon={<HiTrash />}>
              Delete booking
            </Button>
          </Modal.Open>
          {status === "unconfirmed" && (
            <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
              Check in
            </Button>
          )}
          {status === "checked-in" && (
            <Button
              icon={<HiArrowUpOnSquare />}
              onClick={() => checkout(bookingId)}
              disabled={isCheckingOut}
            >
              Check out
            </Button>
          )}
          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>
        </ButtonGroup>
        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName={"booking"}
            onConfirm={() =>
              deleteBooking(bookingId, {
                onSuccess: moveBack,
              })
            }
            disabled={isDeleting}
          />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default BookingDetail;
