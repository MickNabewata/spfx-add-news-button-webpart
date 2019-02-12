import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'AddNewsButtonWebPartStrings';
import AddNewsButton from './components/AddNewsButton';
import { IAddNewsButtonProps } from './components/IAddNewsButtonProps';
import { sp, ItemUpdateResult, TemplateFileType, FileAddResult, ClientSidePage, Item } from '@pnp/sp';

export interface IAddNewsButtonWebPartProps {
  description: string;
}

/** ニュース追加Webパーツクラス */
export default class AddNewsButtonWebPart extends BaseClientSideWebPart<IAddNewsButtonWebPartProps> {

  /** レンダリング */
  public render(): void {
    const element: React.ReactElement<IAddNewsButtonProps > = React.createElement(
      AddNewsButton,
      {
        buttonEvent : this.addNewPage
      }
    );

    ReactDom.render(element, this.domElement);
  }

  /** 初期化イベント */
  public onInit() : Promise<void> {
    return super.onInit().then(_ => {
      // PnPjsの初期化
      sp.setup({
        spfxContext: this.context
      });
    });
  }

  /** 終了イベント */
  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  /** データバージョン */
  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  /** ページ追加 */
  protected addNewPage(pageName : string) : Promise<void> {
    return new Promise<void>((resolve: () => void, reject: (reason?: any) => void) => {
      
      // ページ追加
      try
      {
        sp.web.lists.getByTitle('Site Pages').getListItemEntityTypeFullName().then(
          (entityTypeName : string) => {
            sp.web.addClientSidePage(pageName + '.aspx', pageName).then(
              (page : ClientSidePage) => {
                page.getItem().then(
                  (item : Item) => {
                    item.update(
                      { 
                        Title : pageName,
                        PromotedState : '2'
                      },
                      '*',
                      entityTypeName
                    ).then(
                      (result: ItemUpdateResult) => {
                        // 成功
                        resolve();
                      }, 
                      (err) => {
                        // 失敗
                        reject(err);
                      });
                  },
                  (err) => {
                    // 失敗
                    reject(err);
                  }
                );
              }, 
              (err) => {
                // 失敗
                reject(err);
              }
            );
          },
          (err) => {
            // 失敗
            reject(err);
          }
        );
      }
      catch(err)
      {
        // 失敗
        reject(err);
      }
    });
  }

  /** プロパティ構成 */
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
