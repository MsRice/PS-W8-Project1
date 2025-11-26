
const BITLY_ACCESS_TOKEN = "19cc0ac42c6a1bc852e896de107edfb3d534a64a"; // Get this from your Bitly developer settings
// console.log(BITLY_ACCESS_TOKEN)
// Interface for the data sent in the request body
interface ShortenRequest {
  long_url: string;
  domain?: string; // Optional: defaults to "bit.ly"
  group_guid?: string; // Optional: specify a group GUID
}

// Interface for the successful response from the Bitly API
interface BitlinkResponse {
  link: string; // The resulting shortened URL
  id: string;
  long_url: string;
  // ... other fields like "created_at", "custom_bitlinks", "tags", etc.
}

// Interface for a potential error response (optional, but good practice)
interface ErrorResponse {
  code: number;
  message: string;
  errors: any[];
}


export async function shortenUrl(longUrl: string): Promise<string> {
  const apiUrl = "https://api-ssl.bitly.com/v4/shorten";
  const requestBody: ShortenRequest = {
    long_url: longUrl,
    domain: "bit.ly"
    // group_guid: "Ba1bc23dE4F"
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${BITLY_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    let shortURL = await response.json() 
    return shortURL
    // if (!response) {
    //   const errorData: ErrorResponse = await response.json();
    //   console.error("API error:", errorData.message);
    //   throw new Error(`Failed to shorten URL: ${errorData.message || response.statusText}`);
    // }

    // // Explicitly type the JSON response
    // const data: BitlinkResponse = await response.json();
    // return data.link; // Return the shortened link
    
  } catch (error) {
    console.error("Error shortening URL:", error);
    throw error; // Re-throw the error for the caller to handle
  }
}


export async function builder(long_url: string):  Promise<(url :string)=> string> {
   
  const shortUrlResponse: string | null = await shortenUrl(long_url)
  
  return shortUrlResponse?.link 
  
  
}

// builder('https://www.fanfiction.net/s/14471872/1/Harry-Potter-The-Forbidden-Magic-Legend-Begins-with-Him')

