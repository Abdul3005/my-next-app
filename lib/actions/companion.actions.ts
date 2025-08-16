'use server';
import { createsupabaseClient } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";

export const createCompanion = async (FormData: CreateCompanion) => {
  try {
    const { userId: author } = await auth();
    const supabase = createsupabaseClient();

    // Test connection first
    const { error: testError } = await supabase
      .from('companions')
      .select('*')
      .limit(0);
    
    if (testError) throw testError;

    // Main query
   const { data,error } = await supabase
  .from('companions')
  .insert({ author: "test", name: "Test Companion" })
  .select();

    if (error ) throw error;
    return data[0];

  } catch (error: any) {
    console.error("Full Supabase Error:", {
      message: error.message,
      code: error.code,
      details: error.details
    });
    throw new Error(error.message || "Failed to create companion. Check logs for details.");
  }

};