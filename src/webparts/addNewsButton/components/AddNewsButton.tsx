import * as React from 'react';
import styles from './AddNewsButton.module.scss';
import { IAddNewsButtonProps } from './IAddNewsButtonProps';
import { DefaultButton, BaseButton } from 'office-ui-fabric-react/lib/Button';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';

/** ニュース追加ボタンコンポーネント */
export default class AddNewsButton extends React.Component<
  IAddNewsButtonProps,
  { 
    addingPage : boolean, 
    pageName : string, 
    messageBarClassName : string,
    messageBarType : MessageBarType,
    message : string,
    buttonText : string,
    validateError : boolean
  }> {

  /** コンストラクタ */
  constructor(props) {
    super(props);

    this.state = {
      addingPage : false,
      pageName : '',
      messageBarClassName : styles.inVisible,
      messageBarType : MessageBarType.success,
      message : '',
      buttonText : 'Add News Page',
      validateError : false
    };

    this.messageDismiss = this.messageDismiss.bind(this);
    this.validatePageName = this.validatePageName.bind(this);
    this.addNews = this.addNews.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /** レンダリング */
  public render(): React.ReactElement<IAddNewsButtonProps> {
    return (
      <div className={ styles.addNewsButton }>
        <div className={ styles.container }>
          <div className={ styles.containerRow }> 
            <TextField label="PageName" value={ this.state.pageName } onChanged={ this.handleChange } onGetErrorMessage={ this.validatePageName } />
          </div>
          <div className={ styles.containerRow }>
            <DefaultButton
              disabled={ (this.state.addingPage || this.state.validateError) }
              text={ this.state.buttonText }
              onClick={ this.addNews }
            />
          </div>
          <div className={ styles.containerRow }>
            <MessageBar
              className={  this.state.messageBarClassName }
              messageBarType={ this.state.messageBarType }
              isMultiline={ true }
              onDismiss={ this.messageDismiss }
            >{ this.state.message }</MessageBar>
          </div>
        </div>
      </div>
    );
  }

  /** メッセージ削除イベント */
  private messageDismiss(e : React.MouseEvent<BaseButton>) : void
  {
    this.setState({ messageBarClassName : styles.inVisible });
  }

  /** ページ名バリデータ */
  private validatePageName(value : string) : string
  {
    if(value.length > 0)
    {
      this.setState({ validateError : false });
      return '';
    }
    else
    {
      this.setState({ validateError : true });
      return 'please enter the pageName.';
    }
  }

  /** ニュース追加ボタンイベント */
  private addNews(e : React.MouseEvent<BaseButton>) : void
  {
    // 多重クリック防止
    this.setState({ addingPage : true, buttonText : 'Please wait ...' });

    // プロパティで指定されたメソッドを実行
    try
    {
      this.props.buttonEvent(this.state.pageName).then(
        () => {
          // 成功
          this.setState({ 
            addingPage : false, 
            messageBarClassName : styles.visible,
            messageBarType : MessageBarType.success, 
            message : 'ページ ' + this.state.pageName + ' の追加に成功しました。',
            buttonText : 'Add News Page',
            validateError : true,
            pageName : '' });
        },
        (err) => {
          // 失敗
          this.setState({ 
            addingPage : false, 
            messageBarClassName : styles.visible,
            messageBarType : MessageBarType.error, 
            message : 'ページ ' + this.state.pageName + ' の追加に失敗しました。\r\n' + err,
            buttonText : 'Add News Page',
            validateError : true,
            pageName : '' });
        }
      );
    }
    catch(err)
    {
      // 失敗
      this.setState({ 
        addingPage : false, 
        messageBarClassName : styles.visible,
        messageBarType : MessageBarType.error, 
        message : err,
        buttonText : 'Add News Page',
        validateError : true,
        pageName : '' });
    }
  }

  /** テキストフィールド変更イベントハンドラ */
  private handleChange(val) {
    this.setState({
      pageName: val
    });
  }
}
