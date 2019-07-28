from PIL import Image, ImageDraw
import json
import urllib.request
import pathlib

def hex_to_rgb(hex_str):
    return tuple(int(hex_str.lstrip('#')[i:i+2], 16) for i in [0, 2, 4])

def get_color_from_hexbot(count=1):
    contents = json.load(urllib.request.urlopen(f'https://api.noopschallenge.com/hexbot?count={count}'))
    return [ hex_to_rgb(i['value']) for i in contents['colors'] ]
    
def make_gradient(striped = False):
    """
        Using Hexbot to get random colors, this function creates a gradient out of them.

        :param striped: If true, instead of outputting a smooth gradient, it outputs a striped one.
    """
    # How many colors in the gradient
    number_of_colors = 3
    width = number_of_colors * 200
    height = 200
    stripe_width = 40

    img = Image.new("RGB", (width, height), '#fff')
    draw = ImageDraw.Draw(img)

    colors = get_color_from_hexbot(number_of_colors)

    # Show the colors returned from hexbot as 50x50 squares next to each other
    generated_colors_image = Image.new("RGB", (len(colors) * 50, 50), '#fff')
    generated_colors_draw = ImageDraw.Draw(generated_colors_image)

    for i in range(len(colors)):
        generated_colors_draw.rectangle((i*50, 0, (i+1) * 50, 50), colors[i])

    pathlib.Path('output').mkdir(exist_ok=True)
    generated_colors_image.save('output/colors.jpg')

    if len(colors) == 1:
        draw.rectangle((0, 0, width-1, height-1), colors[0])
        img.show()
        return
    
    number_of_ranges = len(colors) - 1

    # Here I am using color interpoation in RGB to make a transition from one color to another
    # Hence getting a gradient in the end, the formula used here is: 
    # Color at (x, y) = (color 2 - color 1) * a fraction + color 1
    # A fraction that is 0.0 means full color 1 and a 1.0 means full color 2.
    # The fraction used here is simply value of x / width of the image.
    # To make a gradient of n colors, basically p is divided into n-1 spaces.
    # And a gradient is made between each 2 consecutive colors.
    # EX: if we've 3 colors, we basically need to do this:
    # Color 1 ---- Color 2 Color 2 ---- Color 3
    for x in range(0, width, stripe_width if striped else 1):
        p = x / float(width - 1)
        for k in range(number_of_ranges):
            if p <= (k+1) / number_of_ranges:
                c1 = colors[k]
                c2 = colors[k+1]
                rgb = tuple(map(lambda c1, c2: int((c2 - c1) * (p - ((k)/number_of_ranges)) * float(number_of_ranges) + c1), c1, c2))
                break
        if striped:
            draw.rectangle((x, 0, x + stripe_width, height-1), rgb)
        else:
            draw.line((x, 0, x, height-1), rgb)

    img.save('output/gradient.jpg')


def main():
    make_gradient(False)


if __name__ == '__main__':
    main()

