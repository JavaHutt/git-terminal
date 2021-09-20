import { MemoryRouter } from 'react-router';
import blessed from 'blessed';
import { render } from 'react-blessed';
import * as dotenv from 'dotenv';
import App from './App';

dotenv.config();

const screen = blessed.screen({
    autoPadding: true,
    smartCSR: true,
    sendFocus: true,
    title: "Github Manager",
    cursor: {
        color: "black",
        shape: "underline",
        artificial: true,
        blink: true
    },
});

screen.key(["q", "C-c"], () => process.exit(0));

const component = render(
    <MemoryRouter>
        <App />
    </MemoryRouter>,
    screen
);