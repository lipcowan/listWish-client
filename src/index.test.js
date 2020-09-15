import React from 'react';
import ReactDOM from 'react-dom';
import Index from './index';
import renderer from 'react-test-renderer';

describe('Index Rendering', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
    
        ReactDOM.render(<Index />, div);
    
        ReactDOM.unmountComponentAtNode(div);
    });
    
    it('renders the UI as expected', () => {
        const tree = renderer
          .create(<Index />)
          .toJSON();
        expect(tree).toMatchSnapshot();
    });
})
