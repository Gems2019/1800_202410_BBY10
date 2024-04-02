// Selecting element to view chat
var chatBotSession              = document.querySelector( ".chatBot .chatBody .chatSession" )

// Selecting trigger elements of conversation
var chatBotSendButton           = document.querySelector( ".chatBot .chatForm #sendButton" )
var chatBotTextArea             = document.querySelector( ".chatBot .chatForm #chatTextBox" )

// Default values for replies
var chatBotInitiateMessage      = "Hello! I am ChatBot."
var chatBotBlankMessageReply    = "Type something!"
var chatBotReply = `
🏠 **Welcome to HomeKey Rentals!** 🗝️

Hi there! 👋 I'm KeyBot, your virtual assistant, here to make your rental management experience as smooth and effortless as possible. Whether you're a landlord looking for the perfect tenants or a renter in search of your dream home, you've come to the right place!

**Here's how I can assist you:**

- **For Renters:** I can help you find the ideal rental home, schedule viewings, and manage your rental applications. Just tell me what you're looking for!

- **For Landlords:** I'll assist in listing your property, finding and vetting potential tenants, and managing lease agreements. Let me know how I can help get your property rented out!

**Getting Started:**
To get started, you can simply type what you need help with. For example:
- "Show me two-bedroom apartments in New York."
- "How do I list my property?"
- "Help me with my rental application."

If you're not sure where to begin or have any questions, type **"Help"** or **"Support"** at any time, and I'll be right here to assist you.

Thank you for choosing HomeKey Rentals. Let's make your rental experience exceptional! 🌟
`;



// Collecting user input
var inputMessage                = ""

// This helps generate text containers in the chat
var typeOfContainer             = ""

// Function to open ChatBot
chatBotSendButton.addEventListener("click", (event)=> {
    // Since the button is a submit button, the form gets submittd and the complete webpage reloads. This prevents the page from reloading. We would submit the message later manually
    event.preventDefault()
    if( validateMessage() ){
        inputMessage    = chatBotTextArea.value
        typeOfContainer = "message"
        createContainer( typeOfContainer )
        setTimeout(function(){
            typeOfContainer = "reply"
            createContainer( typeOfContainer )
        }, 750);
    }
    else{
        typeOfContainer = "error";
        createContainer( typeOfContainer )
    }
    chatBotTextArea.value = ""
    chatBotTextArea.focus()
})

function createContainer( typeOfContainer ) {
    var containerID = ""
    var textClass   = ""
    switch( typeOfContainer ) {
        case "message"      :
            // This would create a message container for user's message
            containerID = "messageContainer"
            textClass   = "message"
            break;
        case "reply"        :
        case "initialize"   :
        case "error"        :
            // This would create a reply container for bot's reply
            containerID = "replyContainer"
            textClass   = "reply"
            break;
        default :
            alert("Error! Please reload the webiste.")
    }

    // Creating container
    var newContainer = document.createElement( "div" )
    newContainer.setAttribute( "class" , "container" )
    if( containerID == "messageContainer" )
        newContainer.setAttribute( "id" , "messageContainer" )
    if( containerID == "replyContainer" )
        newContainer.setAttribute( "id" , "replyContainer" )
    chatBotSession.appendChild( newContainer )

    switch( textClass ) {
        case "message"  :
            var allMessageContainers    = document.querySelectorAll("#messageContainer")
            var lastMessageContainer    = allMessageContainers[ allMessageContainers.length - 1 ]
            var newMessage              = document.createElement( "p" )
            newMessage.setAttribute( "class" , "message animateChat" )
            newMessage.innerHTML        = inputMessage
            lastMessageContainer.appendChild( newMessage )
            lastMessageContainer.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
            break
        case "reply"    :
            var allReplyContainers      = document.querySelectorAll( "#replyContainer" )
            var lastReplyContainer      = allReplyContainers[ allReplyContainers.length - 1 ]
            var newReply                = document.createElement( "p" )
            newReply.setAttribute( "class" , "reply animateChat accentColor" )
            switch( typeOfContainer ){
                case "reply"        :
                    newReply.innerHTML  = chatBotReply
                    break
                case "initialize"   :
                    newReply.innerHTML  = chatBotInitiateMessage
                    break
                case "error"        :
                    newReply.innerHTML  = chatBotBlankMessageReply
                    break
                default             :
                    newReply.innerHTML  = "Sorry! I could not understannd."
            }
            setTimeout(function (){
                lastReplyContainer.appendChild( newReply )
                lastReplyContainer.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
            }, 10)
            break
        default         :
            console.log("Error in conversation")
    }
}

function initiateConversation() {
    chatBotSession.innerHTML = ""
    typeOfContainer = "initialize"
    createContainer( typeOfContainer )
}
