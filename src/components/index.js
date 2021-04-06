import {Component} from 'react';
import {
    Container as Grid,
    Row,
    Col,
    Form,
    FormControl,
    Button,
    ListGroup,
    ListGroupItem,
    Nav,
    Navbar,
    NavItem,
    InputGroup,
    Modal,
} from 'react-bootstrap';

export const User = (user) => (
    <ListGroupItem key={user.clientId}>{ user.username }</ListGroupItem>
);

export const Users = ({ users = [] }) => (
    <div id="sidebar-wrapper">
        <div id="sidebar">
            <ListGroup>
                <ListGroupItem key='title'><i>Connected users</i></ListGroupItem>
                { users.map(User) }
            </ListGroup>
        </div>
    </div>
);

export const Message = (message) => (
    <ListGroupItem key={message.id}><b>{message.username}</b> : {message.message}</ListGroupItem>
);

export const ChatMessages = ({ messages=[] }) => (
    <div id="messages">
        <ListGroup>
            <ListGroupItem key='title'><i>Messages</i></ListGroupItem>
            { messages.map(Message) }
        </ListGroup>
    </div>
);

export const ChatHeader = ({ isConnected }) => {
    return (
        <> 
            <Navbar fixedTop>
                 <Navbar.Brand href="#">Serverless IoT chat demo</Navbar.Brand>
                 <Nav>
                    <NavItem>{ isConnected ? 'Connected' : 'Not connected'}</NavItem>
                </Nav>
            </Navbar>
        </>
    );
    /*
    return (
    <Navbar fixedTop>
        <Navbar.Header>
            <Navbar.Brand>
               Serverless IoT chat demo
            </Navbar.Brand>
        </Navbar.Header>
        <Nav>
            <NavItem>{ isConnected ? 'Connected' : 'Not connected'}</NavItem>
        </Nav>
    </Navbar>)*/
};

export const ChatInput = ({ onSend }) => {
    const onSubmit = (event) => {
        onSend(this.input.value);
        this.input.value = '';
        event.preventDefault();
    }
    return (
        <Navbar fixedBottom fluid>
            <Col xs={9} xsOffset={3}>
                <Form inline onSubmit={ onSubmit }>
                    <InputGroup>
                        <FormControl
                            type="text"
                            placeholder="Type your message"
                            inputRef={ref => { this.input = ref; }}
                        />
                            <Button type="submit" >Send</Button>
                    </InputGroup>
                </Form>
            </Col>
        </Navbar>
    );
};

export const ChatWindow = ({ users, messages, onSend }) => {
    return (
        <div>
            <Grid fluid>
                <Row>
                    <Col xs={3}>
                        <Users
                            users={ users }
                        />
                    </Col>
                    <Col xs={9}>
                        <ChatMessages
                            messages={ messages }
                        />
                    </Col>
                </Row>
            </Grid>

            <ChatInput onSend={ onSend }/>
        </div>
    );

   /* return (
        <div>
            <Grid fluid>
                <Row>
                    <Col xs={3}>
                        <Users
                            users={ users }
                        />
                    </Col>
                    <Col xs={9}>
                        <ChatMessages
                            messages={ messages }
                        />
                    </Col>
                </Row>
            </Grid>
            <ChatInput onSend={ onSend }/>
        </div>)*/
};

export class UserNamePrompt extends Component {
    constructor(props) {
        super(props);
        this.state = { showModal: true,textValue:'' }
    }

    render() {
        const onSubmit = (event) => {
            event.preventDefault();
            if (this.state.textValue.length > 0) {
                this.props.onPickUsername(this.state.textValue);
                this.setState({ showModal: false });
            }
        }
        return (
            <>
                <Form inline onSubmit={ onSubmit }>
                    <Modal.Header closeButton>
                        <Modal.Title>Pick your username</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormControl
                            type="text"
                            placeholder="Type your username"
                            onChange={(e) => {
                                this.setState({textValue:e.currentTarget.value});
                            }}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit">Ok</Button>
                    </Modal.Footer>
                </Form>
            </>
        );
    }
}