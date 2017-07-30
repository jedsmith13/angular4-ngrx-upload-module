import { Dashboard.ClientPage } from './app.po';

describe('dashboard.client App', () => {
  let page: Dashboard.ClientPage;

  beforeEach(() => {
    page = new Dashboard.ClientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
