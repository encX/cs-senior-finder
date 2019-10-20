window.onload = function () {
    class MainView extends React.Component {
        constructor() {
            super()
            this.randInterval = null
            this.blinkInterval = null
            this.state = {
                down: false,
                lock: false,
                nums: [1,2,3,4],
                elementClasses: ['message'],
                displayText: 'Press Enter.\nTo Begin.'
            }
        }

        randNumber() {
            return () => {
                const randN = Math.floor(Math.random() * 999);
                this.setState(state => ({ displayText: randN }))
            }
        }

        shuffle(a) {
            var j, x, i;
            for (i = a.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                x = a[i];
                a[i] = a[j];
                a[j] = x;
            }
            return a;
        }

        componentDidMount() {
            window.addEventListener("keydown", (e) => {
                if (e.keyCode === 32 && !this.state.down && !this.state.lock && this.state.nums.length > 0) {
                    this.setState(state => ({
                        elementClasses: state.elementClasses.filter(c => !/(message|ready|error)/ig.test(c)),
                        down: true,
                        displayText: ''
                    }))
                    this.randInterval = setInterval(this.randNumber(), 20)
                }
                else if (e.keyCode === 13) {
                    clearInterval(this.blinkInterval)
                    if (this.state.nums.length === 0) {
                        this.setState(state => ({
                            displayText: 'Code is empty.\nReload to continue.',
                            elementClasses: state.elementClasses.concat("message", "error")
                        }))
                        return false
                    }
                    else {
                        this.setState(state => ({
                            lock: false,
                            displayText: "Ready\nPress Spacebar",
                            elementClasses: state.elementClasses.concat("message", "ready").filter(c => c !== "invert")
                        }))
                    }
                }
                else {
                    return false
                }
            })

            window.addEventListener("keyup", (e) => {
                if (!this.state.down || this.state.nums.length === 0) return false

                if (e.keyCode === 32) {
                    this.setState(() => ({ down: false, lock: true }))
                    clearInterval(this.randInterval)
                    this.blinkInterval = setInterval(() => {
                        this.setState(state => ({
                            elementClasses: state.elementClasses.indexOf('invert') > -1
                                ? state.elementClasses.filter(c => c !== 'invert')
                                : state.elementClasses.concat('invert')
                        }))
                    }, 500)

                    this.setState(state => ({
                        displayText: state.nums.shift(),
                        nums: state.nums
                    }))
                }
            })
        }

        render() {
            return React.createElement(
                "div",
                { className: this.state.elementClasses.join(' ') },
                this.state.displayText
            );
        }
    }

    ReactDOM.render(
        React.createElement(MainView),
        document.getElementById('MainView')
    );
}