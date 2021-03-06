# LookUp Slash Command for Mixmax

This is an open source Mixmax LookUp Command.

## Clearbit Key
Go to config->settings.js and replace the dummy Clearbit key with a valid key.

## Running locally

1. Use Node Version 0.12.7
2. Install using `npm install`
2. Run using `node index.js`

## Verify
Verify it is working by visiting ```http://localhost:8080/api/clearbit/typeahead?text=rishi``` and ```http://localhost:8080/api/clearbit/resolver?text=rishi@srvs.co``` in your browser.

## Dashboard Integration
Visit your Mixmax dashboard. Click on `Integrations` on left hand side, then click on `Add Slack Command`. Fill in the following values in the form:
  - **Name** - Look Up
  - **Command** - lookup
  - **Parameter placeholder** - [Email Address]
  - **Typeahead API URL** -  ```http://localhost:8080/api/clearbit/typeahead```
  - **Resolver API URL** - ```http://localhost:8080/api/clearbit/resolver```

## Example

```/lookup rishi@srvs.co```
