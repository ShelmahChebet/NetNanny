# NetNanny

Find out more about our project on [dorahacks!](https://dorahacks.io/buidl/22882)
Watch the demo video on [youtube!](https://youtu.be/rGLy40Wz5Y4)

## Setup Instructions

This project runs on **Wasp**, so to get started, you'll need to install **Wasp**. You can find the quick setup instructions [here](https://wasp.sh/docs/quick-start).

### Steps to Run the Project

1. **Install Wasp:**
   - Follow the setup instructions provided in the link above.
   
2. **Start Wasp:**
   - After installing, run the following command:
     ```bash
     wasp start
     ```

3. **Backend Setup:**
   - Navigate to the `backend` folder:
     ```bash
     cd backend
     ```
   - Then, navigate to the scraper’s folder:
     ```bash
     cd scraper
     ```
   - Install the required dependencies:
     ```bash
     pip install -r requirements.txt
     ```

4. **Run Flask Server:**
   - In a separate terminal, navigate to the `backend/scraper` folder and run:
     ```bash
     python3 -m flask run
     ```

5. **Set Up Chrome Extension:**
   - Open Chrome extension tools and enable **Developer Mode**.
   - Click on the **"Load unpacked"** button and select the `backend` folder.
   - This will show the **NetNanny** browser extension on the browser extension panel.

6. **Run Scrapers:**
   - To run the scrapers, click on the corresponding button in the extension panel.

Now the project should be set up and running.

## The Inspiration

*   Nearly 42% of kids have experienced cyberbullying, and almost one in four have faced it more than once.
    
*   Nine out of ten middle school students have had their feelings hurt online.
    
*   Every day, at least 500,000 predators are active on the internet. One in five children report being solicited or contacted by an online predator in the past year.
    
*   In today’s digital world, where technology shapes how we connect and communicate, online safety has never been more critical. Many parents have no way of knowing who their children interact with online, and sometimes, one message can change everything—leading to exploitation, self-harm, or even abduction.
    
*   At the same time, many children aren’t fully aware of the dangers they might encounter online. That’s why it’s essential to empower them with knowledge and tools to recognize threats, respond safely, and protect themselves in an ever-evolving digital landscape.
    

## What It Does

Our project, **NetNanny**, is a browser extension and web application designed to protect children from online threats such as cyberbullying, grooming, phishing, and personal data leaks.

*   The extension monitors direct messages on Instagram to detect harmful interactions using AI-driven sentiment analysis, toxicity detection, and named entity recognition (NER) to flag personal information leaks. We plan to expand support to other social media platforms like Twitter and Messenger, as well as gaming platforms like Roblox.
    

### Features:

*   **Instant Risk Alerts & Warnings:** When the AI detects a potentially harmful message (e.g., predatory behavior, bullying, or phishing attempts), it warns the user by highlighting the message and suggesting safe responses.
    
*   **Incident Reports & Insights:**
    
    *   A dashboard visualizes threats over time using bar graphs, pie charts, and AI-generated summaries, helping parents and users track risks on a daily, weekly, and monthly basis.
        
    *   Sends a weekly report to parents about ongoing cases to ensure they are kept in the loop.
        
    *   Clicking on a specific incident provides a detailed report explaining the nature of the risk and suggested next steps.
        
*   **AI Chatbot Assistance:**
    
    *   Children can interact with a chatbot to better understand flagged threats and get guidance on staying safe online.
        
    *   The chatbot also provides helplines and resources for children in distress.
        

## How We Built It

We combined AI-driven analysis, real-time web scraping, and a full-stack architecture to create a dashboard and browser extension focused on online safety.

*   Using **Ollama**, we deployed **DeepSeek R1** (1.15B parameters) via **Open Web UI**, enabling sentiment analysis, text summarization, and generative AI to detect online threats. **Selenium** and **Geckodriver** scrape Instagram DMs for real-time monitoring.
    
*   Our backend, powered by **Flask** and **Prisma**, is containerized with **Docker**, hosting both the **PostgreSQL** database and **DeepSeek model**. **Wasp** seamlessly connects our **React** frontend with the backend, simplifying API routes and authentication.
    
*   The **React dashboard**, built with **Tempo Labs**, **TypeScript**, and **Tailwind CSS**, provides an intuitive UI, while the **Manifest V3 browser extension** (JavaScript, Node.js) integrates directly into browsers for real-time alerts.
    
*   By combining AI, automation, and a tightly integrated stack, we built a comprehensive online safety solution.
    

## What We Learned

*   This was our first time using **Wasp**, and we faced challenges with routers not working properly while troubleshooting with limited resources due to its lack of widespread documentation. We also encountered multiple dependency version issues.
    
*   Additionally, we had never run an LLM like **DeepSeek** locally on our machine using **Ollama**, so it was interesting to see it run on the CLI and use Docker to self-host it with Open Web UI, allowing us to make localhost API calls from our program.
    
*   Crafting an effective prompt for the model to understand properly was another learning experience.
    
*   We also explored **Selenium** and **Geckodriver** to automate website scraping on Instagram, learning different methods of browser interaction.
    
*   This was our first time building a browser extension, which turned out to be surprisingly simple, requiring just a **manifest.json** file.
    
*   Lastly, it was our first time working with two different development environments—**Python** and **JavaScript**—and successfully connecting them within our project.
    

## What's Next for Our Project

*   Currently, our project monitors direct messages on Instagram, but we plan to expand support to other platforms such as **Twitter** and **Messenger**, as well as popular gaming platforms like **Roblox**, where online interactions can also present risks.
    
*   We are working on expanding into **image detection** to identify inappropriate or harmful images shared within conversations.
    
*   We intend to enhance the accuracy of our **AI models** by training them on a larger dataset, improving their ability to detect various online threats.
    
*   We aim to collaborate with **schools** and **educators** to integrate our tool into school devices, empowering students to recognize online threats and adopt safe digital habits.
    

## Technologies

*   **Ollama** (open source AI Model library) to download **DeepSeek R1** 1.15 billion parameters
    
*   **Open Web UI** for self-hosted DeepSeek LLM for Gen AI, Sentiment Analysis, and Text Summarization
    
*   **Selenium** and **Geckodriver** to scrape Instagram direct messages webpage
    
*   **Wasp**, **Prisma**, **Flask** to host Python scraper script
    
*   **Docker** to host Prisma database and DeepSeek model
    
*   **React**, **Tempo Labs**, **TypeScript**, **Tailwind CSS**
    
*   **Manifest V3** with JavaScript, **Node.js**
    
*   **PostgreSQL**
    

## Why Wasp?

**Wasp** is a powerful domain-specific language (DSL) that simplifies full-stack application development, offering a scalable and easy-to-maintain structure. By using Wasp, we ensured a cohesive and consistent development workflow, reducing boilerplate code while maintaining flexibility. Its declarative approach allowed us to focus on building features rather than configuring complex setups, making development faster and more efficient.

### Project Setup with Wasp

For our project, we leveraged Wasp’s capabilities to streamline authentication, database management, and API handling:

*   **Authentication**: Wasp’s built-in authentication system allowed us to easily implement secure user sign-ins without the hassle of manual session handling.
    
*   **Database Integration**: We used Prisma with Wasp to interact with our PostgreSQL database, enabling efficient querying and data management. Wasp’s entity-based structure made it simple to define and manipulate data models.
    
*   **API Handling**: To support external data submissions, we implemented a custom API listener that receives **POST** requests, processes incoming data, and updates our database accordingly. Wasp’s structured approach to defining API endpoints ensured smooth communication between the client and server.
    
*   **Routing & UI Integration**: Wasp’s built-in routing simplified our navigation structure, enabling seamless page transitions while maintaining a clean and maintainable codebase.
    

### Why this stands out

By utilizing Wasp, we reduced the complexity of managing a full-stack application while benefiting from a framework that promotes best practices. The combination of automatic CRUD operations, declarative configurations, and tight integration with Prisma allowed us to rapidly develop a scalable, well-structured application.

Through Wasp, we were able to build a reliable and efficient system with minimal overhead, demonstrating its potential as a game-changer for full-stack development!