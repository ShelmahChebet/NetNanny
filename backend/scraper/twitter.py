from selenium import webdriver
from selenium.webdriver import Chrome
import time

PATH = '/chromedriver-win64.exe'
driver = webdriver.Chrome()



driver.get('https://www.instagram.com/direct/inbox/')

time.sleep(5)

driver.quit()


