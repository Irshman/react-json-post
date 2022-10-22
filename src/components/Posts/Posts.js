import React, { Component } from 'react';
import Modal from '../Modal/Modal';
import './post.css';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      activeModal: false,
      activeItem: {
        id: null,
        userId: null,
        title: '',
        body: '',
      },
    };

    this.updateData = this.updateData.bind(this);
    this.deleteData = this.deleteData.bind(this);
    this.updateText = this.updateText.bind(this);
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.map((el) => el),
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  updateData(value) {
    this.setState({ activeModal: value });
  }

  deleteData(value) {
    let arr = this.state.items;
    let newArr = arr.filter((item) => item.id !== value);
    this.setState({ items: newArr });
  }

  updateText(id, valueBody, valueTitle) {
    let arr = this.state.items.find((item) => item.id === id);
    let index = this.state.items.indexOf(arr);
    arr.body = valueBody;
    arr.title = valueTitle;
    let localState = this.state.items;
    localState.splice(index, 1, arr);
    this.setState({ items: localState });
  }

  render() {
    return (
      <div className='cards'>
        {this.state.items.map((el) => {
          return (
            <div key={el.id} className='card'>
              <h2 className='card__title'>{el.title}</h2>
              <p className='card__text'>{el.body}</p>
              <button
                className='button'
                onClick={() => {
                  this.setState({
                    activeModal: !this.state.activeModal,
                    activeItem: {
                      id: el.id,
                      userId: el.userId,
                      title: el.title,
                      body: el.body,
                    },
                  });
                }}>
                More
              </button>
            </div>
          );
        })}
        {this.state.activeModal ? (
          <Modal
            title={this.state.activeItem.title}
            body={this.state.activeItem.body}
            id={this.state.activeItem.id}
            items={this.state.items}
            updateData={this.updateData}
            deleteData={this.deleteData}
            updateText={this.updateText}
          />
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default Posts;
