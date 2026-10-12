from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome()
wait = WebDriverWait(driver, 10)

try:
    driver.get("http://127.0.0.1:5500/frontend/index.html")
    wait.until(EC.presence_of_element_located((By.TAG_NAME, "table")))
    wait.until(lambda d: "Loading students..." not in d.find_element(By.TAG_NAME, "body").text)
    print("Application opened successfully")

    driver.find_element(By.CSS_SELECTOR, '[ng-model="newStudent.id"]').send_keys("901")
    driver.find_element(By.CSS_SELECTOR, '[ng-model="newStudent.name"]').send_keys("Test Student")
    driver.find_element(By.CSS_SELECTOR, '[ng-model="newStudent.department"]').send_keys("IT")
    driver.find_element(By.CSS_SELECTOR, '[ng-model="newStudent.year"]').send_keys("3")
    driver.find_element(By.XPATH, "//button[@type='submit']").click()

    wait.until(EC.presence_of_element_located(
        (By.XPATH, "//tr[td[normalize-space()='901'] and td[normalize-space()='Test Student']]")
    ))
    print("Add test passed")

    row = driver.find_element(By.XPATH, "//tr[td[normalize-space()='901']]")
    row.find_element(By.XPATH, ".//button[contains(., 'Modify')]").click()

    name_input = driver.find_element(By.CSS_SELECTOR, '[ng-model="newStudent.name"]')
    name_input.clear()
    name_input.send_keys("Updated Student")
    driver.find_element(By.XPATH, "//button[@type='submit']").click()

    wait.until(EC.presence_of_element_located(
        (By.XPATH, "//tr[td[normalize-space()='901'] and td[normalize-space()='Updated Student']]")
    ))
    print("Modify test passed")

    row = driver.find_element(By.XPATH, "//tr[td[normalize-space()='901']]")
    row.find_element(By.XPATH, ".//button[contains(., 'Remove')]").click()
    wait.until(EC.alert_is_present()).accept()

    wait.until(EC.invisibility_of_element_located(
        (By.XPATH, "//tr[td[normalize-space()='901']]")
    ))
    print("Remove test passed")

finally:
    driver.quit()
