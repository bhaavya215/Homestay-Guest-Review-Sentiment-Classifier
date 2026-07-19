# AI Prompt Engineering Documentation

## Tested Prompts

### Variation 1
**Input:** "The room was extremely cold and the wifi kept dropping."
**Prompt:** "Classify this review: The room was extremely cold and the wifi kept dropping. Give me sentiment and themes."
**Output:** "Sentiment: Negative. Themes: Temperature, Wifi."

### Variation 2
**Input:** "Amazing stay, host was very welcoming and the breakfast was delicious."
**Prompt:** "Analyze the following homestay review and return a JSON object with 'sentiment' (Positive/Neutral/Negative) and 'themes' (a list of strings): Amazing stay, host was very welcoming and the breakfast was delicious."
**Output:** "{"sentiment": "Positive", "themes": ["hospitality", "food"]}"

### Variation 3 (Final Choice)
**System Prompt/Role Used:** "You are an expert hospitality analyst."
**Input:** "The homestay in Dehradun was fantastic! The Wi-Fi was incredibly fast. The host was also very welcoming."
**Prompt:** "You are an expert hospitality analyst. Analyze the following homestay review and return ONLY a raw JSON object with no markdown formatting. The JSON must contain 'sentiment' (Positive, Neutral, or Negative) and 'themes' (a list of keywords). Review: The homestay in Dehradun was fantastic! The Wi-Fi was incredibly fast. The host was also very welcoming."
**Output:** {"sentiment": "Positive", "themes": ["Fast Wi-Fi", "Welcoming Host"]}

## Why the Final Prompt Worked
The final prompt was the most effective because it enforced a strict output format by demanding ONLY a raw JSON object and forbidding markdown formatting. By explicitly defining the persona as a hospitality analyst and restricting the keys to specific types, the AI consistently produced clean, machine-readable data. This eliminated the need for complex string parsing on the frontend and ensured the application could reliably display sentiment badges and theme lists without runtime errors.