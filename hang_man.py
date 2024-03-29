
import random

def choose_word():
    words = ["apple", "banana", "orange", "grape", "pineapple", "strawberry"]
    return random.choice(words)

def display_word(word, guessed_letters):
    displayed_word = ""
    for letter in word:
        if letter in guessed_letters:
            displayed_word += letter + " "
        else:
            displayed_word += "_ "
    return displayed_word.strip()

def main():
    word_to_guess = choose_word()
    guessed_letters = []
    attempts = 6
    print("Welcome to Hangman!")
    print("Try to guess the word.")

    while attempts > 0:
        print("\nAttempts left:", attempts)
        print("Current word:", display_word(word_to_guess, guessed_letters))
        guess = input("Enter a letter: ").lower()

        if len(guess) != 1 or not guess.isalpha():
            print("Please enter a single alphabetical character.")
            continue

        if guess in guessed_letters:
            print("You've already guessed that letter.")
        elif guess in word_to_guess:
            guessed_letters.append(guess)
            if set(word_to_guess) == set(guessed_letters):
                print("Congratulations! You guessed the word:", word_to_guess)
                break
        else:
            guessed_letters.append(guess)
            attempts -= 1
            print("Incorrect guess!")

    if attempts == 0:
        print("You're out of attempts! The word was:", word_to_guess)

if __name__ == "__main__":
    main()
   
