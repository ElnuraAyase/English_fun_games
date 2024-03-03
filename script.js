    words.forEach((word, index) => {
        if (typedLetters === word.text.substr(0, typedLetters.length)) {
            if (typedLetters === word.text) {
                words.splice(index, 1); // Remove the matched word
                matchedWords++; // Increment matched words count
                // Implement scoring logic here
            }
            // Update word color to indicate matching
            word.color = 'yellow';
        } else {
            // Reset word color if not matching
            word.color = 'white';
        }
    });
