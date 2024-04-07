// ActionProvider.js
class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }
  
  greet = () => {
    const message = this.createChatBotMessage("Hello friend.");
    this.addMessageToState(message);
  };

  handleJavascriptQuiz = () => {
    const message = this.createChatBotMessage(
      "Are you buying or renting?",
      {
        widget: "javascriptQuiz",
      }
    );

    this.addMessageToState(message);
  };

  askLocation = () => {
    const message = this.createChatBotMessage(
      "Where are you looking? Please enter city, state, and zip code."
    );
    this.addMessageToState(message);
  };

  askPrice = () => {
    const message = this.createChatBotMessage(
      "What is your budget?",
      {
        widget: "javascriptQuiz",
      }
    );
    this.addMessageToState(message);
  };

  // Modified method to handle the API function after getting all required information
  handleAPIFunction = (location, price) => {
    // Call your API function here with the provided location and price
    // Example:
    // fetch('your_api_endpoint', {
    //   method: 'POST',
    //   body: JSON.stringify({ location, price }),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    // })
    // .then(response => response.json())
    // .then(data => {
    //   // Handle API response
    // })
    // .catch(error => {
    //   console.error('Error:', error);
    // });
    // For now, let's just display a message
    const message = this.createChatBotMessage(
      "Thank you for providing the information. We'll proceed with your request."
    );
    this.addMessageToState(message);

    // After processing the location, ask for the price
    this.askPrice();
  };

  addMessageToState = (message) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };
}

export default ActionProvider;
