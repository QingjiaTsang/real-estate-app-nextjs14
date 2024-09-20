import { createClient } from "@supabase/supabase-js";
import { randomUUID } from "crypto";

export async function uploadAvatar(image: File): Promise<string | null> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("Supabase URL or key is missing");
    return null;
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // const { data, error } = await supabase.storage
    //   .from("avatars")
    //   .upload(`${image.name}_${Date.now()}`, image);
    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(`${randomUUID()}_${Date.now()}`, image);

    if (error) {
      /*
      Note:
      it'll cause the following error, if the file name contains non-ASCII characters like Chinese, Japanese, etc.:
      Error uploading avatar: {
        statusCode: '400',
        error: 'InvalidKey',
        message: 'Invalid key: æ\x9E\x81ä¹\x90å¤§å\x8E¦æ\x8F­å¹\x95 Inauguration of the Pleasure Dome_109951165622764592.jpg_1726828190415'
      }

      because S3 bucket follows the AWS S3 naming standard, so we need to generate a random UUID as the file name
      */
      console.error("Error uploading avatar:", error);
      return null;
    }

    if (!data) {
      console.error("No data returned from upload");
      return null;
    }

    console.log("Upload successful:", data);

    const { data: urlData } = await supabase.storage
      .from("avatars")
      .getPublicUrl(data.path);

    return urlData.publicUrl;
  } catch (error) {
    console.error("Unexpected error during avatar upload:", error);
    return null;
  }
}

