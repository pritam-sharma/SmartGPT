import "dotenv/config";

const getOpenAIResponse = async (message) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPEN_API_KEY}`, // Use your API key here
    },
    body: JSON.stringify({
      model: "gpt-40-mini",
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    }),
  };

  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to fetch OpenAI response");
  }
};

export default getOpenAIResponse;