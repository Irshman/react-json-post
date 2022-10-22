import React, { Component } from 'react';
import './modal.css';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.items,
      title: props.title,
      body: props.body,
      id: props.id,
      disabled: true,
      textValue: '',
    };

    this.showTextAreaValue = this.showTextAreaValue.bind(this);
    this.showInputValue = this.showInputValue.bind(this);
  }

  showTextAreaValue(event) {
    this.setState({ body: event.target.value });
  }

  showInputValue(event) {
    this.setState({ title: event.target.value });
  }

  render() {
    return (
      <div
        onClick={() => this.props.updateData(this.state.activeModal)}
        className={'modal active'}>
        <div onClick={(e) => e.stopPropagation()} className='modal__content'>
          <h2 className='modal__title'>{this.state.title}</h2>
          <input
            className='input'
            disabled={this.state.disabled}
            onChange={this.showInputValue}
            value={this.state.title}></input>
          <div className='modal__body'>
            <textarea
              className='textarea'
              value={this.state.body}
              onChange={this.showTextAreaValue}
              disabled={this.state.disabled}>
              {this.state.body}
            </textarea>
          </div>
          <button
            className='button__close'
            onClick={() => this.props.updateData(this.state.activeModal)}>
            &times;
          </button>
          <button
            className='button__editor'
            onClick={() => this.setState({ disabled: false })}>
            Редактировать
          </button>
          <button
            className='button__editor disableds'
            type='button'
            onClick={() => {
              this.setState({ disabled: true });
              this.props.updateText(
                this.state.id,
                this.state.body,
                this.state.title
              );
              this.props.updateData(this.state.activeModal);
              alert('Пост успешно изменен');
            }}
            disabled={this.state.disabled ? true : false}>
            Готово
          </button>
          <button
            className='button__delete'
            onClick={() => {
              this.props.deleteData(this.props.id);
              this.props.updateData(this.state.activeModal);
              alert('Пост успешно удален');
            }}>
            Видалити
          </button>
        </div>
      </div>
    );
  }
}

export default Modal;
