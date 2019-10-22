# CS Senior Randomizer
TL;DR : This is the list randomizer where you can ...
1. press `e` to set the list of text
2. press `enter` key to start the app
3. long press `spacebar` until you're satisfied and you'll get one item from the list you set displayed in a gigantic font, and that item will no longer in the list.
4. after that, press `enter` to start next turn (go back to 3.), repeat until the list is depleted.

This project is deployed on [Github pages](https://encx.github.io/cs-senior-finder/).

## The "Making of" Story
Back in my university days, there was a culture in my department _(Computer Science (that's why CS in the repo name))_ where, every year, the freshmen who wanted to have their senior and seniors that wanted to have their descendant(s), will join the activity called "Picking the Code". Seniors are assigned to a unique number and the freshmen will have to do some mission to get a chance to pick their senior.

We normally did picking the simple way. Putting numbers on pieces of paper and put those in a jar, and let the freshmen pick them. But we're going to study for 4 years, right ? Why don't we do this activity more "Computer Science" way ? Letting the freshmen see that the programming they are going to study for the coming 4 years can be applied anywhere they want, and this is so easy and fun to do too!

So, there you go. I made this for all juniors at my uni, and for fun! If you just wandered around Github and found this repo, feel free to use it or if you found any problem with these scripts and wanted to help, don't hesitate to raise PRs or at least open an issue and I would be really thankful.

## How to use
You can either clone the repo and use it anywhere or go to [Github pages](https://encx.github.io/cs-senior-finder/).

On the start screen. You can...
- press `e` to edit the list of values. (Put the comma-separated-value in the field and hit OK).
- press `enter` to start the app.

After that, the list will be pre-randomized and green screen will show up.
- press `Spacebar` to display random numbers from the list, if the `Spacebar` is released, the random display will stop and the first from the list will show up on the screen and remove from the list.
- To continue to next round of randomization, press `enter`

Until the list is depleted, the red screen with show up. You can either...
- Reload the page or
- Just hit `enter`

This app use cookie for storing the item list data locally. This helps when the list is depleted, reloading the page will restore data from local storage and you don't have to put in the list again.

## Contributing
I know, this is not the best practice making web app. But, I really wanted to keep these scripts simple. So, consider these.
- No building, bundling, etc.
- Try to use the most out of vanilla JavaScript while maintaining code readability.
	- of course, we're not going to do the `document.getElementById('elem-id')` or `element.innerHtml = '1234'`. So using the external library is fine.

### Setup
```sh
$ git clone <repo_path>
```
There you go, ready to run, just launch `index.html` in any modern browser.

## License
This project is [MIT Licensed](https://github.com/encX/cs-senior-finder/blob/master/LICENSE).
