import { deleteImage } from "./storageService";
import { supabase } from "../lib/supabaseClient";
import type { NewRecipe } from "../types/recipe";


export async function createRecipe(recipe: NewRecipe) {
  return await supabase.from("recipes").insert([recipe]);
}

// Get all recipes for the public dashboard
export async function getAllRecipes() {
  return await supabase
    .from("recipes")
    .select("*")
    .order("created_at", { ascending: false });
}

export async function updateRecipe(recipeId: number, updatedRecipe: Partial<NewRecipe>) {
  return await supabase
    .from("recipes")
    .update(updatedRecipe)
    .eq("id", recipeId);
}

export async function deleteRecipe(recipeId: number) {
  const { data: recipe } = await supabase
    .from("recipes")
    .select("image_path")
    .eq("id", recipeId)
    .single();

  if (recipe && recipe.image_path) {
    try {
      await deleteImage(recipe.image_path);
    } catch (e) {
      console.error("Failed to delete image", e);
    }
  }

  return await supabase
    .from("recipes")
    .delete()
    .eq("id", recipeId);
}