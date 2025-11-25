import json
from transformers import AutoTokenizer, AutoModelForCausalLM, TrainingArguments, Trainer

# Load dataset from file (already uploaded)
with open("prepared_dataset.json") as f:
    data = json.load(f)

# Convert to HF training format
train_texts = [item["prompt"] + " " + item["completion"] for item in data]

tokenizer = AutoTokenizer.from_pretrained("meta-llama/Llama-3-8b")
model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-3-8b")

tokenized = tokenizer(train_texts, truncation=True, padding=True)

training_args = TrainingArguments(
    output_dir="./aeroguard-finetuned",
    per_device_train_batch_size=1,
    num_train_epochs=1,
    logging_steps=10,
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized,
)

trainer.train()
trainer.save_model("aeroguard-finetuned")

