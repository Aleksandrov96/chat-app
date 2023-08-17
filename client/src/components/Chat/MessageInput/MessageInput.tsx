/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useContext, useState } from 'react';
import { StoresContext } from 'context/StoresContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { observer } from 'mobx-react-lite';
import { ChatService } from 'services/chat-service';
import { useForm } from 'react-hook-form';
import { useReceiver } from 'hooks/useReceiver';
import { throttle } from 'utils/throttle';
import { IUser } from 'interfaces/IUser';
import { useIntl } from 'react-intl';
import { IFile } from 'interfaces/IFiles';
import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react';
import { useTheme } from 'hooks/useTheme';
import Content from '../../common/Content/Content';
import DeleteAttachedButton from '../../common/Buttons/DeleteAttachedButton';
import SendButton from '../../common/Buttons/SendButton';
import EmojiButton from '../../common/Buttons/EmojiButton';
import './messageInput.scss';

function MessageInput() {
  const {
    authStore, chatStore, socketStore, uiStore,
  } = useContext(StoresContext);
  const { receiver } = useReceiver(chatStore?.currentChatroom.participants as IUser[]);
  const { onThemeChange } = useTheme();
  const intl = useIntl();

  const [fileInfo, setFileInfo] = useState<IFile | null>(null);
  const [showPicker, setShowPicker] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    resetField,
  } = useForm<{ content: string, file?: FileList }>({
    mode: 'onChange',
  });

  const inputValue = watch('content');
  const files = watch('file');

  const onSubmit = async (data: { content: string, file?: FileList }, e: any): Promise<void> => {
    if (receiver) {
      const response = await ChatService.sendMessage(
        data.content,
        chatStore?.currentChatroom._id as string,
        authStore?.user._id as string,
        receiver._id,
        data.file,
      );
      if (response !== null) {
        chatStore?.displayMessage(response);
      }
    }
    reset();
    setFileInfo(null);
  };

  const typingHandler = (e: any): void => {
    throttle(() => {
      socketStore?.socket.emit('isTyping', receiver?._id);
    }, 1000);
  };

  const fileHandler = (e: { target: { files: File[]; }; }): void => {
    if (e.target.files && e.target.files[0]) {
      setFileInfo({
        url: URL.createObjectURL(e.target.files[0]),
        mimetype: e.target.files[0].type,
      });
    }
  };

  const onEmojiClick = (emojiData: EmojiClickData): void => {
    setValue('content', inputValue + emojiData.emoji);
    setShowPicker(false);
  };

  const onShowEmojiPicker = (): void => {
    setShowPicker(!showPicker);
  };

  const deleteAttachedFile = (): void => {
    resetField('file');
    setFileInfo(null);
  };

  const isValid = (): boolean => {
    if (inputValue.trim() === '' && files?.length === 0) {
      return false;
    } return true;
  };

  const onEnterDown = async (e: { charCode: any; keyCode: any; shiftKey: any }): Promise<void> => {
    if (((e.charCode || e.keyCode) === 13 && !e.shiftKey) && isValid()) {
      await onSubmit({ content: inputValue, file: files }, e);
    }
  };

  return (
    <>
      {
        fileInfo && (
        <div className="files__preview">
          <div className="item">
            <Content file={fileInfo} />
            <DeleteAttachedButton deleteAttachedFile={deleteAttachedFile} />
          </div>
        </div>
        )
      }
      <div
        className="emojiPicker"
        data-testid="emoji-picker"
      >
        {showPicker
        && (
        <EmojiPicker
          onEmojiClick={onEmojiClick}
          theme={uiStore?.theme === 'light' ? Theme.LIGHT : Theme.DARK}
        />
        )}
      </div>
      <div className="inputField">
        <form
          role="presentation"
          onSubmit={handleSubmit(onSubmit)}
          className="messageForm"
          encType="multipart/form-data"
          onKeyDown={onEnterDown}
        >
          <textarea
            placeholder={intl.formatMessage({ id: 'messageInput-placeholder' })}
            className={onThemeChange('messageForm__textarea')}
            {...register('content', {
              required: true,
              onChange(event) {
                typingHandler(event);
              },
            })}
          />
          <div className="messageForm__icons">
            <EmojiButton onShowEmojiPicker={onShowEmojiPicker} />
            <label htmlFor="file" className={onThemeChange('messageForm__icons-icon')}>
              <input
                type="file"
                style={{ display: 'none' }}
                id="file"
                accept=".jpg, .jpeg, .png, .mpeg, .mp3, .mp4, .wav, .gif"
                data-testid="file-input"
                {...register('file', {
                  required: false,
                  onChange(event) {
                    fileHandler(event);
                  },
                })}
              />
              <FontAwesomeIcon
                icon={faPaperclip}
                data-testid="file-upload-icon"
              />
            </label>
            <SendButton isValid={isValid} />
          </div>
        </form>
      </div>

    </>
  );
}

export default observer(MessageInput);
