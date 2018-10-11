import React, { Component } from 'react';
import { arrayMove } from 'react-sortable-hoc';
import { ColonyHeader } from './ColonyHeader';
import LiveTidBit from './LiveTidBit';
import TidBitList from './TidBitList';
import './styles.css';

class TidBit extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      livePost: this.props.data.livePost
    }
  }

  componentWillUpdate = (newProps) => {
    if(newProps.data.livePost != this.props.data.livePost) {
      this.setState({
        livePost: newProps.data.livePost
      });
    }
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    let updatedPostList = [...this.props.data.postList, ...this.props.data.unassignedPostList];
    updatedPostList = arrayMove(updatedPostList, oldIndex, newIndex);
    this.props.onOrderChange({
      uuid: this.props.data.uuid,
      postList: updatedPostList,
    })
      .catch(err => {
        console.log('error in onOrderChange', err);
        alert('there was an issue changing tidbit order');
      })
  }

  render() {
    const { onSortEnd } = this;
    const { onTouchPost, data } = this.props;
    return (
      <div className='tidbit-container'>
        <ColonyHeader
          colony={data}
        />
        <LiveTidBit
          data={this.state.livePost}
        />
        <TidBitList
          onSortEnd={onSortEnd}
          posts={data.posts}
          unassignedPosts={data.unassignedPosts}
          distance={3}
          onTouchPost={onTouchPost}
        />
      </div>
    );
  }
}


export default TidBit;
