# Conversion Rate

Throughout the codebase there will be mentions of a conversion rate whether it is calculating a conversion rate or using it. The purpose of the conversion rate is to convert a distance in metres into pixels. 

It works as follows

Given a distance in metres $m$, after deciding a conversion rate $c$, we find the corresponding pixel distance $p$ via 

$$p = c \times m. $$

This allows us to know where to draw objects including the projectile and target based on the chosen position of the cannon's pivot point.

## The Single Rate Strategy
The single rate strategy is a specific strategy for calculating the conversion rate. It works by deliberately choosing the horizontal and vertical axis to use the same conversion rate, regardless of screen aspect ratio.