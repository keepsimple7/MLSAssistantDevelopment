// MessageParser.js
class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
    this.awaitingPrice = false; // Flag to indicate if we are awaiting the price
  }

  parse(message) {
    console.log(message);
    const lowercase = message.toLowerCase();

    if (this.awaitingPrice) {
      // If we are awaiting the price, call the handleAPIFunction method with location and price
      this.actionProvider.handleAPIFunction(location, message);
      this.awaitingPrice = false; // Reset the flag
    } else {
      // Otherwise, check for other messages
      if (lowercase.includes("hello")) {
        this.actionProvider.greet();
      }

      if (lowercase.includes("javascript") || lowercase.includes("js")) {
        this.actionProvider.handleJavascriptQuiz();
      }

      if (lowercase.includes("buying") || lowercase.includes("renting")) {
        this.actionProvider.askLocation();
      }

      if (lowercase.includes("price")) {
        // If the user mentions price, set the flag to true indicating we are awaiting the price
        this.awaitingPrice = true;
      }

      if (lowercase.includes("api function")) {
        this.actionProvider.handleAPIFunction();
      }
    }
  }
}

export default MessageParser;
