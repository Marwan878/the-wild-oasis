import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";

import { useForm } from "react-hook-form";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({
  cabinToEdit: { id: editId, ...editEntries } = {},
  onCloseModal,
}) {
  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    reset: resetForm,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession ? editEntries : {},
  });

  const { createCabin, isCreating } = useCreateCabin();
  const { editCabin, isEditing } = useEditCabin();
  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession) {
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            resetForm();
            onCloseModal?.();
          },
        }
      );
    } else {
      createCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            resetForm();
            onCloseModal?.();
          },
        }
      );
    }
  }

  function onError(error) {
    console.log(error);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "This field is required" })}
          disabled={isWorking}
        />
      </FormRow>
      <FormRow label="Max capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: { value: 1, message: "Capacity should be at least 1" },
          })}
          disabled={isWorking}
        />
      </FormRow>
      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: { value: 1, message: "Price should be at least 1" },
          })}
          disabled={isWorking}
        />
      </FormRow>
      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            min: { value: 0, message: "Discount can't be negative" },
            validate: (discount) =>
              discount <= getValues().regularPrice ||
              "Discount should be less than or equal the regular price",
          })}
          disabled={isWorking}
        />
      </FormRow>
      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          type="text"
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
          disabled={isWorking}
        />
      </FormRow>
      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          disabled={isWorking}
          {...register("image")}
        />
      </FormRow>
      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Create a new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
