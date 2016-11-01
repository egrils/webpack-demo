import React from 'react';
import {render} from 'react-dom';
import { createStore,bindActionCreators } from 'redux';
import { Provider ,connect} from 'react-redux';

//action

function buttonClick(){
    return {
        type:'BUTTON_CLICK'
    }
}

//reducer
const initialState = {
    text: 'Hello'
}

function myApp(state = initialState, action) {
    switch (action.type) {
        case 'BUTTON_CLICK':
            return {
                text: state.text=='You just click button'?'Hello World':'You just click button'
            }
        default:
            return {
                text:'Hello'
            };
    }
}

//store
let store = createStore(myApp);


class Hello extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <h1> {this.props.text} </h1>
        );
    }
}

class Change extends React.Component{
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.props.actions.buttonClick();
    }

    render() {
        return (
            <button onClick={this.handleClick} >change</button>
        );
    }
}

class App extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        const {actions, text} = this.props;
        return (
            <div>
                <Hello text={text}/>
                <Change actions={actions}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { text: state.text }
}

function mapDispatchToProps(dispatch){
    return{
        actions : bindActionCreators({buttonClick:buttonClick},dispatch)
    }
}

App = connect(mapStateToProps,mapDispatchToProps)(App)

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('content')
)

