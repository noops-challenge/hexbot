![Hexbot](https://user-images.githubusercontent.com/212941/59163439-23c05900-8ab6-11e9-8764-977334c7bba8.png)

# 👋 Meet Hexbot

A different color with every ping.

Every request returns a different hex code. From #000000 to #FFFFFF—and all 16,777,216 colors between—you can do anything you want with the data.

Show the color? Sure.

Show the 80s movie poster with that hex as the dominant color? Better.

## 🖍 What can you do?

First, you can just request a color.

Simple API request:

`GET /hexbot`

```
{
  "colors": [
    {"value": "#52a351"}
  ]
}
```

And display it:

![](https://user-images.githubusercontent.com/212941/59164532-12317e00-8ac3-11e9-88ee-2d1248f17e7a.png)

Job well done. We all have to start somewhere!

Now let's make it more interesting...

`GET /hexbot?count=1000&width=500&height=500&seed=FF7F50,FFD700,FF8C00`

![](https://user-images.githubusercontent.com/212941/59171655-d6b1a680-8af8-11e9-9adf-570e485d81ad.gif)

Now we've added 1000 colors, each with coordinates, and seeded the colors with a range of hex codes. Then we've built up the frames over 100 iterations—much more interesting!

## ✨ A few ideas

**Show the color.** Display the color in a square. Hey, that's an accomplishment! It means you've successfully made an API request, handled the data, and did something with it. Not bad! For bonus points, add a way to refresh the API and change the color.

**Randomize the colors.** Request 1,000 colors and display them at random on screen, then every 5 seconds request another 1,000 colors and animate them to their next color.

**Compare colors.** A color is actually a very interesting data structure. It has a Red, Green, and Blue value, as well as luminosity and contrast. Given a hex code, can you determine whether a color is light or dark? Or what might pair well with it?

**Pointillism.** Make an homage to [George Seurat](https://en.wikipedia.org/wiki/Georges_Seurat), credited with creating [Pointillism](https://en.wikipedia.org/wiki/Pointillism). Take a picture from the [Unsplash API](https://unsplash.com/developers), break it up into smaller pieces, and rebuild it with random colors from the Hexbot. (Pass `width` and `height` to the API to get random coordinates with your data)

**Search for the color.** Use the color to load images from a search engine with color indexes (like [DesignInspiration](https://www.designspiration.net/search/saves/?q=2cdaad) and [Dribbble](https://dribbble.com/colors/000000?s=popular)) and do something with the result.

**Make a mood ring.** Colors are often associated with [different traits](https://en.wikipedia.org/wiki/Color_symbolism). Build a color sentiment engine, then evaluate how each color returned by the Hexbot should make you feel.

**Name the colors.** Paint color names are ridiculous (anything with "Greige" will do nicely), and a robot can come up with even better. You can use a [neural net fed with thousands of paint names](https://aiweirdness.com/post/160776374467/new-paint-colors-invented-by-neural-network) or make a [Markov chain](https://en.wikipedia.org/wiki/Markov_chain) of pleasant, paint-y sounding names.

**Why only colors?** Who says a hex code has to be a color? Break it up into rgb and you have a 3D coordinate. Use those three points to play a tone, or provide the randomized physics in a game. Convert the value from hex to decimal, and now you have a number between 0 and 16,777,216 to play with.

Have an idea of your own? Create an issue and we'll add it to the list.

## 🤖 API basics

There's a single endpoint: `api.noopschallenge.com/hexbot`

The endpoint accepts four parameters, all optional:

- **count** *(optional, numeric)*: Between 1-1000. Number of colors to return.
- **width** *(optional, numeric)*: Between 10-100,000. Maximum width of returned points.
- **height** *(optional, numeric)*: Between 10-100,000. Maximum height of returned points.
- **seed** *(optional, string)*: Comma separated list of hex codes, up to 10. Note that hex codes should not have the `#`. Returned colors will be a mix of a random combination of two of the seeds. If you submit an invalid hex code, you'll receive an error instead of more beautiful colors.

The endpoint returns a JSON object with an array named `colors` of *n* length.

Each item in the `colors` array is an object with the property `value` and, optionally, a `coordinates` object that has `x` and `y` properties.

Example return for five colors:

`GET /hexbot?count=5`

```
{
  "colors": [
    {"value": "#EF7FED"},
    {"value": "#5F47C2"},
    {"value": "#D5FF9F"},
    {"value": "#62B217"},
    {"value": "#DD36D9"}
  ]
}
```

Example return for five colors with coordinates:

`GET /hexbot?count=5&width=1000&height=1000`

```
{
  "colors":[
    {
      "value":"#2E84C5",
      "coordinates":{"x":755,"y":331}
    },
    {
      "value":"#116BAA",
      "coordinates":{"x":52,"y":998}
    },
    {
      "value":"#C742B2",
      "coordinates":{"x":617,"y":478}
    },
    {
      "value":"#4C2BB9",
      "coordinates":{"x":13,"y":183}
    },
    {
      "value":"#0C98FB",
      "coordinates":{"x":604,"y":507}
    }
  ]
}
```

Example of seeding colors with a comma delimited string of hex codes:

`GET /hexbot?count=5&seed=FF7F50,FFD700,FF8C00`


```
{
  "colors": [
    { "value": "#FF983A" },
    { "value": "#FF7F50" },
    { "value": "#FF7F50" },
    { "value": "#FFAB28" },
    { "value": "#FFBA1A" }
  ]
}
```


Complete API documentation: [API.md](./API.md)

## Note to developers

The Hexbot is one of our simpler APIs, and you can easily generate random colors without accessing our API.

Here's the code we use to generate random hex codes (in JavaScript):

```
function randomHex() {
  const hexMax = 256 * 256 * 256;
  return '#' + Math.floor(Math.random() * hexMax).toString(16).toUpperCase().padStart(6, '0');
}
```

Implement that function in your code to generate millions of colors.

For manipulating colors, we're using [Color](https://github.com/Qix-/color), which allows you to change `R`, `G`, and `B` values and mix colors together. Give it a try! 🌈

More about Hexbot here: https://noopschallenge.com/challenges/hexbot