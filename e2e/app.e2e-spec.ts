import { ChatApplicationPage } from './app.po';

describe('chat-application App', function() {
  let page: ChatApplicationPage;

  beforeEach(() => {
    page = new ChatApplicationPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
