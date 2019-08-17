import React, { Component } from 'react';
import { View, Text,StyleSheet,Linking} from 'react-native';
import moment from 'moment';
import { Card, Button } from 'react-native-elements';
import { Icon } from 'react-native-elements';

export default class FeedItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onPress = url => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log(`Don't know how to open URL: ${url}`);
      }
    });
  };

  render() {
      const {item: 
        {title,urlToImage,source,content,publishedAt,url}
        } =this.props;
    return (
        <Card style={styles.container} title={title} image={{uri:urlToImage}}>
            <View style={styles.row}>
                <Text style={styles.label}>Source</Text>
                <Text style={styles.info}>{source.name}</Text>
            </View>
                <Text style={styles.containerFlex}>{content} </Text>
            <View style={styles.row}>
                <Text style={styles.label}>Published</Text>
                <Text style={styles.info}>
                    {moment(publishedAt).format('LLL')}
                </Text>
            </View>
            <Button icon={<Icon />} title="Read more" backgroundColor="#03A9F4" onPress={() => this.onPress(url)}/>
        </Card>
    );
  }
}

const styles = StyleSheet.create({
    containerFlex: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    container: {
      flex: 1,
      marginTop: 40,
      alignItems: 'center',
      backgroundColor: '#fff',
      justifyContent: 'center'
    },
    header: {
      height: 30,
      width: '100%',
      backgroundColor: 'pink'
    },
    row: {
      flexDirection: 'row'
    },
    label: {
      fontSize: 16,
      color: 'black',
      marginRight: 10,
      fontWeight: 'bold'
    },
    info: {
      fontSize: 16,
      color: 'grey'
    }
  });