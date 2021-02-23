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
      <div className='main'>
        <TransactionVolumeAtTheDay data={this.state.data} />
      </div>
    );
  }
}

export default App;
