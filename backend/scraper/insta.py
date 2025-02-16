from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, StaleElementReferenceException
from utils import checkMessagesBad
import time
from dotenv import load_dotenv
import os


CHILD_NAME = "John Doe"
CHILD_AGE = 10
CHILD_EMAIL = "johndoe@gmail.com"
CHILD_PHONE = 555555555
CHILD_SCHOOL = "Toronto Elementary School"

def wait_and_find_element(driver, by, value, timeout=10):
    """Utility function to wait for and find an element"""
    try:
        element = WebDriverWait(driver, timeout).until(
            EC.presence_of_element_located((by, value))
        )
        return element
    except TimeoutException:
        print(f"Timeout waiting for element: {value}")
        return None
    
def click_all_messages(driver):
    """
    Clicks through all messages in Instagram DM list with delay
    """
    try:
        # Wait for messages to load
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "//div[@role='listitem']"))
        )
        
        # Function to get fresh list of messages
        def get_messages():
            return driver.find_elements(By.XPATH, "//div[@role='listitem']")
        
        # Initial message list
        messages = get_messages()
        total_messages = len(messages)
        print(f"Found {total_messages} messages")
        
        # Click each message
        for i in range(total_messages):
            try:
                # Get fresh list of messages to avoid stale elements
                messages = get_messages()
                
                # Wait for message to be clickable
                message = WebDriverWait(driver, 10).until(
                    EC.element_to_be_clickable(messages[i])
                )
                
                # Get the username for logging
                try:
                    username = message.find_element(By.XPATH, ".//span[@class='x1lliihq x193iq5w x6ikm8r x10wlt62 xlyipyv xuxw1ft']").text
                    print(f"Clicking message from: {username}")
                except:
                    print(f"Clicking message {i+1}/{total_messages}")
                
                # Scroll message into view
                driver.execute_script("arguments[0].scrollIntoView(true);", message)
                time.sleep(1)  # Short delay after scrolling
                
                # Click the message
                message.click()
                
                # Extract message bubbles
                try:
                    # Wait for messages to load after clicking
                    time.sleep(2)
    
                    # Try multiple possible selectors for message text
                    message_bubbles = driver.find_elements(
                        By.XPATH,
                        "//div[contains(@class, 'x1lliihq x193iq5w')]//span[contains(@class, 'xuxw1ft')] | //div[contains(@class, 'xexx8yu')]//div[@dir='auto']"
                    )
    
                    print(f"\nMessages from conversation with {username}:")
                    if not message_bubbles:
                        print("No messages found - trying alternative selector...")
                        # Try an alternative selector
                        message_bubbles = driver.find_elements(
                            By.CSS_SELECTOR,
                            "div[dir='auto'][class*='xexx8yu']"
                        )
    
                    for bubble in message_bubbles:
                        try:
                            message_text = bubble.text.strip()
                            if message_text and not message_text.isspace():  # Only print non-empty messages
                                print(f"Message: {message_text}")
                                # check if the message is bad
                                message_result = checkMessagesBad(message_text, CHILD_NAME, CHILD_AGE, CHILD_SCHOOL, CHILD_PHONE, CHILD_EMAIL)
                                if(message_result['isThreat'] == True):
                                    # if messages is bad or returns true
                                    print("Message is a threat")
                                    # should push to the database
                                else:
                                   print("Message is not a threat")
                                    
                        except Exception as e:
                            print(f"Error extracting individual message: {str(e)}")
                            continue
    
                    # If still no messages found, print the page source for debugging
                    if not any(bubble.text.strip() for bubble in message_bubbles):
                        print("No message text found. Current element structure:")
                        messages_container = driver.find_element(By.XPATH, "//div[@role='presentation']")
                        print(messages_container.get_attribute('innerHTML'))
        
                except Exception as e:
                    print(f"Error extracting messages: {str(e)}")
                
                # Wait before next message
                print("Waiting 10 seconds...")
                time.sleep(10)
                
            except StaleElementReferenceException:
                print("Message element became stale, skipping to next")
                continue
            except Exception as e:
                print(f"Error clicking message {i+1}: {str(e)}")
                continue
                
        print("Finished clicking all messages")
        
    except Exception as e:
        print(f"An error occurred: {str(e)}")
    
def not_nowbutton():
    # Wait for navigation and save login info prompt
    try:
        not_now_button = wait_and_find_element(driver, By.XPATH, "//button[contains(text(), 'Not Now')]")
        if not_now_button:
            not_now_button.click()
    except:
        print("No 'Not Now' button found, continuing...")

def main():
    try:
        load_dotenv()
        # Initialize driver
        driver = webdriver.Firefox()
        driver.get('https://www.instagram.com/direct/inbox/')
    
        # Wait for and fill in login form
        username_input = wait_and_find_element(driver, By.NAME, "username")
        password_input = wait_and_find_element(driver, By.NAME, "password")
    
        if username_input and password_input:
            username_input.send_keys(os.getenv("EMAIL"))
            password_input.send_keys(os.getenv("PASS"))
        
            # Find and click login button
            login_button = wait_and_find_element(driver, By.XPATH, "//button[@type='submit']")
            if login_button:
                login_button.click()
    
        # Wait for navigation and save login info prompt
        not_nowbutton()
    
        # Wait for and click messages button - using a more reliable selector
        messages_button = wait_and_find_element(
            driver,
            By.XPATH,
            "//a[contains(@href, '/direct/inbox/')]"
        )
    
        if messages_button:
            messages_button.click()
            print("Successfully navigated to messages")
        
            not_nowbutton()
        
            time.sleep(3)
        
            click_all_messages(driver)
            return "Check your dashboard now."
        else:
            return "An error occured. Please try again later."
    
        # Add a wait here if you need to do more operations
        time.sleep(4)

    except Exception as e:
        return "An error occurred: {e}. Please try again later."

    finally:
        driver.quit()