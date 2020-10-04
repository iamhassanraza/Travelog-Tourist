import React, {Component} from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import PlanItem from '../components/PlanItem';
import LoadingIndicator from '../components/LoadingIndicator';

export default class PlanCard extends Component {
  state = {
    plan: null,
  };

  componentDidMount() {
    fetch(`https://travelog-pk.herokuapp.com/tours/plan/${this.props.tour_id}`)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          plan: responseJson,
        });
      })
      .catch(err => console.log(err));
  }

  RenderPlan = array => {
    return array.map((item, index) => (
      <PlanItem
        id={item.plan_id}
        lastitem={array.length - 1 === index ? true : false}
        details={item.description}
        title={item.title}
      />
    ));
  };

  // renderLoading = ()=>  <ActivityIndicator size="large" color="#00ff00" />

  render() {
    return (
      <View>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Plan</Text>

        {this.state.plan ? (
          this.RenderPlan(this.state.plan)
        ) : (
          <LoadingIndicator />
        )}
      </View>
    );
  }
}
