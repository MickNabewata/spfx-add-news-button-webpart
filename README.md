## add-news-button

This project is a sample code to create a modern news page.  
This sample shows you how to create a modern news page using SPFx.

### Building the code

```bash
git clone https://github.com/MickNabewata/spfx-add-news-button-webpart.git
npm i
npm i -g gulp
gulp
```

### What can do using this sample

This web part provide a button create a news , add a section and webparts in created news page.
Note that this sample does not have the function to publish pages,  
so if you are managing a minor version in the library,  
be aware that the draft page will be created.

**image1:Add News Page Button**  
<kbd><img src="https://raw.githubusercontent.com/MickNabewata/spfx-add-news-button-webpart/images/2.png" /></kbd>  
  
**image2:You can find the news in _layouts/15/news.aspx**  
<kbd><img src="https://raw.githubusercontent.com/MickNabewata/spfx-add-news-button-webpart/images/3.png" /></kbd>  
  
**image3:Created news page**
<kbd><img src="https://raw.githubusercontent.com/MickNabewata/spfx-add-news-button-webpart/images/4.png" /></kbd>  

### How to create a modern news page

At first, you should create a Client Side Page.  
And then, update properties of the page.  
The minimum properties to update are below.  
To update page properties, you shold get ListItemEntityTypeFullName first.  

- PromotedState  
This property should be updated to "2".  
  
This process can be implemented by any other solutions.  
(e.x. SPFx, CSOM, REST, ...)  
  
Here is Microsoft Docs page.  
[Customizing "modern" site pages]: https://docs.microsoft.com/en-us/sharepoint/dev/solution-guidance/modern-experience-customizations-customize-pages#programming-modern-pages "Customizing "modern" site pages"  

### How to create a section and webparts in news page
  
You can use PnP for implement this.  
ClientSidePage.addSection() method help you to add sections on your page.  
CanvasSection.addColumn(factor : CanvasColumnFactorType) method is used to add columns in a section.  
CanvasColumnFactorType is defined as below.  
    /**
    * Column size factor. Max value is 12 (= one column), other options are 8,6,4 or 0
    */
    export declare type CanvasColumnFactorType = 0 | 2 | 4 | 6 | 8 | 12;
  
Note that the total value of CanvasColumnFactorType in one section should be 12.  
Otherwise, you can not edit the created section on the web page.  
As long as you keep this rule, you can also implement a layout that can not be set using default edit page of sharepoint.  
(Eg 4 columns in one section etc)  
However, be aware that these layouts can not be set when using the edit page.