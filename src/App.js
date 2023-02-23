import './App.css';
import List from './List';
import 'semantic-ui-css/semantic.min.css'
import { Container, Divider, Segment } from 'semantic-ui-react';
import Service from './Service';
import config from './config.json';

function App() {
  const service = new Service();
  return (
    <div className="App">
      <header className="App-header">
        <Container className='Content'>
        <Segment raised attached='bottom'>
          <h1>{config.title}</h1>
        </Segment>
          <List service={service}/>
        </Container>
        <Divider hidden />
      </header>
    </div>
  );
}

export default App;
