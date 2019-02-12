/** ニュース追加ボタンコンポーネント プロパティ定義 */
export interface IAddNewsButtonProps {
  
  /** ボタンクリックイベント
   * @param pageName - string : ページ名
   */
  buttonEvent : (pageName : string) => Promise<void>;

}
