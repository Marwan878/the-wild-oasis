import supabase, { SUPABASE_URL } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded.");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const imageIsInDB = newCabin.image?.startsWith?.(SUPABASE_URL);

  const imageName = `${Math.random()}-${newCabin.image?.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = imageIsInDB
    ? newCabin.image
    : `${SUPABASE_URL}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  } else {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be upserted.");
  }

  if (imageIsInDB) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin upserted but image could not be uploaded, attempting to delete the cabin..."
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted.");
  }
}
