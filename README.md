# DevOps Quiz App

## Features
- Interactive quiz interface
- Topic-based question selection
- Instant feedback after submission
## Question Format
Questions are stored in `data/questions.json` as an array of objects. Each object includes:

- id (string)
- topic (string)
- question (string)
- options (array of 4 strings)
- answerIndex (0-based index of the correct option)
- explanation (string shown after answering)

- JSON question bank with 20 questions
- 4+ DevOps topics included
- Each question includes an explanation and 0-based answerIndex
