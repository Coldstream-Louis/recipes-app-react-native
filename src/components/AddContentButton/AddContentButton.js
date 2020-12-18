import React from 'react';
import { TouchableOpacity, Image, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

export default class AddContentButton extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.headerButtonContainer} onPress={this.props.onPress}>
        <Image
          style={styles.headerButtonImage}
          source={require('../../../assets/icons/file.png')}
        />
        <Text>Add a New Section</Text>
      </TouchableOpacity>
    );
  }
}

AddContentButton.propTypes = {
  onPress: PropTypes.func
};