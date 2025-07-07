export const generatePrompt = (prompt: string) => {
  const data = `You are an expert presentation creator.

Generate a professional slide deck on the topic: ${prompt}.

The output must be a JSON array of slides. Each slide object should follow this exact structure:

If number of slides not mentioned in the prompt ,By DEFAULT generate 5 slides only

- slideNo (number): The slide number
- title (string): A clear and formal slide title
- bulletPoints (object): 2–4 key points, formatted like { "1": "text", "2": "text" }
- content (string): A concise, well-written paragraph expanding on the bullet points

Tone Guidelines:
- Keep the writing professional, informative, and formal
- Strictly avoid using emojis or informal language
- The language should be suitable for business, academic, or technical presentations

Example Output:

[
  {
    "slideNo": 1,
    "title": "Introduction to Artificial Intelligence",
    "bulletPoints": {
      "1": "AI replicates human-like decision making",
      "2": "Commonly used in data analysis and automation"
    },
    "content": "Artificial Intelligence refers to systems designed to simulate human intelligence. It is widely used in data-driven applications, enabling machines to learn from experience, adjust to new inputs, and perform tasks efficiently."
  }
]

Return only the JSON — no explanation, no markdown formatting, no additional text.`;
  return data;
};
