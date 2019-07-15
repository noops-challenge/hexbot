import turtle
import random
from requests import get
t = turtle.Turtle(visible=False)
t.speed(100000)
class Drawing:
    def __init__(self, angles=False, sides=False, turnAngle=False, iterations=False, startSize=False, sizeChange=False):
        self.color = get("http://api.noopschallenge.com/hexbot").json()['colors'][0]['value']
        random.seed(self.color)
        if not iterations:
            self.iterations = random.randint(25,75)
        if not startSize:
            self.startSize = random.randint(0,50)
        if not sizeChange:
            self.sizeChange = random.randint(5,20)
        if not turnAngle:
            self.turnAngle = random.randint(1,359)
        if not sides and not angles:
            sides = random.randint(3,6)
        if not angles:
            angles = 180*(sides-2)
        if not sides:
            sides = angles/180+2
        if angles != 180*(sides-2) or not isinstance(sides, int):
            raise Exception('The side number you have chosen does not work with the angle measure you have chosen.')
        self.angles = angles
        self.sides = sides
    def render(self):
        for i in range(self.iterations):
            self.color = get("http://api.noopschallenge.com/hexbot").json()['colors'][0]['value']
            t.pencolor(self.color)
            for i in range(self.sides):
                t.forward(self.startSize)
                t.left(180-self.angles/self.sides)
            self.startSize += self.sizeChange
            t.left(self.turnAngle)
        turtle.exitonclick()
d = Drawing()
d.render()
