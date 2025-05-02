from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, StaleElementReferenceException
from utils import checkMessagesSentiment, pushToDatabase, getMessageAnalysis
import time
from dotenv import load_dotenv
import os

# For testing purposes
CHILD_NAME = "Malcom"
CHILD_AGE = 6
CHILD_EMAIL = "malcomauben@gmail.com"
CHILD_PHONE = 6138796342
CHILD_SCHOOL = "Toronto Elementary School"

def wait_and_find_element(driver, by, value, timeout=5):
    # Utility function to wait for and find an element
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
    # Detects and handles Instagram's notification modal by clicking the 'Not Now' button.
    # Returns True if modal was found and closed, False if modal didn't appear
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
    # Clicks through all messages in Instagram DM list with delay
    try:
        print("clicking through all messages...")
        # Wait for chats list to load
        WebDriverWait(driver, 5).until(
            EC.presence_of_element_located((By.XPATH, "//div[@role='list' and @aria-label='Chats']"))
        )
        
        # Function to get fresh list of chats 
        def get_messages():
            return driver.find_elements(By.XPATH, "//div[@role='list' and @aria-label='Chats']")
        
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
                # Short delay after scrolling
                time.sleep(1)  
                
                # Click the message
                message.click()
                
                # Extract message bubbles
                try:
                    # Wait for messages to load after clicking
                    time.sleep(2)
    
                    # Try multiple possible selectors for message text
                    message_bubbles = driver.find_elements(
                        By.XPATH,
                        "//div[contains(@class, 'html-div xexx8yu x4uap5 x18d9i69 xkhd6sd x1gslohp x11i5rnm x12nagc x1mh8g0r x1yc453h x126k92a x18lvrbx')]//div[@dir='auto']"
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
                            # Make sure to only print non-empty messages
                            if message_text and not message_text.isspace():  
                                print(f"Message: {message_text}")
                                # Check if the message seems like a threat
                                message_result = checkMessagesSentiment(message_text, CHILD_NAME, CHILD_AGE, CHILD_SCHOOL, CHILD_PHONE, CHILD_EMAIL)
                                # If message is threatening, push it to prisma database
                                if(message_result['isThreat'] == True):
                                    # Get analysis
                                    analysis = getMessageAnalysis(message_text)
                                    pushToDatabase(username, analysis, message_text)
                                    print("Message is a threat, sent to database")
                                else:
                                   print("Message is not a threat")
                        except Exception as e:
                            print(f"Error extracting individual message: {str(e)}")
                            continue

                except Exception as e:
                    print(f"Error extracting messages: {str(e)}")
                
            except StaleElementReferenceException:
                print("Message element became stale, skipping to next message")
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
            # Try full class match and text match for div
            "//div[@class='x1i10hfl xjqpnuy xa49m3k xqeqjp1 x2hbi6w xdl72j9 x2lah0s xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r x2lwn1j xeuugli x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1q0g3np x1lku1pv x1a2a7pz x6s0dn4 xjyslct x1ejq31n xd10rxx x1sy0etr x17r0tee x9f619 x1ypdohk x1f6kntn xwhw2v2 xl56j7k x17ydfre x2b8uid xlyipyv x87ps6o x14atkfc xcdnw81 x1i0vuye xjbqb8w xm3z3ea x1x8b98j x131883w x16mih1h x972fbf xcfux6l x1qhh985 xm0m39n xt0psk2 xt7dq6l xexx8yu x4uap5 x18d9i69 xkhd6sd x1n2onr6 x1n5bzlp x173jzuc x1yc6y37'][text()='Not Now']",
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
        driver = webdriver.Chrome()
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
        handle_notification_modal(driver)
    
        # Wait for and click messages button - using a more reliable selector
        messages_button = wait_and_find_element(
            driver,
            By.XPATH,
            "//a[contains(@href, '/direct/inbox/')]"
        )
    
        if messages_button:
            print("going to click messages button")
            messages_button.click()
            print("Successfully navigated to messages")
            time.sleep(2)
            print("going to click not now button")
            not_nowbutton(driver, 5)
            print("going to click through all messages")
            click_all_messages(driver)
            return "Check your dashboard now."
        else:
            return "An error occured. Please try again later."
    

    except Exception as e:
        return f"An error occurred: {str(e)}. Please try again later."

    finally:
        driver.quit()