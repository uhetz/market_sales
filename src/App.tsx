import {
  Component
} from 'react';
import { 
  THubState
} from './types';
import * as d3 from 'd3';

import './App.css';
import TransactionVolumeAtTheDay from './charts/TransactionVolumeAtTheDay';

class App extends Component<{}, THubState> {
  state: THubState = {
    data: [],
  }

  componentDidMount() {
    d3.csv('./supermarket_sales.csv').then((data) => {
      this.setState({ data })
    })
  }

  componentDidUpdate() {
  }
  
  render() {
    return (
      <div className='container'>
        <div className='header'>
          <h1>Sales of a supermarket</h1>
          <h3>Transactions while a day divided by hours</h3>
        </div>

        <div className='main'>
          <div className='chart'>
            <TransactionVolumeAtTheDay data={this.state.data} />
          </div>
        </div>

        <div className='footer'>
          <div className='info-container'>
            <p>Dataset from <a href="https://www.kaggle.com/aungpyaeap/supermarket-sales">kaggle</a></p>
            <p><a href="https://twitter.com/uhhetz">twitter</a></p>
            <p><a href="https://hermhetzel@gmail.com">mail me</a></p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
