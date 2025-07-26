## Description

A very simple proxy and transformer that allows for using cursor's openai models for free using [Github Models](https://github.com/marketplace/models). Should allow for basic model usage for free or all models with github pro or copilot subscription [See rate limits](https://docs.github.com/en/github-models/prototyping-with-ai-models#rate-limits)

## Uses

- Student with Student Developer Pack (should allow for free usage of all models)
- Existing Github Pro or copilot subscription
- Basic free usage of models such as gpt-4.1 and gpt-4o inside cursor

### ⚠️ IMPORTANT ⚠️

Cursor currently only support non reasoning models when using openai api keys. Hopefully they will change this in the future as this is supported through the api
See [here](https://docs.cursor.com/settings/api-keys#will-my-api-key-be-stored-or-leave-my-device) for more information.

Currently you can only use modles like gpt-4.1 and gpt-4o inside cursor. Github models also supports other models such as deepseek and grok, but cursor doesn't allow setting custom base urls for providers other than openai.

## Usage

1. Go to [Github Tokens](https://github.com/settings/tokens)
2. Create a Github Classic Token with copilot permission and **SAVE THIS TOKEN**
3. Open Cursor Settings and go to models page
4. Set Overide OpenAI Base URL to https://copilotforward.johnlozier.com
5. Set OpenAI key to the Github Token

## Note

Recommended to clone repo and host yourself, because github doesn't host an /models endpoint. 
I am manually sending models response for models endpoint, but this is unlikely to stay up to date.

Feel free to submit a pull request to update this list and I will accept it.

### Host yourself

1. Clone repo
2. Set OPENAI_API_KEY in .env to an OpenAI API key (this shouuld be free to create and use)
3. Remove copilot key hash check or set COPILOT_KEY_HASH to sha256 hash of copilot key (include "Bearer " in front)

All good to go
