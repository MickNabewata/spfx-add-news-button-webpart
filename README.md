## add-news-button

This project is a sample code to create a modern news page.  
This sample shows you how to create a modern news page using SPFx or any other method.

### Building the code

```bash
git clone https://github.com/MickNabewata/spfx-add-news-button-webpart.git
npm i
npm i -g gulp
gulp
```

### What can do using this sample

This web part provide a button create a news.

<img src="https://raw.githubusercontent.com/MickNabewata/spfx-add-news-button-webpart/images/2.png" style="border: 1px solid gray; max-width:100%" />  
<div style="text-align:center;">image1:Add News Page Button</div>
  
<img src="https://raw.githubusercontent.com/MickNabewata/spfx-add-news-button-webpart/images/3.png" style="border: 1px solid gray; max-width:100%" />  
<div style="text-align:center;">image2:You can find the news in _layouts/15/news.aspx</div>
  
<img src="https://raw.githubusercontent.com/MickNabewata/spfx-add-news-button-webpart/images/4.png" style="border: 1px solid gray; max-width:100%" />  
<div style="text-align:center;">image3:Created news page</div>

### How to create a modern news page

first, you should create a Client Side Page.  
And then, update properties of the page.  
The minimum properties to update are below.

- PromotedState
This property should be updated to "2".

To update page properties, you shold get ListItemEntityTypeFullName first.