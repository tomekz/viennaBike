import { ViennaBikePage } from './app.po';

describe('vienna-bike App', () => {
  let page: ViennaBikePage;

  beforeEach(() => {
    page = new ViennaBikePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('vb works!');
  });
});
