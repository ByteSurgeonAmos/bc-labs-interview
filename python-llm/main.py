from transformers import AutoTokenizer, AutoModelForCausalLM, TextStreamer


class LLMChat:
    def __init__(self):
        self.model = None
        self.tokenizer = None
        self.conversation_history = []

    def load_model(self, model_name):
        if model_name == "llama2":
            self.model = AutoModelForCausalLM.from_pretrained(
                "meta-llama/Llama-2-7b-chat-hf")
            self.tokenizer = AutoTokenizer.from_pretrained(
                "meta-llama/Llama-2-7b-chat-hf")
        elif model_name == "mistral":
            self.model = AutoModelForCausalLM.from_pretrained(
                "mistralai/Mistral-7B-v0.1")
            self.tokenizer = AutoTokenizer.from_pretrained(
                "mistralai/Mistral-7B-v0.1")
        else:
            raise ValueError(
                "Invalid model name. Choose 'llama2' or 'mistral'.")

    def generate_response(self, user_input):
        self.conversation_history.append(f"User: {user_input}")

        full_prompt = "\n".join(self.conversation_history)
        inputs = self.tokenizer(full_prompt, return_tensors="pt")

        outputs = self.model.generate(
            inputs.input_ids,
            max_length=200,
            num_return_sequences=1,
            temperature=0.7
        )

        response = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        self.conversation_history.append(f"AI: {response}")

        return response


def main():
    llm_chat = LLMChat()

    print("Select a model (llama2 or mistral):")
    model_name = input().lower()
    llm_chat.load_model(model_name)

    print(f"{model_name.capitalize()} model loaded. Start chatting!")

    while True:
        user_input = input("You: ")
        if user_input.lower() == 'exit':
            break

        response = llm_chat.generate_response(user_input)
        print(f"AI: {response}")


if __name__ == "__main__":
    main()
