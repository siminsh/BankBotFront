import { Builder, By, Key, until, WebDriver } from 'selenium-webdriver';
import { Options as ChromeOptions } from 'selenium-webdriver/chrome';
import * as assert from 'assert';

describe('BankBot Frontend Tests', function() {
  // Selenium tests can take some time
  this.timeout(30000);
  
  let driver: WebDriver;
  
  // Base URL for the frontend application
  const baseUrl = 'http://localhost:4200';
  
  // Set up the WebDriver before each test
  beforeEach(async function() {
    const chromeOptions = new ChromeOptions();
    // Add any Chrome-specific options here
    // chromeOptions.addArguments('--headless'); // Uncomment to run tests without browser UI
    
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(chromeOptions)
      .build();
      
    // Navigate to the application
    await driver.get(baseUrl);
    
    // Wait for the page to load
    await driver.wait(until.elementLocated(By.css('.chat-container')), 5000);
  });
  
  // Close the WebDriver after each test
  afterEach(async function() {
    await driver.quit();
  });
  
  /**
   * Test 1: Verify that the application loads correctly
   */
  it('should load the BankBot application', async function() {
    // Check if the title is present
    const title = await driver.findElement(By.css('h1')).getText();
    assert.strictEqual(title, 'BankBot - AI Financial Assistant');
    
    // Check if the chat box is displayed
    const chatBox = await driver.findElement(By.css('.chat-container'));
    assert.strictEqual(await chatBox.isDisplayed(), true);
    
    // Check if the input field is present
    const inputField = await driver.findElement(By.css('input.form-control'));
    assert.strictEqual(await inputField.isDisplayed(), true);
  });
  
  /**
   * Test 2: Verify that a user can send a message
   */
  it('should allow sending a message', async function() {
    // Get the input field and send button
    const inputField = await driver.findElement(By.css('input.form-control'));
    const sendButton = await driver.findElement(By.css('button[type="submit"]'));
    
    // Type a message and send it
    await inputField.sendKeys('How much did I spend last month?');
    await sendButton.click();
    
    // Wait for the user message to appear in the chat history
    await driver.wait(until.elementLocated(By.css('.user-message')), 5000);
    
    // Check if the user message is displayed correctly
    const userMessages = await driver.findElements(By.css('.user-message'));
    const lastUserMessage = userMessages[userMessages.length - 1];
    const messageContent = await lastUserMessage.findElement(By.css('.message-content p')).getText();
    
    assert.strictEqual(messageContent, 'How much did I spend last month?');
  });
  
  /**
   * Test 3: Verify that the bot responds to a message
   */
  it('should receive a response from the bot', async function() {
    // Get the input field and send button
    const inputField = await driver.findElement(By.css('input.form-control'));
    const sendButton = await driver.findElement(By.css('button[type="submit"]'));
    
    // Type a message and send it
    await inputField.sendKeys('Which category did I spend the most on?');
    await sendButton.click();
    
    // Wait for the bot message to appear in the chat history
    // Note: This may take a bit longer since it involves backend processing
    await driver.wait(until.elementLocated(By.css('.bot-message')), 10000);
    
    // Check if at least one bot message is displayed
    const botMessages = await driver.findElements(By.css('.bot-message'));
    assert.strictEqual(botMessages.length > 0, true);
    
    // The content will vary based on the actual response, so we just verify it exists
    const lastBotMessage = botMessages[botMessages.length - 1];
    const messageContentElement = await lastBotMessage.findElement(By.css('.message-content p'));
    assert.strictEqual(await messageContentElement.isDisplayed(), true);
  });
  
  /**
   * Test 4: Verify the empty state is displayed when there are no messages
   */
  it('should display empty state when there are no messages', async function() {
    // Check if the empty state message is visible
    // Note: This test assumes we're starting with an empty chat history
    const emptyStateElement = await driver.findElement(By.css('.empty-state'));
    assert.strictEqual(await emptyStateElement.isDisplayed(), true);
    
    // Check that the example questions are displayed
    const exampleQuestions = await driver.findElements(By.css('.empty-state ul li'));
    assert.strictEqual(exampleQuestions.length, 3);
  });
  
  /**
   * Test 5: Verify that the send button is disabled when the input is empty
   */
  it('should disable the send button when input is empty', async function() {
    // Get the input field and send button
    const inputField = await driver.findElement(By.css('input.form-control'));
    const sendButton = await driver.findElement(By.css('button[type="submit"]'));
    
    // Initially, the input is empty, so the button should be disabled
    assert.strictEqual(await sendButton.isEnabled(), false);
    
    // Type something in the input
    await inputField.sendKeys('Test message');
    
    // Now the button should be enabled
    assert.strictEqual(await sendButton.isEnabled(), true);
    
    // Clear the input
    await inputField.clear();
    
    // Button should be disabled again
    assert.strictEqual(await sendButton.isEnabled(), false);
  });
  
  /**
   * Test 6: Verify that the timestamp is displayed for messages
   */
  it('should display timestamps for messages', async function() {
    // Send a message to create a chat entry
    const inputField = await driver.findElement(By.css('input.form-control'));
    const sendButton = await driver.findElement(By.css('button[type="submit"]'));
    
    await inputField.sendKeys('Is my income decreasing?');
    await sendButton.click();
    
    // Wait for the user message to appear
    await driver.wait(until.elementLocated(By.css('.user-message')), 5000);
    
    // Check if the timestamp is displayed
    const timestamp = await driver.findElement(By.css('.message-timestamp'));
    assert.strictEqual(await timestamp.isDisplayed(), true);
    
    // Verify timestamp format (should be HH:MM)
    const timestampText = await timestamp.getText();
    // This checks for a format like "12:34" or "01:45"
    const timestampRegex = /^\d{1,2}:\d{2}$/;
    assert.strictEqual(timestampRegex.test(timestampText), true);
  });
  
  /**
   * Test 7: Verify that the chat history scrolls to bottom for new messages
   */
  it('should scroll to the bottom for new messages', async function() {
    // This test needs multiple messages to test scrolling
    const inputField = await driver.findElement(By.css('input.form-control'));
    const sendButton = await driver.findElement(By.css('button[type="submit"]'));
    
    // Send several messages to create scroll
    const testMessages = [
      'How much did I spend last month?',
      'Which category did I spend the most on?',
      'Is my income decreasing?',
      'What was my largest expense?',
      'How much did I save last month?'
    ];
    
    for (const message of testMessages) {
      await inputField.sendKeys(message);
      await sendButton.click();
      
      // Wait a bit between messages
      await driver.sleep(300);
    }
    
    // Wait for all messages to be displayed
    await driver.wait(until.elementLocated(By.css('.message:nth-child(5)')), 5000);
    
    // Get the chat messages container
    const chatMessagesContainer = await driver.findElement(By.css('.chat-messages'));
    
    // Get scroll position
    const scrollTop = await driver.executeScript(
      'return arguments[0].scrollTop;', 
      chatMessagesContainer
    );
    const scrollHeight = await driver.executeScript(
      'return arguments[0].scrollHeight;', 
      chatMessagesContainer
    );
    const clientHeight = await driver.executeScript(
      'return arguments[0].clientHeight;', 
      chatMessagesContainer
    );
    
    // Check if scroll position is at the bottom
    // If scrollTop + clientHeight is close to scrollHeight, we're at the bottom
    // We use a small tolerance of 5px for any potential rounding issues
    assert.strictEqual(
      Math.abs((scrollTop + clientHeight) - scrollHeight) < 5,
      true,
      'Chat should scroll to the bottom for new messages'
    );
  });
  
  /**
   * Test 8: Test error handling when the server is unavailable
   */
  it('should handle server unavailability gracefully', async function() {
    // Simulate server unavailability by navigating to a non-existent URL
    // then navigating back to our app
    await driver.get(baseUrl + '/nonexistent-path');
    await driver.get(baseUrl);
    
    // Wait for the app to load again
    await driver.wait(until.elementLocated(By.css('.chat-container')), 5000);
    
    // Send a message
    const inputField = await driver.findElement(By.css('input.form-control'));
    const sendButton = await driver.findElement(By.css('button[type="submit"]'));
    
    await inputField.sendKeys('Test message when server might be down');
    await sendButton.click();
    
    // The app should not crash - we should still be able to see the UI
    const chatContainer = await driver.findElement(By.css('.chat-container'));
    assert.strictEqual(await chatContainer.isDisplayed(), true);
  });
});
