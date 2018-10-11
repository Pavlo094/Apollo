import React, { Component } from 'react';
import { map, isNil } from 'lodash';
import { withRouter } from 'react-router-dom';
import { TidBit, Loading } from 'AppComponents';
import connect from './connect';
import './styles.css';

class TidBits extends Component {

  constructor(props, context) {
    super(props, context);
  }

  routeToTidbitPost = (id) => {
    this.props.setSelectedTidbit({
      id,
    })
      .catch(err => {
        console.log('err in setSelectedTidbit', err);
        alert('there was an error retreiving your tidbit');
      })
    this.props.history.push('/home/post/editTidBit');
  }

  render() {
    const { tidbits } = this.props;
    if (isNil(tidbits)) {
      return (
        <Loading />
      )
    }
    return (
      <div className='tidbits-container'>
        {map(tidbits, (tidbit, index) => {
          return (
            <TidBit
              data={tidbit}
              onOrderChange={this.props.updateTidBit}
              key={index}
              onTouchPost={this.routeToTidbitPost}
            />
          )
        } )}
      </div>
    );
  }
}

export default withRouter(connect(TidBits));
