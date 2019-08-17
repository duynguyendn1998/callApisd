import React, { Component } from 'react';
import { View, Text, StyleSheet,ActivityIndicator,FlatList } from 'react-native';
import FeedItem from './components/FeedItem';
import { Button,Icon } from 'react-native-elements';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFreshing:false,
      isLoading:true,
      listArticles:[],
      totalResult:0,
      pageNumber:1,
      loadMore:true,
    };
  }

  componentDidMount = async () =>{
    const {pageNumber}= this.state;
    this.callApi(pageNumber);
  }

  callApi = async pageNumber =>{
    try{
      const {listArticles} = this.state;
      let url=`https://newsapi.org/v2/top-headlines?country=us&apiKey=6eec2f7fe6cd4c40a3fef8f33f5778fe&page=${pageNumber}`
      const response = await fetch( url );
      const jsonResponse = await response.json();
      this.setState({
        listArticles:listArticles.concat(jsonResponse.articles),
        pageNumber:pageNumber,
        totalResult:jsonResponse.articles.length,
        isLoading:false,
      });
    }
    catch(error) {
      setHasApiError(true);
  }
}

  getNews = async () => {
    const {pageNumber} = this.state;
    const newPage= pageNumber+1;
    this.callApi(newPage);
  };

  renderItem=({item})=>{
    return <FeedItem item={item} />
  };

  onRefresh = async()=>{
    const newPage=1;
    await this.setState({
      listArticles:[],
      pageNumber:1,
      isFreshing:false,
    });
    setTimeout(() => {
        this.callApi(newPage)
    },2000);
  };
  renderFooter= ()=>{
    return(
      <ActivityIndicator size='large' color='blue' animating={true}/>
    );
  };

  render() {
    const{isLoading,totalResult,listArticles,isFreshing}=this.state;
    if(isLoading)
    {
      return(
        <View style={styles.container}>
          <ActivityIndicator size='large' color='blue' animating={isLoading}/>
        </View>
      );
    }
    if(totalResult===0)
    {
      return (
        <View style={styles.container}>
          <Text style={styles.label}>Đã hết bài mới rồi!!!!!</Text>
          <Button icon={<Icon />} title="Come Back" backgroundColor="#03A9F4"
           onPress={()=>{ this.onRefresh()}}/>
        </View>
      )
    }
    return (
          <View style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.label}>Articles Count:</Text>
            <Text style={styles.info}>{totalResult}</Text>
          </View>
          <FlatList
            data={listArticles}
            onEndReached={this.getNews}
            onEndReachedThreshold={0.2} 
            renderItem={this.renderItem}
            keyExtractor={item => item.title}
            ListFooterComponent={this.renderFooter()}
            onRefresh={this.onRefresh}
            refreshing={isFreshing}
          />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
