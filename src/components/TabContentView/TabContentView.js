import React from 'react';
import PropTypes from 'prop-types';
import { Pane, Paragraph, Heading, Tablist, Tab } from 'evergreen-ui';
import Loader from '../Loader';

class TabContentView extends React.Component {   
  state = {
    basis: 160,
    single: null,
    selectedIndex: 0
  };

  getComponent = (row) => {
    const { selectedIndex } = this.state;
    const { tabs } = this.props;
    const truncateProps = {
      // maxWidth: 180,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    };

    return (
      <Pane height={120}>
        <Tablist marginBottom={16} flexBasis={240} marginRight={24}>
          {tabs && tabs.length && tabs.map((tab, index) => (
            <Tab
              key={`tab-${index}`}
              id={tab}
              onSelect={() => this.setState({ selectedIndex: index })}
              isSelected={index === this.state.selectedIndex}
              aria-controls={`panel-${tab}`}
            >
              {tab.name}
            </Tab>
          ))}
        </Tablist>
        <Pane padding={16}>
          {tabs && tabs.length && tabs.map((tab, index) => (
            <Pane
              key={`content-${index}`}
              id={`panel-${tab}`}
              role="tabpanel"
              aria-labelledby={tab}
              aria-hidden={index !== selectedIndex}
              display={index === selectedIndex ? 'block' : 'none'}
            >
              {tab.component}
            </Pane>
          ))}
        </Pane>
      </Pane>
    );
  }

  render() {
    const { loading, details } = this.props;

    const props = {
      width: '100%',
      paddingRight: 16,
      paddingLeft: 16
    };

    return (
      <Pane {...props}>
        {loading ? <Loader /> : this.getComponent(details) }
      </Pane>
    )
  }
}

TabContentView.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    component: PropTypes.element.isRequired
  })).isRequired,
};

export default TabContentView;
