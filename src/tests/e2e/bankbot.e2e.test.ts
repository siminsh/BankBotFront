import { Builder, By, Key, until, WebDriver } from 'selenium-webdriver';
import { Options as ChromeOptions } from 'selenium-webdriver/chrome';
import * as assert from 'assert';

describe('BankBot E2E Tests', function() {
  this.timeout(60000); // E2E tests may take longer
  
  let driver: WebDriver;
  
  // Base URL for the frontend application
  const baseUrl = 'http://localhost:4200';
  
  beforeEach(async function() {
    const chromeOptions = new ChromeOptions();
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(chromeOptions)
      .build();
      
    await driver.get(baseUrl);
    await driver.wait(until.elementLocated(By.css('.chat-container')), 5000);
  });
  
  afterEach(async function() {
    await driver.quit();
  });
  
  /**
   * E2E Test 1: Complete conversation flow with backend
   */
  it('should handle a complete conversation flow with backend integration', async function() {
    // This test assumes that:
    // 1. The frontend is running on localhost:4200
    // 2. The backend is running on localhost:8080
    // 3. The database has some transaction data
    
    const inputField = await driver.findElement(By.css('input.form-control'));
    const sendButton = await driver.findElement(By.css('button[type="submit"]'));
    
    // Send a financial question
    await inputField.sendKeys('How much did I spend last month?');
    await sendButton.click();
    
    // Wait for the bot to respond - this might take longer as it goes through the whole system
    // 1. Frontend → 2. Backend → 3. Kafka → 4. Consumer → 5. Database → 6. OpenAI → 7. Response
    await driver.wait(until.elementLocated(By.css('.bot-message')), 20000);
    
    // Verify that we received a response
    const botMessages = await driver.findElements(By.css('.bot-message'));
    assert.strictEqual(botMessages.length > 0, true);
    
    // Send a follow-up question
    await inputField.sendKeys('Which category did I spend the most on?');
    await sendButton.click();
    
    // Wait for the follow-up response
    // Use xpath to find the second bot message
    const secondBotMessageXPath = "(//div[contains(@class, 'bot-message')])[2]";
    await driver.wait(until.elementLocated(By.xpath(secondBotMessageXPath)), 20000);
    
    // Verify that we now have at least 2 bot messages
    const updatedBotMessages = await driver.findElements(By.css('.bot-message'));
    assert.strictEqual(updatedBotMessages.length >= 2, true);
    
    // Verify the conversation is saved in history by refreshing the page
    await driver.navigate().refresh();
    await driver.wait(until.elementLocated(By.css('.chat-container')), 5000);
    
    // Wait for chat history to load
    await driver.wait(until.elementLocated(By.css('.message')), 10000);
    
    // Check that our previous messages are still there
    const messagesAfterRefresh = await driver.findElements(By.css('.message'));
    assert.strictEqual(messagesAfterRefresh.length >= 4, true, 'Chat history should persist after refresh');
  });
  
  /**
   * E2E Test 2: Test the polling mechanism for response retrieval
   */
  it('should poll for responses when a message is sent', async function() {
    const inputField = await driver.findElement(By.css('input.form-control'));
    const sendButton = await driver.findElement(By.css('button[type="submit"]'));
    
    // Send a message that might take time to process
    await inputField.sendKeys('Analyze my spending patterns for the last 3 months');
    await sendButton.click();
    
    // Initially we should see a "Thinking..." message
    await driver.wait(until.elementLocated(By.css('.bot-message')), 5000);
    const initialBotMessage = await driver.findElement(By.css('.bot-message .message-content p'));
    const initialText = await initialBotMessage.getText();
    
    // The text might be "Thinking..." or it might already be the response
    if (initialText === 'Thinking...') {
      // Wait for the real response to replace the "Thinking..." message
      // This might take longer as it involves the complete flow with OpenAI
      await driver.wait(
        async () => {
          const currentText = await driver.findElement(By.css('.bot-message .message-content p')).getText();
          return currentText !== 'Thinking...';
        },
        30000, // Allow up to 30 seconds for a response
        'Timed out waiting for the bot to respond'
      );
    }
    
    // Verify we got a real response
    const finalBotMessage = await driver.findElement(By.css('.bot-message .message-content p'));
    const finalText = await finalBotMessage.getText();
    assert.notStrictEqual(finalText, 'Thinking...', 'Bot should provide a real response');
    assert.strictEqual(finalText.length > 10, true, 'Bot response should be substantial');
  });
});
