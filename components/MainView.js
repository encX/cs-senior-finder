window.onload = function () {

    const STATE_INITIAL     = 'initial';
    const STATE_EMPTY       = 'empty';
    const STATE_READY       = 'ready';
    const STATE_RANDOMIZING = 'randomizing';
    const STATE_DISPLAYING  = 'displaying';

    const sanitizeData = (input) =>
        input.split(",").map(x => x.trim()).filter(x => x !== "");

    class MainView extends React.Component {
        constructor(props) {
            super(props)
            this.randInterval = null
            this.blinkInterval = null
            this.state = {
                randomizerState: STATE_INITIAL,
                itemList: [],
                initialItemList: [],
                elementClasses: ['message'],
                displayText: 'Press Enter to Begin\nPress E to Edit List'
            }
        }

        initList(itemList) {
            this.setState({
                itemList: this.shuffle([...itemList]),
                initialItemList: itemList,
                displayText: `Press Enter to Begin\nPress E to Edit List (${itemList.length})`,
             });
        }

        loadList() {
            const itemList = sanitizeData(this.props.onLoad());
            this.initList(itemList);
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
                randomizerState: STATE_RANDOMIZING,
                displayText: ''
            }))
            this.randInterval = setInterval(this.getRandomizer(), 20)
        }

        setEmptyMessage() {
            this.setState(() => ({
                randomizerState: STATE_EMPTY,
                displayText: 'List is empty.\nPress Enter.',
                elementClasses: ["message", "error"]
            }))
        }

        setReady() {
            this.setState(() => ({
                randomizerState: STATE_READY,
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
            const restoredItemList = this.state.initialItemList.join(',');
            const input = prompt("Enter list of values separated by comma (,)", restoredItemList);
            if (input) {
                const inputList = sanitizeData(input);
                this.props.onSave(inputList.join(","));
                this.initList(inputList);
            }
        }

        begin() {
            clearInterval(this.blinkInterval)
            if (this.state.itemList.length === 0) this.setEmptyMessage()
            else this.setReady()
        }

        componentDidMount() {
            this.loadList();

            window.addEventListener("keydown", (e) => {
                const { randomizerState } = this.state;
                if (randomizerState === STATE_READY) {
                    if (e.code === "Space") this.randomizeDisplay()
                } else if (randomizerState === STATE_DISPLAYING) {
                    if (e.code === "Enter") this.begin()
                } else if (randomizerState === STATE_INITIAL) {
                    if (e.code === "Enter") this.begin()
                    else if (e.code === "KeyE") this.editList()
                } else if (randomizerState === STATE_EMPTY) {
                    if (e.code === "Enter") {
                        this.initList(this.state.initialItemList);
                        this.begin();
                    }
                }
            })

            window.addEventListener("keyup", (e) => {
                if (this.state.randomizerState !== STATE_RANDOMIZING || this.state.itemList.length === 0) return false

                if (e.code === "Space") {
                    this.setState({ randomizerState: STATE_DISPLAYING })
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

    let onSave = (str) => localStorage.setItem('itemList', str);
    let onLoad = () => localStorage.getItem('itemList') || '';
    try {
        onLoad();
    } catch (e) {
        console.warn("Browser doesn't support localStore or cookie is blocked.");
        onSave = () => console.warn('No persistent storage.');
        onLoad = () => '';
    }

    ReactDOM.render(
        React.createElement(MainView, { onLoad, onSave }),
        document.getElementById('MainView')
    );
}
