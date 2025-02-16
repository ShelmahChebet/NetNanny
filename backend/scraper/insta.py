from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, StaleElementReferenceException
from utils import checkMessagesBad, pushToDatabase, analyseBad
import time
from dotenv import load_dotenv
import os


CHILD_NAME = "Malcom"
CHILD_AGE = 6
CHILD_EMAIL = "malcomauben@gmail.com"
CHILD_PHONE = 6138796342
CHILD_SCHOOL = "Toronto Elementary School"

def wait_and_find_element(driver, by, value, timeout=5):
    """Utility function to wait for and find an element"""
    try:
        time.sleep(1)
        element = WebDriverWait(driver, timeout).until(
            EC.presence_of_element_located((by, value))
        )
        return element
    except TimeoutException:
        print(f"Timeout waiting for element: {value}")
        return None

def handle_notification_modal(driver, timeout=10):
    """
    Detects and handles Instagram's notification modal by clicking the 'Not Now' button.
    
    Args:
        driver: Selenium WebDriver instance
        timeout: Maximum time to wait for the modal in seconds (default: 10)
        
    Returns:
        bool: True if modal was found and handled, False if modal didn't appear
    """
    try:
        # Wait for either the modal div or the "Not Now" button to be visible
        modal = WebDriverWait(driver, timeout).until(
            EC.presence_of_element_located((
                By.XPATH,
                "//div[contains(@class, '_a9-w')] | //button[contains(@class, '_a9--') and contains(text(), 'Not Now')]"
            ))
        )
        
        # Find and click the "Not Now" button
        not_now_button = driver.find_element(
            By.XPATH,
            "//button[contains(@class, '_a9--') and contains(text(), 'Not Now')]"
        )
        not_now_button.click()
        
        return True
        
    except TimeoutException:
        # Modal didn't appear within the timeout period
        return False
    except Exception as e:
        print(f"An error occurred while handling the notification modal: {str(e)}")
        return False

def click_all_messages(driver):
    """
    Clicks through all messages in Instagram DM list with delay
    """
    try:
        # Wait for messages to load
        WebDriverWait(driver, 5).until(
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
                message = WebDriverWait(driver, 5).until(
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
                                    # Get analysis
                                    analysis = analyseBad(message_text)
                                    # if messages is bad or returns true
                                    pushToDatabase(username, analysis, message_text)
                                    print("Message is a threat, sent to database")
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
                #print("Waiting 3 seconds...")
                #time.sleep(3)
                
            except StaleElementReferenceException:
                print("Message element became stale, skipping to next")
                continue
            except Exception as e:
                print(f"Error clicking message {i+1}: {str(e)}")
                continue
                
        print("Finished clicking all messages")
        
    except Exception as e:
        print(f"An error occurred: {str(e)}")
    
def not_nowbutton(driver, timeout):
    # Wait for navigation and save login info prompt
    try:
        # Wait a bit for the modal to potentially appear
        time.sleep(3)
        
        # Try multiple different selectors in case one fails
        selectors = [
            # Try exact class match first
            "//button[@class='_a9-- *ap36 *a9_1'][text()='Not Now']",
            # Try contains for each class
            "//button[contains(@class, '_a9--') and contains(@class, '*ap36') and contains(@class, '*a9_1')][text()='Not Now']",
            # Try just the base class and text
            "//button[contains(@class, '_a9--')][text()='Not Now']",
            # Try just by text
            "//button[text()='Not Now']"
        ]
        
        for selector in selectors:
            try:
                not_now_button = WebDriverWait(driver, timeout).until(
                    EC.element_to_be_clickable((By.XPATH, selector))
                )
                
                
                driver.execute_script("arguments[0].click();", not_now_button)
                
                print(f"Successfully clicked 'Not Now' button using selector: {selector}")
                break
                
            except Exception as inner_e:
                print(f"Selector {selector} failed: {str(inner_e)}")
                continue
        
        # If we get here, none of the selectors worked
        print("Could not find 'Not Now' button with any selector")
        return False
        
    except Exception as e:
        print(f"Error in not_nowbutton function: {str(e)}")
        return False

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
        not_nowbutton(driver,5)
        #handle_notification_modal(driver)
    
        # Wait for and click messages button - using a more reliable selector
        messages_button = wait_and_find_element(
            driver,
            By.XPATH,
            "//a[contains(@href, '/direct/inbox/')]"
        )
    
        if messages_button:
            messages_button.click()
            print("Successfully navigated to messages")
            time.sleep(2)
        
            not_nowbutton(driver, 5)
            #handle_notification_modal(driver)
        
            click_all_messages(driver)
            return "Check your dashboard now."
        else:
            return "An error occured. Please try again later."
    
        # Add a wait here if you need to do more operations
        time.sleep(2)

    except Exception as e:
        return "An error occurred: {e}. Please try again later."

    finally:
        driver.quit()