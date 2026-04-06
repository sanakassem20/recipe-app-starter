import { supabase } from "../lib/supabaseClient";

export async function getFavoritesByUser(userId: string) {
  return await supabase
    .from("favorites")
    .select("*")
    .eq("user_id", userId);
}

export async function addFavorite(userId: string, recipeId: number) {
  return await supabase
    .from("favorites")
    .insert([{ user_id: userId, recipe_id: recipeId }]);
}

export async function removeFavorite(userId: string, recipeId: number) {
  return await supabase
    .from("favorites")
    .delete()
    .eq("user_id", userId)
    .eq("recipe_id", recipeId);
}
