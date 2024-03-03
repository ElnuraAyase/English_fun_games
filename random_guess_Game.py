import random

# List of words for the game
words = ["apple", "banana", "orange", "grape", "strawberry", "kiwi", "pineapple", "watermelon", "mango", "peach"]

def choose_word(words):
    """
    Function to choose a random word from the list
    """
    return random.choice(words)

def play_game(word):
    """
    Function to play the guessing game
    """
    # Initialize variables
    guessed_letters = []
    tries = 6

    print("Welcome to the Word Guessing Game!")
    print("The word contains", len(word), "letters.")
    print("You have", tries, "tries to guess the word.")

    # Loop until the word is guessed or no more tries left
    while tries > 0:
        # Display the word with correctly guessed letters
        display_word = ""
        for letter in word:
            if letter in guessed_letters:
                display_word += letter
            else:
                display_word += "_"
        
        print("\nWord:", display_word)

        # Ask for user input
        guess = input("Guess a letter: ").lower()

        # Check if the guess is a single letter
        if len(guess) != 1:
            print("Please enter only one letter.")
            continue

        # Check if the guess is a letter
        if not guess.isalpha():
            print("Please enter a letter.")
            continue

        # Check if the letter has been guessed already
        if guess in guessed_letters:
            print("You have already guessed that letter.")
            continue

        # Add the guess to the list of guessed letters
        guessed_letters.append(guess)

        # Check if the guess is in the word
        if guess in word:
            print("Good guess!")
        else:
            print("Oops! That letter is not in the word.")
            tries -= 1

        # Check if the word has been guessed completely
        if set(word) == set(guessed_letters):
            print("\nCongratulations! You guessed the word:", word)
            break

        # Display the number of tries left
        print("Tries left:", tries)

    # If all tries are used up
    if tries == 0:
        print("\nSorry, you ran out of tries. The word was:", word)

# Main function to start the game
def main():
    word = choose_word(words)
    play_game(word)

if __name__ == "__main__":
    main()
