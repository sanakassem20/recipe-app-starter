import { supabase } from "../lib/supabaseClient";

const BUCKET = "recipe-images";
 
export const uploadImage = async (file: File, userId: string) => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${userId}-${Date.now()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .upload(fileName, file);

  if (error) throw error;

  return data.path;
}; 
export const getImageUrl = (path: string) => {
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
};
 
export const deleteImage = async (path: string) => {
  const { error } = await supabase.storage
    .from(BUCKET)
    .remove([path]);

  if (error) throw error;
};