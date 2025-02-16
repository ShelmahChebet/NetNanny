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

Now the project should be set up and running.
