window.onload = function () {
    class MainView extends React.Component {
        constructor(props) {
            super(props)
            this.randInterval = null
            this.blinkInterval = null
            this.state = {
                randomizerState: 'initial',
                itemList: [],
                elementClasses: ['message'],
                displayText: 'Press Enter to Begin\nPress E to Edit List (0)'
            }
        }

        readListFromStorage() {
            if (this.props.noCookieMode) return;
            
            const raw = localStorage.getItem('itemList') || ""
            const itemList = this.shuffle(raw.split(",").map(x => x.trim()).filter(x => x !== ""))
            this.setState({ itemList, displayText: `Press Enter to Begin\nPress E to Edit List (${itemList.length || 0})` })
        }

        getRandomizer() {
            return () => {
                const randN = Math.floor(Math.random() * 999);
                const displayText = this.state.itemList[randN % this.state.itemList.length]
                this.setState(() => ({ displayText }))
            }
        }

        shuffle(a) {
            let j, x, i;
            for (i = a.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                x = a[i];
                a[i] = a[j];
                a[j] = x;
            }
            return a;
        }

        randomizeDisplay() {
            this.setState(state => ({
                elementClasses: state.elementClasses.filter(c => !/(message|ready|error)/ig.test(c)),
                randomizerState: "randomizing",
                displayText: ''
            }))
            this.randInterval = setInterval(this.getRandomizer(), 20)
        }

        setEmptyMessage() {
            this.setState(() => ({
                randomizerState: "empty",
                displayText: 'List is empty.\nPress Enter or Reload.',
                elementClasses: ["message", "error"]
            }))
        }

        setReady() {
            this.setState(() => ({
                randomizerState: "ready",
                displayText: "Ready\nPress Spacebar",
                elementClasses: ["message", "ready"]
            }))
        }

        getInvertToggler() {
            return () => {
                this.setState(state => ({
                    elementClasses: state.elementClasses.indexOf('invert') > -1
                        ? state.elementClasses.filter(c => c !== 'invert')
                        : state.elementClasses.concat('invert')
                }))
            }
        }

        pickNumberAndSetDisplay() {
            this.setState(state => ({
                displayText: state.itemList.shift(),
                itemList: state.itemList
            }))
        }

        editList() {
            const input = prompt("Enter list of values separated by comma (,)", this.props.noCookieMode ? null : localStorage.getItem('itemList'));
            if (input) {
                const inputList = input.split(",").map(x => x.trim()).filter(x => x !== "")
                if (!this.props.noCookieMode) localStorage.setItem('itemList', inputList.join(","))

                this.setState(() => ({ itemList: this.shuffle(inputList) }))
            }
            this.setState({ displayText: `Press Enter to Begin\nPress E to Edit List (${this.state.itemList.length || 0})` })
        }

        begin() {
            clearInterval(this.blinkInterval)
            if (this.state.itemList.length === 0) this.setEmptyMessage()
            else this.setReady()
        }

        componentDidMount() {
            this.readListFromStorage()

            window.addEventListener("keydown", (e) => {
                if (this.state.randomizerState === "ready") {
                    if (e.code === "Space") this.randomizeDisplay()
                } else if (this.state.randomizerState === "displaying") {
                    if (e.code === "Enter") this.begin()
                } else if (this.state.randomizerState === "initial") {
                    if (e.code === "Enter") this.begin()
                    else if (e.code === "KeyE") this.editList()
                } else if (this.state.randomizerState === "empty") {
                    if (e.code === "Enter") {
                        this.readListFromStorage()
                        this.begin()
                    }
                }
            })

            window.addEventListener("keyup", (e) => {
                if (this.state.randomizerState !== "randomizing" || this.state.itemList.length === 0) return false

                if (e.code === "Space") {
                    this.setState(() => ({ randomizerState: "displaying" }))
                    clearInterval(this.randInterval)
                    this.pickNumberAndSetDisplay()
                    this.blinkInterval = setInterval(this.getInvertToggler(), 500)
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

    let noCookieMode = false;
    try {
        localStorage.getItem('itemList')
    } catch (e) {
        console.warn("Browser doesn't support localStore or cookie is blocked.")
        noCookieMode = true;
    } finally {
        console.log("Using" + noCookieMode ? "no" : "" + "cookie mode");
    }

    ReactDOM.render(
        React.createElement(MainView, { noCookieMode }),
        document.getElementById('MainView')
    );
}