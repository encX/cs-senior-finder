# CS Senior Randomizer
TL;DR : This is a list randomizer where you can:
1. Press `e` to set a list of text entries.
2. Press `enter` to start the app.
3. Hold `spacebar` to cycle between entries until you're satisfied. The entry you stop at will be displayed in a gigantic font, and will be erased from the list on the next turn.
4. Press `enter` after that to start the next turn (going back to step 3). Repeat until the list is depleted.

This project is being deployed to [Github pages](https://encx.github.io/cs-senior-finder/).

## The "Making of" Story
Back in my university days, there was a culture in my department _(Computer Science (that's what the "CS" in the repo name stands for))_. Every year, the freshmen who wanted to pick their senior, and seniors that wanted to pick their descendant(s) would join in an activity called "Picking the Code". The seniors were assigned to a unique number and the freshmen would have to do some mission for a chance to get their senior.

We normally did picking in a simple way: by writing numbers on pieces of paper, putting those in a jar and letting the freshmen pick them. But we're going to study for 4 years, right? So why not do this activity in a more "Computer Science" way? Letting the freshmen see some of the programming they're gonna study for 4 years being applied in anything they want. Also, this is easy and fun to do!

So, there you go. I made this for all juniors at my uni, and for fun! If you just wandered around Github and found this repo, feel free to use it! Or if you found any problem with these scripts and wanted to help, don't hesitate to raise PRs or at least open an issue, I would be really thankful.

## How to use
You can either clone this repository and use it anywhere or go to [Github pages](https://encx.github.io/cs-senior-finder/).

Once the program is running, on the start screen you can:
- Press `e` to edit the list of values (type in comma-separated values in the field and hit OK).
- Press `enter` to start the app.

After that, the list will be pre-randomized and a green screen will show up.
- Hold `spacebar` to display random numbers from the list. When `spacebar` is released, the randomizing will stop and the selected item from the list will show up on the screen, and be removed from the list.
- To continue to the next round of randomization, press `enter`.

When the list is depleted, a red screen with show up. You can either:
- Reload the page or
- Just hit `enter`.

This app use cookies for storing the item list data locally. This helps when the list is depleted: reloading the page will restore the data from local storage and you don't have to recreate the list.

## Contributing
While I know this is not the best practice for making web apps, I really wanted to keep these scripts simple. So, consider these:
- No building, bundling, etc.
- Try to use the most out of vanilla JavaScript while maintaining code readability.
	- Of course, we're not going to do `document.getElementById('elem-id')` or `element.innerHtml = '1234'`. So using the external library is fine.

### Setup
```sh
$ git clone <repo_path>
```
There you go, ready to run. Just launch `index.html` in any modern browser.

## License
This project is [MIT Licensed](https://github.com/encX/cs-senior-finder/blob/master/LICENSE).
