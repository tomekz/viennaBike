import { browser, element, by } from 'protractor';

export class ViennaBikePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('vb-root h1')).getText();
  }
}
