import React, { Component } from 'react';
import { isNil, filter } from 'lodash';
import { withRouter } from 'react-router-dom';
import { PROFILE_TABS } from 'AppConstants';
import { Loading } from 'AppComponents';
import { ProfileTab } from './ProfileTab';
import connect from './connect';

class ProfileTabs extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      hoveredProfileType: void(0),
      hasTabPost: void(0),
    };
  }

  onHover = (e, hasTabPost) => {
    const hoveredProfileType = e.target.closest('.profile-tab-container').getAttribute('data-icon');
    this.setState({
      hoveredProfileType,
      hasTabPost,
    })
  }

  onLeave = () => {
    this.setState({
      hoveredProfileType: void(0),
      hasTabPost: void(0),
    })
  }

  onSelectProfileTab = (e) => {
    const { drafts, posts, ownUserColony } = this.props;
    const selectedProfileTabType = e.target.closest('.profile-tab-container').getAttribute('data-icon');
    const tabID = ownUserColony.icons[selectedProfileTabType];
    if (posts[tabID]) {
      this.props.setSelectedPost({
        id: tabID,
        isDraft: false,
      })
    }
    else if (drafts[tabID]) {
      this.props.setSelectedPost({
        id: tabID,
        isDraft: true,
      })
    }
    else {
      this.props.setProfileTabType({
        type: selectedProfileTabType,
      })
    }
    this.props.history.push('/home/post/editTab');
  }

  renderText() {
    const { hoveredProfileType, hasTabPost } = this.state;
    if (isNil(hoveredProfileType)) {
      return '';
    }
    if (hasTabPost) {
      return `edit your ${hoveredProfileType} tab`;
    }
    return `create your ${hoveredProfileType} tab`;
  }

  render() {

    const { ownUserColony, ui, posts } = this.props;
    if (!ui.ownUserPostsLoaded) {
      return (
        <Loading />
      )
    }
    return (
      <div style={{ position: 'relative', height: '100%', width: '100%' }}>
        <div style={{
          width: '100%',
          height: 400,
          position: 'absolute',
          top: '20%',
          display: 'flex',
          flexDirection: 'column',
        }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 300,
        }}>
          {PROFILE_TABS.map(profileTab => {
            const tabID = ownUserColony.icons[profileTab.type];
            const hasTabPost = !isNil(posts[tabID]);
            return (
              <ProfileTab
                data={profileTab}
                key={profileTab.type}
                ownUserIcons={ownUserColony.icons}
                onHover={this.onHover}
                onLeave={this.onLeave}
                onSelect={this.onSelectProfileTab}
                hasTabPost={hasTabPost}
              />
            )
          })}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {this.renderText()}
        </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(ProfileTabs));
