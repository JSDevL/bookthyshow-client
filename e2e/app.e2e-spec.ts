import { LearnAngularV2Page } from './app.po';

describe('learn-angular-v2 App', () => {
  let page: LearnAngularV2Page;

  beforeEach(() => {
    page = new LearnAngularV2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
